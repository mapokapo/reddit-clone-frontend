import { PostsService } from "@/client/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import QueryHandler from "./query-handler";
import { usePostsServiceGetFeedKey } from "@/client/queries";

const PostsList: React.FC = () => {
  const [filterMode, setFilterMode] = useState("new");
  const [filterTopMode, setFilterTopMode] = useState("all-time");

  const query = useQuery({
    queryKey: [usePostsServiceGetFeedKey],
    queryFn: fetcher({
      fetchFunction: () => PostsService.getFeed(),
    }),
  });

  return (
    <div className="flex flex-[3] flex-col">
      <div className="flex gap-2">
        <Select
          defaultValue="top"
          value={filterMode}
          onValueChange={setFilterMode}>
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
            value={filterTopMode}
            onValueChange={setFilterTopMode}>
            <SelectTrigger className="flex w-min justify-between gap-2 border-none [&>span]:line-clamp-none [&>span]:text-nowrap">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">All time</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
              <SelectItem value="last-week">Last week</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <Separator />
      <ul className="flex w-full flex-col gap-4">
        <QueryHandler
          query={query}
          loading={Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
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
            posts.map(post => (
              <li
                key={post.id}
                className="m-4 rounded-lg bg-background px-4 py-2">
                <div className="flex flex-col gap-2">
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </div>
              </li>
            ))
          }
        />
      </ul>
    </div>
  );
};

export default PostsList;
