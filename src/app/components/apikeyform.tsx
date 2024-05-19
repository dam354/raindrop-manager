import { useState } from "react";

export default function ApiKeyForm({ apiKey, onSave, onDelete }) {
  const [inputValue, setInputValue] = useState(apiKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(inputValue);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="api" className="block text-sm font-medium text-gray-700">
          OpenAI API Key
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="api"
            id="api"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your OpenAI API Key"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save API Key
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete API Key
        </button>
      </div>
    </form>
  );
}
