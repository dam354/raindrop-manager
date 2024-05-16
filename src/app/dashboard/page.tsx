"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/card";
import { Pagination } from "../components/pagination";
import CardsSkeleton from "../components/skeleton"

interface Raindrop {
  _id: string;
  tags: string[];
  gptTags: string[];
  cover?: string;
  title: string;
  excerpt: string;
}

interface RaindropData {
  items: Raindrop[];
  totalPages: number;
  count: number;
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const router = useRouter();
  const [data, setData] = useState<RaindropData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams?.page ? Number(searchParams.page) - 1 : 0));
  const [totalPages, setTotalPages] = useState(1);

  const fetchDataFromEndpoint = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/proxy/fetchRaindrops?page=${page}&perpage=6`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const jsonData: RaindropData = await response.json();
      console.log("Fetched data:", jsonData); // Debugging log
      setData(jsonData);
      setTotalPages(Math.ceil(jsonData.count / jsonData.items.length)); // Calculate total pages
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromEndpoint(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page + 1}`); // Update URL with 1-indexed value
  };

  if (isLoading) {
    return (
      <ul role="list" className="space-y-10">
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
      </ul>
    )
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log("Rendering data:", data); // Debugging log

  return (
    <>
      <section className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data && data.items && data.items.length > 0 ? (
          data.items.map((raindrop: Raindrop) => (
            <Card key={raindrop._id} raindrop={raindrop} currentPage={currentPage} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

    </>
  );
}
