import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

interface Raindrop {
  _id: string;
  tags: string[];
  gptTags: string[];
  cover?: string;
  title: string;
  excerpt: string;
}

interface CardProps {
  raindrop: Raindrop;
  currentPage: number;
}

const Card: React.FC<CardProps> = ({ raindrop, currentPage }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState<{ tags?: string[] } | null>(null);
  const [debouncedUpdateData] = useDebounce(updateData, 300);
  const [currentTags, setCurrentTags] = useState(raindrop.tags);
  const [gptTags, setGptTags] = useState(raindrop.gptTags);

  const updateRaindrop = async (updateData: { tags?: string[] }) => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/proxy/updateRaindrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raindropId: raindrop._id, updateData }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update raindrop: ${response.statusText}`);
      }

      // Clear cache for the current page
      await clearCacheForPage();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const clearCacheForPage = async () => {
    try {
      const response = await fetch(`/api/proxy/fetchRaindrops?page=${currentPage}&perpage=6`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to clear cache: ${response.statusText}`);
      }

      console.log("Cache cleared successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debouncedUpdateData) {
      updateRaindrop(debouncedUpdateData);
    }
  }, [debouncedUpdateData]);

  const handleTagClick = (tag: string) => {
    if (!isUpdating) {
      setCurrentTags([...currentTags, tag]);
      setGptTags(gptTags.filter((gptTag) => gptTag !== tag));
      setUpdateData({ tags: [...currentTags, tag] });
    }
  };

  return (
    <article key={raindrop._id} className="overflow-hidden rounded-lg bg-white p-6 shadow-lg">
    <div className="flex space-x-4">
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={raindrop.cover || "https://via.placeholder.com/150"}
        alt="Cover Image"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xl font-semibold text-gray-900">
          <a href="#" className="hover:underline">
            {raindrop.title}
          </a>
        </p>
        <p className="mt-1 text-sm text-gray-500">{raindrop.excerpt}</p>
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700">Current tags</p>
      <div className="flex flex-wrap mt-2">
        {currentTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="inline-flex items-center gap-x-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`Tag ${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-700">GPT tags</p>
      <div className="flex flex-wrap mt-2">
        {gptTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="inline-flex items-center gap-x-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={`Tag ${tag}`}
          >
            <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
            {tag}
          </button>
        ))}
      </div>
    </div>
  </article>
  
  );
};

export default Card;
