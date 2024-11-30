import { UsersService } from "@/client/requests";
import CommentView from "@/components/comment-view";
import PostView from "@/components/post-view";
import QueryHandler from "@/components/query-handler";
import ReplyView from "@/components/reply-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/components/user-provider";
import VoteView from "@/components/vote-view";
import { mapFetchErrors } from "@/lib/fetcher";
import { initials, isComment, isPost, isReply, range } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

type ViewMode = "all" | "posts" | "votes" | "comments";

const ProfilePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const { profile: currentProfile } = useUserProfile();
  const { id } = useParams<{ id: string }>();

  if (id !== undefined && isNaN(parseInt(id))) {
    return <div>Invalid profile ID</div>;
  }

  const userInfoQuery = useQuery({
    queryKey: [
      "users",
      {
        id: id !== undefined ? id : "me",
      },
    ],
    queryFn: () =>
      id !== undefined
        ? mapFetchErrors({
            fetchFunction: async () =>
              await UsersService.getUserById({
                id: parseInt(id),
              }),
            key: `/users/${id}`,
          })
        : currentProfile,
  });

  const itemsQuery = useQuery({
    queryKey: [
      "users",
      {
        id: id !== undefined ? parseInt(id) : currentProfile.id,
        include:
          viewMode === "all"
            ? ["posts", "comments", "replies", "votes"]
            : [viewMode],
      },
    ],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: async () =>
          await UsersService.getUserData({
            userId: id !== undefined ? parseInt(id) : currentProfile.id,
            include:
              viewMode === "all"
                ? ["posts", "comments", "replies", "votes"]
                : viewMode === "comments"
                  ? ["comments", "replies"]
                  : [viewMode],
          }),
        key: `/users/userdata/${id !== undefined ? id : "me"}`,
      }),
  });

  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-8 p-4 py-16">
      <QueryHandler
        query={userInfoQuery}
        loading={
          <div className="flex h-1/3 w-full flex-col gap-2">
            <Skeleton className="h-24 w-full rounded-lg bg-muted" />
            <Skeleton className="h-24 w-full rounded-lg bg-muted" />
          </div>
        }
        error={() => (
          <p className="p-4 text-xl text-muted-foreground">
            An error occurred while fetching user data.
          </p>
        )}
        success={profile => (
          <div className="flex h-min items-center gap-2">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage
                src={profile.photoUrl}
                alt={profile.name}
              />
              <AvatarFallback>{initials(profile.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{profile.name}</span>
              <span className="text-lg text-muted-foreground">
                {profile.email}
              </span>
            </div>
          </div>
        )}
      />
      <Separator />
      <Tabs
        defaultValue="all"
        value={viewMode}
        onValueChange={value => setViewMode(value as ViewMode)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="votes">Votes</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-4">
        <QueryHandler
          query={itemsQuery}
          loading={range(3).map(key => (
            <Skeleton
              key={key}
              className="h-24 w-full rounded-lg bg-muted"
            />
          ))}
          error={() => (
            <p className="p-4 text-xl text-muted-foreground">
              An error occurred while fetching your user data.
            </p>
          )}
          showToastOnError={true}
          success={items =>
            items.length === 0 ? (
              <p className="px-4 text-xl text-muted-foreground">
                There is nothing here.
              </p>
            ) : (
              <ul className="flex w-full flex-col gap-4">
                {items.map(item => (
                  <li
                    key={item.id}
                    className="flex w-full gap-4">
                    {isPost(item) ? (
                      <PostView post={item} />
                    ) : isComment(item) ? (
                      <div className="flex w-full flex-col">
                        <span className="text-sm font-semibold">Comment</span>
                        <CommentView comment={item} />
                      </div>
                    ) : isReply(item) ? (
                      <div className="flex w-full flex-col">
                        <span className="text-sm font-semibold">Reply</span>
                        <ReplyView reply={item} />
                      </div>
                    ) : (
                      <VoteView vote={item} />
                    )}
                  </li>
                ))}
              </ul>
            )
          }
        />
      </div>
    </main>
  );
};

export default ProfilePage;
