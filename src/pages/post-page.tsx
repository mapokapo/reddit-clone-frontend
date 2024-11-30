import {
  CommentsService,
  PostsService,
  SortBy,
  Timespan,
} from "@/client/requests";
import CommentsList from "@/components/comments-list";
import CommunityInfoSidebar from "@/components/community-info-sidebar";
import PostView from "@/components/post-view";
import QueryHandler from "@/components/query-handler";
import SelectFilterMode from "@/components/select-filter-mode";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { mapFetchErrors } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const PostPage: React.FC = () => {
  const [commentText, setCommentText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [filterMode, setFilterMode] = useState<SortBy>("new");
  const [filterTimespan, setFilterTimespan] = useState<Timespan>("all-time");

  const queryClient = useQueryClient();

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) =>
      mapFetchErrors({
        fetchFunction: () =>
          CommentsService.createComment({
            postId: postId,
            requestBody: {
              content,
            },
          }),
        key: `/comments/${postId}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });

  const onSubmit = async () => {
    try {
      await mutateAsync({
        postId: parseInt(id),
        content: commentText,
      });
      setCommentText("");
      setIsInputFocused(false);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

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
              <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border">
                <Textarea
                  className={cn("border-none", {
                    "resize-none": !isInputFocused,
                    "min-h-0": !isInputFocused,
                  })}
                  rows={isInputFocused ? undefined : 1}
                  placeholder="Add a comment"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  disabled={isPending}
                />
                {isInputFocused && (
                  <div className="flex justify-end gap-2 p-2">
                    <Button
                      variant="secondary"
                      onClick={() => setIsInputFocused(false)}
                      className="h-min w-min px-2 py-1"
                      disabled={isPending}>
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => onSubmit()}
                      className="h-min w-min px-2 py-1"
                      disabled={isPending}>
                      Comment
                    </Button>
                  </div>
                )}
              </div>
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
