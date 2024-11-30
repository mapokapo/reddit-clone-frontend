import { VoteResponse } from "@/client/requests";

type Props = {
  vote: VoteResponse;
};

const VoteView: React.FC<Props> = ({ vote }) => {
  return (
    <div className="m-4 flex flex-col gap-2 rounded-lg bg-background px-4 py-2">
      <p>{vote.id}</p>
      <p>{vote.postId ?? vote.commentId ?? vote.replyId ?? "unknown parent"}</p>
      <p>{vote.isUpvote ? "Upvote" : "Downvote"}</p>
      <p>{vote.voterId}</p>
    </div>
  );
};

export default VoteView;
