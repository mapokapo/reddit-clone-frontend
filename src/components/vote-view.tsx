import { Vote } from "@/client/requests";

type Props = {
  vote: Vote;
};

const VoteView: React.FC<Props> = ({ vote }) => {
  return (
    <div className="py- gap-22 m-4 flex flex-col rounded-lg bg-background px-4">
      <p>{vote.postId}</p>
      <p>{vote.isUpvote}</p>
    </div>
  );
};

export default VoteView;
