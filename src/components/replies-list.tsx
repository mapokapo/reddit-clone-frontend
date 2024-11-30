import { RepliesService, ReplyResponse } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import QueryHandler from "@/components/query-handler";
import Loading from "@/components/loading";
import ReplyView from "./reply-view";

type Props = {
  commentId: number;
  onReplyTo: (reply: ReplyResponse) => void;
};

const RepliesList: React.FC<Props> = ({ commentId, onReplyTo }) => {
  const query = useQuery({
    queryKey: ["replies", commentId],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          RepliesService.findAllReplies({
            commentId,
          }),
        key: `/comments/${commentId}/replies`,
      }),
  });

  return (
    <QueryHandler
      query={query}
      error={() => <span>An error has occured</span>}
      loading={<Loading />}
      success={replies => (
        <ol className="ml-4 flex flex-col gap-4 border-l border-border">
          {replies.map(reply => (
            <li key={reply.id}>
              <ReplyView
                reply={reply}
                onReplyTo={onReplyTo}
              />
            </li>
          ))}
        </ol>
      )}
    />
  );
};

export default RepliesList;
