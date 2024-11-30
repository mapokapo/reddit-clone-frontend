import { PostResponse, UsersService } from "@/client/requests";
import { cn, getRelativeTime, initials } from "@/lib/utils";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";
import VotingButtons from "./voting-buttons";
import { useQuery } from "@tanstack/react-query";
import { mapFetchErrors } from "@/lib/fetcher";
import QueryHandler from "./query-handler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  post: PostResponse;
  isListItem?: boolean;
};

const PostView: React.FC<Props> = ({ post, isListItem = true }) => {
  const MainComponent = isListItem ? Link : "div";

  const authorQuery = useQuery({
    queryKey: ["users", post.authorId],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          UsersService.getUserById({
            id: post.authorId,
          }),
        key: `/users/${post.authorId}`,
      }),
  });

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
      <QueryHandler
        query={authorQuery}
        loading={<div>Loading...</div>}
        error={() => <div>Error</div>}
        showToastOnError={true}
        success={author => (
          <Link
            to={`/app/profiles/${post.authorId}`}
            className="mt-1 flex items-center gap-1 font-bold text-foreground hover:underline">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={author.photoUrl}
                alt={author.name}
              />
              <AvatarFallback className="text-xs">
                {initials(author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{author.name}</span>
          </Link>
        )}
      />
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
