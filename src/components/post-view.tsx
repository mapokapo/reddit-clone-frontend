import { PostResponse } from "@/client/requests";
import { cn, getRelativeTime } from "@/lib/utils";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";
import VotingButtons from "./voting-buttons";

type Props = {
  post: PostResponse;
  isListItem?: boolean;
};

const PostView: React.FC<Props> = ({ post, isListItem = true }) => {
  const MainComponent = isListItem ? Link : "div";

  return (
    <div
      className={cn(
        "flex h-min flex-col py-2",
        isListItem ? "rounded-lg px-4 transition-colors hover:bg-muted" : ""
      )}>
      <div className="flex items-center text-sm text-muted-foreground">
        <Link
          to={`/app/communities/${post.communityId}`}
          className="text-foreground hover:underline">
          {post.communityName}
        </Link>
        <Dot size={16} />
        <span>{getRelativeTime(new Date(post.createdAt))}</span>
      </div>
      <MainComponent
        to={`/app/posts/${post.id}`}
        className={cn("flex flex-col", isListItem ? "gap-2" : "gap-4")}>
        <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
        <p className="text-[15px] text-secondary-foreground/75">
          {post.content}
        </p>
      </MainComponent>
      <VotingButtons
        post={post}
        isListItem={isListItem}
      />
    </div>
  );
};

export default PostView;
