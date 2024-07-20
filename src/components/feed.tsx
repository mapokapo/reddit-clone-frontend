import RecentPosts from "@/components/recent-posts";
import PostsList from "@/components/posts-list";
import { useCommunitiesServiceFindAllCommunitiesKey } from "@/client/queries";
import { CommunitiesService } from "@/client/requests";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";

const Feed: React.FC = () => {
  const { data, error } = useQuery({
    queryKey: [useCommunitiesServiceFindAllCommunitiesKey],
    queryFn: fetcher({
      fetchFunction: CommunitiesService.findAllCommunities,
    }),
  });

  if (error) {
    const [text, details] = mapErrorToMessage(error);
    toast.error(text, {
      description: details,
    });
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl gap-8 p-4">
      <div className="flex-[3]">
        <PostsList
          communities={data}
          error={error}
        />
      </div>
      <div className="flex-1">
        <RecentPosts />
      </div>
    </main>
  );
};

export default Feed;
