import { CommentsService, SortBy, Timespan } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import QueryHandler from "./query-handler";
import { Skeleton } from "@/components/ui/skeleton";
import { Dot, Reply } from "lucide-react";
import { getRelativeTime } from "@/lib/utils";
import VotingButtons from "./voting-buttons";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RepliesList from "./repliest-list";

type Props = {
  postId: number;
  filterMode: SortBy;
  filterTimespan: Timespan;
};

const CommentsList: React.FC<Props> = ({
  postId,
  filterMode,
  filterTimespan,
}) => {
  const [repliesEnabled, setRepliesEnabled] = useState<
    {
      commentId: number;
      enabled: boolean;
    }[]
  >([]);
  const query = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          CommentsService.findAllComments({
            postId,
            sortBy: filterMode,
            timespan: filterTimespan,
          }),
        key: `/comments/posts/${postId}`,
      }),
  });

  return (
    <QueryHandler
      query={query}
      error={() => <span>An error has occured</span>}
      loading={
        <div className="flex flex-col gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      }
      success={comments => (
        <ol className="flex flex-col gap-4">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="flex flex-col gap-2">
              <div className="ml-1 flex items-center text-sm text-muted-foreground">
                <Link
                  to={`/app/profiles/${comment.author.id}`}
                  className="font-bold text-foreground hover:underline">
                  {comment.author.name}
                </Link>
                <Dot size={16} />
                <span>{getRelativeTime(new Date(comment.createdAt))}</span>
              </div>
              <p className="ml-1 text-sm">{comment.content}</p>
              <VotingButtons
                comment={comment}
                isListItem={false}
              />
              {comment.replyCount === 0 ? null : repliesEnabled.find(
                  replyEnabled =>
                    replyEnabled.commentId === comment.id &&
                    replyEnabled.enabled
                ) ? (
                <RepliesList commentId={comment.id} />
              ) : (
                <Button
                  variant="ghost"
                  className="!m-0 ml-2 flex h-min w-min items-center gap-2 p-1"
                  onClick={() => {
                    setRepliesEnabled([
                      ...repliesEnabled,
                      {
                        commentId: comment.id,
                        enabled: true,
                      },
                    ]);
                  }}>
                  <Reply
                    size={18}
                    className="-scale-100"
                  />
                  {comment.replyCount} replies
                </Button>
              )}
            </li>
          ))}
        </ol>
      )}
    />
  );
};

export default CommentsList;
