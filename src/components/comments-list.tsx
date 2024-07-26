import { CommentsService, SortBy, Timespan } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import QueryHandler from "@/components/query-handler";
import { Skeleton } from "@/components/ui/skeleton";
import CommentView from "./comment-view";

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
            <li key={comment.id}>
              <CommentView comment={comment} />
            </li>
          ))}
        </ol>
      )}
    />
  );
};

export default CommentsList;
