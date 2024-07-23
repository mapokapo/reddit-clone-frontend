import { UsersService } from "@/client/requests";
import PostView from "@/components/post-view";
import QueryHandler from "@/components/query-handler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/components/user-provider";
import VoteView from "@/components/vote-view";
import { mapFetchErrors } from "@/lib/fetcher";
import { range } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ViewMode = "all" | "posts" | "votes";

const ProfilePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const { profile } = useUserProfile();

  const items = useQuery({
    queryKey: [
      "users",
      {
        id: profile.id,
        include: viewMode === "all" ? ["posts", "votes"] : [viewMode],
      },
    ],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: UsersService.getUserData,
        key: "/users/me",
      }),
  });

  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-8 p-4 py-16">
      <div className="flex h-min items-center gap-2">
        <Avatar className="h-24 w-24 border-2 border-border p-2">
          <AvatarImage
            src={profile.photoUrl}
            alt={profile.name}
          />
          <AvatarFallback>{profile.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{profile.name}</span>
          <span className="text-lg text-muted-foreground">{profile.email}</span>
        </div>
      </div>
      <Separator />
      <Tabs
        defaultValue="all"
        value={viewMode}
        onValueChange={value => setViewMode(value as ViewMode)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="votes">Votes</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-4">
        <QueryHandler
          query={items}
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
                    {"isUpvote" in item ? (
                      <VoteView vote={item} />
                    ) : (
                      <PostView post={item} />
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
