import { RepliesService } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { getRelativeTime } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";
import QueryHandler from "@/components/query-handler";
import VotingButtons from "@/components/voting-buttons";
import Loading from "./loading";

type Props = {
  commentId: number;
};

const RepliesList: React.FC<Props> = ({ commentId }) => {
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
            <li
              key={reply.id}
              className="ml-2 flex flex-col gap-2">
              <div className="ml-1 flex items-center text-sm text-muted-foreground">
                <Link
                  to={`/app/profiles/${reply.author.id}`}
                  className="font-bold text-foreground hover:underline">
                  {reply.author.name}
                </Link>
                <Dot size={16} />
                <span>{getRelativeTime(new Date(reply.createdAt))}</span>
              </div>
              <p className="ml-1 text-sm">{reply.content}</p>
              <VotingButtons
                reply={reply}
                isListItem={false}
              />
            </li>
          ))}
        </ol>
      )}
    />
  );
};

export default RepliesList;
