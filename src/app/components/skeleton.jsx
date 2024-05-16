export function CardSkeleton() {
  return (
    <li class="overflow-hidden rounded-md bg-gray-300 px-6 py-4 shadow animate-pulse">
      <div class="flex space-x-6">
        <div class="h-12 w-12 rounded-full bg-gray-400"></div>
        <div class="flex-1 min-w-0">
          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
        </div>
      </div>

      <div class="mt-4 h-3 bg-gray-400 rounded w-1/2"></div>
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
