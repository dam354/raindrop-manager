export function CardSkeleton() {
  return (
    <li class="overflow-hidden rounded-md bg-gray-200 px-6 py-24 shadow animate-pulse">
      <div class="flex space-x-6">
        <div class="h-16 w-16 rounded-full bg-gray-400"></div>
        <div class="flex-1 min-w-0">
          <div class="h-6 bg-gray-400 rounded mb-2 w-3/4"></div>
          <div class="h-4 bg-gray-400 rounded w-5/6 mb-1"></div>
          <div class="h-4 bg-gray-400 rounded w-2/3"></div>
        </div>
      </div>
      <div class="mt-4 h-3 bg-gray-400 rounded w-12/12"></div>
      <div class="mt-2 h-3 bg-gray-400 rounded w-12/12"></div>
      <div class="mt-2 h-3 bg-gray-400 rounded w-11/12"></div>
      <div class="mt-2 h-3 bg-gray-400 rounded w-12/12"></div>
      <div class="mt-2 h-3 bg-gray-400 rounded w-6/12"></div>
    </li>
  );
}
export default function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
