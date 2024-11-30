import {
  CommentsService,
  RepliesService,
  VoteResponse,
} from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { cn, isComment, isReply } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import QueryHandler from "@/components/query-handler";
import { Skeleton } from "@/components/ui/skeleton";
import CommentView from "./comment-view";
import ReplyView from "./reply-view";

type Props = {
  vote: VoteResponse;
};

const VoteView: React.FC<Props> = ({ vote }) => {
  const [itemExpanded, setItemExpanded] = useState(false);

  const fetchFunction = async () => {
    if (vote.commentId !== undefined) {
      return await CommentsService.findCommentById({
        commentId: vote.commentId,
      });
    }

    if (vote.replyId !== undefined) {
      return await RepliesService.findOneReply({ replyId: vote.replyId });
    }

    throw new Error("Unknown parent type");
  };

  const itemQuery = useQuery({
    queryKey: ["votes", vote.id],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction,
        key: `/votes/${vote.id}`,
      }),
    enabled: itemExpanded,
  });

  return (
    <Collapsible className="flex h-min flex-col text-base font-normal">
      <CollapsibleTrigger
        onClick={() => {
          setItemExpanded(true);
        }}
        className="flex rounded-lg px-4 py-2 pl-2 transition-colors hover:bg-muted">
        {vote.postId === undefined && (
          <ChevronRight
            size={24}
            strokeWidth={1}
            fill="currentColor"
          />
        )}
        <span>
          <span className="font-bold">
            {vote.isUpvote ? "Up" : "Down"}voted
          </span>{" "}
          {vote.postId !== undefined ? (
            <Link
              to={`/app/posts/${vote.postId}`}
              className="underline">
              a post
            </Link>
          ) : (
            <span>
              {vote.postId !== undefined
                ? "a post"
                : vote.commentId !== undefined
                  ? "a comment"
                  : "a reply"}
            </span>
          )}
        </span>
        <span
          className={cn([
            "ml-2",
            vote.isUpvote ? "text-orange-500" : "text-indigo-500",
          ])}>
          {vote.isUpvote ? (
            <ArrowBigUp
              size={26}
              strokeWidth={1}
              fill="currentColor"
            />
          ) : (
            <ArrowBigDown
              size={26}
              strokeWidth={1}
              fill="currentColor"
            />
          )}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4">
        <QueryHandler
          query={itemQuery}
          loading={<Skeleton className="h-24 w-full rounded-lg bg-muted" />}
          error={() => (
            <p className="p-4 text-xl text-muted-foreground">
              An error occurred while fetching the item.
            </p>
          )}
          showToastOnError={true}
          success={item =>
            isComment(item) ? (
              <CommentView comment={item} />
            ) : isReply(item) ? (
              <ReplyView reply={item} />
            ) : (
              <p className="p-4 text-xl text-muted-foreground">
                An error occurred while fetching the item.
              </p>
            )
          }
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default VoteView;
