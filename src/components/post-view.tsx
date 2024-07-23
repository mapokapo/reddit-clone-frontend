import { Post, PostsService } from "@/client/requests";
import { getRelativeTime } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapFetchErrors } from "@/lib/fetcher";
import { toast } from "sonner";
import mapErrorToMessage from "@/lib/mapError";
import { Link } from "react-router-dom";

type Props = {
  post: Post;
};

const PostView: React.FC<Props> = ({ post }) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (isUpvote: boolean) =>
      mapFetchErrors({
        fetchFunction: () =>
          PostsService.votePost({
            id: post.id,
            isUpvote,
          }),
        key: "/posts/vote",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "posts",
          {
            id: post.id,
          },
        ],
      });
    },
  });

  const onVote = async (isUpvote: boolean) => {
    try {
      await mutateAsync(isUpvote);
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex h-auto flex-col items-start justify-start gap-2 whitespace-normal text-start text-base font-normal">
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
          className="aspect-square h-min rounded-full p-1 hover:text-orange-500"
          disabled={isPending}
          onClick={() => onVote(true)}>
          <ArrowBigUp
            size={26}
            strokeWidth={1}
          />
        </Button>
        <span className="text-center">{post.votes}</span>
        <Button
          variant="ghost"
          className="aspect-square h-min rounded-full p-1 hover:text-indigo-500"
          disabled={isPending}
          onClick={() => onVote(false)}>
          <ArrowBigDown
            size={26}
            strokeWidth={1}
          />
        </Button>
      </div>
    </Button>
  );
};

export default PostView;
