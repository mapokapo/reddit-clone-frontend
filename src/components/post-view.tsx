import { PostResponse, PostsService } from "@/client/requests";
import { cn, getRelativeTime } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapFetchErrors } from "@/lib/fetcher";
import { toast } from "sonner";
import mapErrorToMessage from "@/lib/mapError";
import { Link } from "react-router-dom";

type Props = {
  post: PostResponse;
};

const PostView: React.FC<Props> = ({ post }) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({isUpvote, unvote}: {isUpvote: boolean, unvote: boolean}) =>
      mapFetchErrors({
        fetchFunction: async () => {
          if (unvote) {
            return await PostsService.unvotePost({
              id: post.id,
            });
          } else {
            return await PostsService.votePost({
              id: post.id,
              isUpvote,
            });
          }
        },
        key: "/posts/vote",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const onVote = async (isUpvote: boolean, unvote: boolean) => {
    try {
      await mutateAsync({isUpvote, unvote});
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg px-4 py-2  transition-colors hover:bg-muted">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link
          to={`/app/communities/${post.communityId}`}
          className="text-foreground hover:underline">
          {post.communityName}
        </Link>
        <Dot size={16} />
        <span>{getRelativeTime(new Date(post.createdAt))}</span>
      </div>
      <Link
        to={`/app/posts/${post.id}`}
        className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
        <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
      </Link>
      <div className="mt-1 flex w-min items-center rounded-3xl bg-muted">
        <Button
          variant="ghost"
          className={cn(
            "aspect-square h-min rounded-full p-1 hover:text-orange-500",
            { "text-orange-500": post.upvoted === true }
          )}
          disabled={isPending}
          onClick={() => onVote(true, post.upvoted === true)}>
          <ArrowBigUp
            size={26}
            strokeWidth={1}
            fill={post.upvoted ? "currentColor" : "none"}
          />
        </Button>
        <span className="text-center">{post.votes}</span>
        <Button
          variant="ghost"
          className={cn(
            "aspect-square h-min rounded-full p-1 hover:text-indigo-500",
            { "text-indigo-500": post.upvoted === false }
          )}
          disabled={isPending}
          onClick={() => onVote(false, post.upvoted === false)}>
          <ArrowBigDown
            size={26}
            strokeWidth={1}
            fill={post.upvoted === false ? "currentColor" : "none"}
          />
        </Button>
      </div>
    </div>
  );
};

export default PostView;
