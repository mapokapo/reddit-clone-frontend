import { PostsService, SortBy, Timespan } from "@/client/requests";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import QueryHandler from "./query-handler";
import PostView from "@/components/post-view";
import { range } from "@/lib/utils";
import SelectFilterMode from "./select-filter-mode";

type Props = {
  communityId?: number;
  all?: boolean;
};

const PostsList: React.FC<Props> = ({ communityId, all = false }) => {
  const [filterMode, setFilterMode] = useState<SortBy>("new");
  const [filterTimespan, setFilterTimespan] = useState<Timespan>("all-time");

  const query = useQuery(
    all
      ? {
          queryKey: ["posts"],
          queryFn: () =>
            mapFetchErrors({
              fetchFunction: () => PostsService.findAllPosts(),
              key: "/posts",
            }),
        }
      : communityId !== undefined
        ? {
            queryKey: [
              "posts",
              "community",
              communityId,
              filterMode,
              filterTimespan,
            ],
            queryFn: () =>
              mapFetchErrors({
                fetchFunction: () =>
                  PostsService.findAllPostsInCommunity({
                    communityId,
                    sortBy: filterMode,
                    timespan: filterTimespan,
                  }),
                key: `/posts/communities/${communityId}`,
              }),
          }
        : {
            queryKey: ["posts", "feed", filterMode, filterTimespan],
            queryFn: () =>
              mapFetchErrors({
                fetchFunction: () =>
                  PostsService.getFeed({
                    sortBy: filterMode,
                    timespan: filterTimespan,
                  }),
                key: "/posts/feed",
              }),
          }
  );

  return (
    <div className="flex flex-[3] flex-col">
      {all !== true && (
        <SelectFilterMode
          filterMode={filterMode}
          filterTimespan={filterTimespan}
          setFilterMode={setFilterMode}
          setFilterTimespan={setFilterTimespan}
        />
      )}
      <Separator />
      <ul className="mt-4 flex w-full flex-col gap-4">
        <QueryHandler
          query={query}
          loading={range(5).map(key => (
            <Skeleton
              key={key}
              className="h-24 w-full rounded-lg bg-muted"
            />
          ))}
          error={() => (
            <p className="p-4 text-xl text-muted-foreground">
              An error occurred while fetching the posts.
            </p>
          )}
          showToastOnError={true}
          success={posts =>
            posts.length === 0 ? (
              <p className="p-4 text-xl text-muted-foreground">
                There is nothing here.
              </p>
            ) : (
              posts.map(post => (
                <li
                  key={post.id}
                  className="flex w-full flex-col gap-2">
                  <PostView post={post} />
                  <Separator />
                </li>
              ))
            )
          }
        />
      </ul>
    </div>
  );
};

export default PostsList;
