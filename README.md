# Raindrop.io Drop Manager

This is a web application built using Next.js that integrates with the Raindrop.io API to manage and organize bookmarks. The tool allows users to fetch their bookmarks from Raindrop.io, view suggested tags, and generate additional tags using OpenAI's GPT-3.5-turbo model.

## Features

- Authenticate with Raindrop.io using OAuth
- Fetch bookmarks from Raindrop.io API
- Display bookmarks in a user-friendly interface
- View suggested tags for each bookmark
- Generate additional tags using OpenAI's GPT-3.5-turbo model
- Update bookmarks with new tags
- Pagination support for browsing through bookmarks
- Caching mechanism to improve performance and reduce API calls

## Prerequisites

Before running the application, make sure you have the following:

- Node.js installed (version 12 or above)
- Raindrop.io API access token
- OpenAI API key

## Installation

1.  Clone the repository:

```
git clone https://github.com/dam354/raindrop-bookmark-manager.git
```

1.  Navigate to the project directory:

```
cd raindrop-bookmark-manager
```

1.  Install the dependencies:

```
npm install
```

1.  Create a `.env` file in the project root and provide the necessary environment variables:

```
NEXT_PUBLIC_CLIENT_ID=your-raindrop-client-id
CLIENT_SECRET=your-raindrop-client-secret
OPENAI_API_KEY=your-openai-api-key
```

Replace `your-raindrop-client-id`, `your-raindrop-client-secret`, and `your-openai-api-key` with your actual Raindrop.io client ID, client secret, and OpenAI API key, respectively.

1.  Start the development server:

```
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Usage

1.  Open the application in your web browser.
2.  Click on the "Login with Raindrop.io" button to authenticate with Raindrop.io.
3.  Once authenticated, you will be redirected to the dashboard page.
4.  The dashboard displays your bookmarks fetched from Raindrop.io.
5.  Each bookmark card shows the title, excerpt, cover image (if available), and suggested tags.
6.  Additional tags generated using OpenAI's GPT-3.5-turbo model are also displayed for each bookmark.
7.  Use the pagination controls to navigate through the bookmarks.
8.  To update a bookmark with new tags, click on the "Update" button on the bookmark card.
9.  The application will send a request to the Raindrop.io API to update the bookmark with the new tags.

## API Routes

The application includes the following API routes:

- `/api/auth/callback`: Handles the OAuth callback from Raindrop.io and sets the access token as a cookie.
- `/api/proxy/fetchRaindrops`: Fetches bookmarks from the Raindrop.io API, adds suggested tags and GPT-generated tags, and returns the data. Supports pagination and caching.
- `/api/proxy/updateRaindrop`: Updates a specific bookmark with new tags using the Raindrop.io API.

## Caching

The application implements a caching mechanism using `node-cache` to improve performance and reduce the number of API calls made to Raindrop.io. The fetched bookmarks are cached for a specified duration (10 minutes by default) and served from the cache for subsequent requests within that time period.

## To-Do

Here are some planned features and improvements for the Raindrop.io Bookmark Manager:

- [ ] Add search functionality to allow users to search for specific bookmarks
- [ ] Enhance the caching mechanism to support more granular caching and cache invalidation
- [ ] Improve error handling and provide informative error messages to users
- [ ] Implement unit tests to ensure code quality and maintainability
- [ ] Optimize the application's performance and reduce the initial load time
- [ ] gpt-3.5 Tag merger
