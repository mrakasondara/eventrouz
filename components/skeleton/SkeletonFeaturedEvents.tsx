import { Skeleton } from "@/components/ui/skeleton";
export const SkeletonFeaturedEvents = () => {
  let items = [1, 2, 3, 4];
  return (
    <>
      {items.map((item) => {
        return <Skeleton className="aspect-video w-full" key={item} />;
      })}
    </>
  );
};
