import { Skeleton } from "../ui/skeleton";
export const SkeletonEvents = () => {
  const items = [1, 2, 3, 4];
  return (
    <>
      {items.map((item) => {
        return <SkeletonEvent key={item} />;
      })}
    </>
  );
};

const SkeletonEvent = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-5 w-60" />
      <Skeleton className="h-5 w-30" />
    </div>
  );
};
