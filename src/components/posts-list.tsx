import { PostsService, SortBy, Timespan } from "@/client/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import QueryHandler from "./query-handler";
import PostView from "@/components/post-view";
import { range } from "@/lib/utils";

const PostsList: React.FC = () => {
  const [filterMode, setFilterMode] = useState<SortBy>("new");
  const [filterTimespan, setFilterTimespan] = useState<Timespan>("all-time");

  const query = useQuery({
    queryKey: ["posts", "feed", filterMode, filterTimespan],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: async () =>
          PostsService.getFeed({
            sortBy: filterMode,
            timespan: filterTimespan,
          }),
        key: "/posts/feed",
      }),
  });

  return (
    <div className="flex flex-[3] flex-col">
      <div className="flex gap-2">
        <Select
          defaultValue="top"
          value={filterMode}
          onValueChange={value => setFilterMode(value as SortBy)}>
          <SelectTrigger className="flex w-min justify-start gap-2 border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
        {filterMode === "top" && (
          <Select
            defaultValue="all-time"
            value={filterTimespan}
            onValueChange={value => setFilterTimespan(value as Timespan)}>
            <SelectTrigger className="flex w-min justify-between gap-2 border-none [&>span]:line-clamp-none [&>span]:text-nowrap">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All time</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
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
