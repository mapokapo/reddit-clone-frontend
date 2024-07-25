import { PostsService, SortBy, Timespan } from "@/client/requests";
import CommentsList from "@/components/comments-list";
import CommunityInfoSidebar from "@/components/community-info-sidebar";
import PostView from "@/components/post-view";
import QueryHandler from "@/components/query-handler";
import SelectFilterMode from "@/components/select-filter-mode";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
  const [filterMode, setFilterMode] = useState<SortBy>("new");
  const [filterTimespan, setFilterTimespan] = useState<Timespan>("all-time");

  const { id } = useParams<{ id: string }>();

  if (id === undefined || isNaN(parseInt(id))) {
    return <div>Invalid post ID</div>;
  }

  const query = useQuery({
    queryKey: ["posts", id],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          PostsService.findOnePost({
            id: parseInt(id),
          }),
        key: `/posts/${id}`,
      }),
  });

  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl gap-8 p-4 py-16">
      <QueryHandler
        query={query}
        error={() => <div>An error has occured</div>}
        loading={
          <div className="flex h-1/3 w-full flex-col gap-2">
            <Skeleton className="h-2/3 w-full" />
            <Skeleton className="h-1/3 w-full" />
          </div>
        }
        success={post => (
          <>
            <div className="flex flex-[3] flex-col gap-2">
              <PostView
                post={post}
                isListItem={false}
              />
              <Input
                className="mt-4"
                placeholder="Add a comment"
                type="text"
              />
              <SelectFilterMode
                filterMode={filterMode}
                filterTimespan={filterTimespan}
                setFilterMode={setFilterMode}
                setFilterTimespan={setFilterTimespan}
              />
              <CommentsList
                postId={post.id}
                filterMode={filterMode}
                filterTimespan={filterTimespan}
              />
            </div>
            <div className="flex-1">
              <CommunityInfoSidebar communityId={post.communityId} />
            </div>
          </>
        )}
      />
    </main>
  );
};

export default PostPage;
