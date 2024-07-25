import {
  CommentResponse,
  CommentsService,
  PostResponse,
  PostsService,
  RepliesService,
  ReplyResponse,
} from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { cn } from "@/lib/utils";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = (
  | {
      post: PostResponse;
    }
  | {
      comment: CommentResponse;
    }
  | {
      reply: ReplyResponse;
    }
) & {
  isListItem?: boolean;
};

const VotingButtons: React.FC<Props> = ({ isListItem = true, ...props }) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({
      isUpvote,
      unvote,
    }: {
      isUpvote: boolean;
      unvote: boolean;
    }) =>
      mapFetchErrors({
        fetchFunction: () => {
          if (unvote) {
            if ("post" in props) {
              return PostsService.unvotePost({
                id: props.post.id,
              });
            } else if ("comment" in props) {
              return CommentsService.unvoteComment({
                id: props.comment.id,
              });
            } else {
              return RepliesService.unvoteReply({
                id: props.reply.id,
              });
            }
          } else {
            if ("post" in props) {
              return PostsService.votePost({
                id: props.post.id,
                isUpvote,
              });
            } else if ("comment" in props) {
              return CommentsService.voteComment({
                id: props.comment.id,
                isUpvote,
              });
            } else {
              return RepliesService.voteReply({
                id: props.reply.id,
                isUpvote,
              });
            }
          }
        },
        key: `/${"post" in props ? "posts" : "comment" in props ? "comments" : "replies"}/vote`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          "post" in props
            ? ["posts"]
            : "comment" in props
              ? ["comments"]
              : ["replies"],
      });
    },
  });

  const onVote = async (isUpvote: boolean, unvote: boolean) => {
    try {
      await mutateAsync({ isUpvote, unvote });
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      toast.error(text, {
        description: details,
      });
    }
  };

  const item =
    "post" in props
      ? props.post
      : "comment" in props
        ? props.comment
        : props.reply;
  const isCommentOrReply = "comment" in props || "reply" in props;

  return (
    <div
      className={cn(
        "flex w-min items-center rounded-3xl",
        isCommentOrReply ? "mt-0 gap-1" : isListItem ? "mt-4" : "mt-8",
        { "bg-muted": !isCommentOrReply }
      )}>
      <Button
        variant="ghost"
        className={cn(
          "aspect-square h-min rounded-full hover:text-orange-500",
          isCommentOrReply ? "p-0" : "p-1",
          { "text-orange-500": item.upvoted === true }
        )}
        disabled={isPending}
        onClick={() => onVote(true, item.upvoted === true)}>
        <ArrowBigUp
          size={26}
          strokeWidth={1}
          fill={item.upvoted ? "currentColor" : "none"}
        />
      </Button>
      <span className="text-center">{item.votes}</span>
      <Button
        variant="ghost"
        className={cn(
          "aspect-square h-min rounded-full hover:text-indigo-500",
          isCommentOrReply ? "p-0" : "p-1",
          { "text-indigo-500": item.upvoted === false }
        )}
        disabled={isPending}
        onClick={() => onVote(false, item.upvoted === false)}>
        <ArrowBigDown
          size={26}
          strokeWidth={1}
          fill={item.upvoted === false ? "currentColor" : "none"}
        />
      </Button>
    </div>
  );
};

export default VotingButtons;
