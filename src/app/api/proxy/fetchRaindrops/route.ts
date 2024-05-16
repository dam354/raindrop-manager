import NodeCache from "node-cache";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// Cache configuration
const myCache = new NodeCache({ stdTTL: 600 }); // cache for 10 minutes
const openai = new OpenAI();

// Function to fetch suggested tags for a specific raindrop
async function fetchSuggestedTags(token, raindropId) {
  const url = `https://api.raindrop.io/rest/v1/raindrop/${raindropId}/suggest`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.item.tags;
}

// Function to fetch GPT tags for a specific raindrop
async function fetchGptTags(raindrop) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an expert in bookmark classification, responsible for generating accurate and relevant tags for organizing bookmarks. Your outputs must only be the tag names, lowercase, separated by commas, with no need for # or numbers preceding them.",
      },
      {
        role: "user",
        content: `Given the following bookmark details, provide a list of up to 5 tags that best describe the bookmark. Ensure the tags are specific, relevant, and diverse:
      ---
      ${JSON.stringify(raindrop)}
      ---`,
      },
    ],
  });
  console.log;
  const gptTags = response.choices[0].message.content
    .trim()
    .split(",")
    .filter((tag) => tag);

  return gptTags;
}

// Function to fetch all raindrops from the API and add suggested and GPT tags
async function fetchAllRaindrops(token, apiUrl, page = 0, perPage = 6, bypassCache = false) {
  const url = `${apiUrl}?perpage=${perPage}&page=${page}${bypassCache ? `&bypassCache=${Date.now()}` : ''}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status} ${response.statusText}`);
  }

  const rateLimitRemaining = parseInt(response.headers.get("X-RateLimit-Remaining") || "120", 10);
  const rateLimitReset = parseInt(response.headers.get("X-RateLimit-Reset") || "0", 10);

  if (rateLimitRemaining <= 1) {
    const now = Math.ceil(Date.now() / 1000);
    const delay = (rateLimitReset - now + 1) * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const data = await response.json();
  const itemsWithTags = await Promise.all(
    data.items.map(async (item) => {
      const suggestedTags = await fetchSuggestedTags(token, item._id);
      const filteredSuggestedTags = suggestedTags.filter((tag) => !item.tags.includes(tag));
      const gptTags = await fetchGptTags(item);
      return { ...item, suggestedTags: filteredSuggestedTags, gptTags };
    })
  );

  return { items: itemsWithTags, count: data.count };
}

export async function GET(request) {
  const page = Number(request.nextUrl.searchParams.get("page") || 0);
  const perPage = Number(request.nextUrl.searchParams.get("perpage") || 6);
  const bypassCache = request.nextUrl.searchParams.get("bypassCache") === 'true';

  const token = request.cookies.get("access_token");

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Authentication required" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const apiUrl = `https://api.raindrop.io/rest/v1/raindrops/0`;

  const cacheKey = `${apiUrl}?page=${page}&perpage=${perPage}`;
  const cachedData = myCache.get(cacheKey);

  if (cachedData && !bypassCache) {
    return new NextResponse(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const data = await fetchAllRaindrops(token, apiUrl, page, perPage, bypassCache);
    myCache.set(cacheKey, data);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch data from Raindrop.io", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// New DELETE handler to clear the cache for a specific page
export async function DELETE(request) {
  const page = Number(request.nextUrl.searchParams.get("page") || 0);
  const perPage = Number(request.nextUrl.searchParams.get("perpage") || 6);

  const apiUrl = `https://api.raindrop.io/rest/v1/raindrops/0`;
  const cacheKey = `${apiUrl}?page=${page}&perpage=${perPage}`;

  myCache.del(cacheKey);

  return new NextResponse(JSON.stringify({ message: "Cache cleared" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}