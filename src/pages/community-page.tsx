import { CommunitiesService } from "@/client/requests";
import PostsList from "@/components/posts-list";
import QueryHandler from "@/components/query-handler";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { mapFetchErrors } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CommunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  if (id === undefined || isNaN(parseInt(id))) {
    return <div>Invalid community ID</div>;
  }

  const query = useQuery({
    queryKey: ["communities", id],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          CommunitiesService.findOneCommunity({
            id: parseInt(id),
          }),
        key: `/communities/${id}`,
      }),
  });

  const userMemberStatusQuery = useQuery({
    queryKey: ["communities", id, "userIsMember"],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          CommunitiesService.checkUserMembership({
            id: parseInt(id),
          }),
        key: `/communities/${id}/userIsMember`,
      }),
  });

  const {
    mutateAsync: mutateLeaveOrJoinCommunityAsync,
    isPending: leaveOrJoinCommunityIsPending,
  } = useMutation({
    mutationFn: ({
      communityId,
      userIsMember,
    }: {
      communityId: number;
      userIsMember: boolean;
    }) =>
      mapFetchErrors({
        fetchFunction: () =>
          userIsMember
            ? CommunitiesService.leaveCommunity({
                id: communityId,
              })
            : CommunitiesService.joinCommunity({
                id: communityId,
              }),
        key: `/communities/${communityId}/${userIsMember ? "leave" : "join"}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["communities", id, "userIsMember"],
      });
    },
  });

  const onLeaveOrJoin = async (
    communityId: number,
    userMemberStatus: string
  ) => {
    const userIsMember = userMemberStatus === "member";

    try {
      await mutateLeaveOrJoinCommunityAsync({ communityId, userIsMember });
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl gap-8 p-4 py-16">
      <QueryHandler
        query={query}
        error={() => <div>An error has occured</div>}
        loading={
          <div className="flex h-1/3 w-full flex-col gap-2">
            <Skeleton className="h-2/3 w-full" />
            <Skeleton className="h-1/3 w-full" />
          </div>
        }
        success={community => (
          <div className="flex h-1/3 w-full flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{community.name}</h1>
                  {community.isPrivate && (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <h2 className="text-lg text-muted-foreground">
                  {community.description}
                </h2>
              </div>
              <QueryHandler
                query={userMemberStatusQuery}
                error={() => <div>An error has occured</div>}
                loading={<Skeleton className="h-[150px] w-[300px]" />}
                success={userMemberStatus => (
                  <Button
                    variant={
                      userMemberStatus === "member" ? "destructive" : "default"
                    }
                    onClick={() =>
                      onLeaveOrJoin(community.id, userMemberStatus)
                    }
                    disabled={leaveOrJoinCommunityIsPending}>
                    {userMemberStatus === "member" ? "Leave" : "Join"}
                  </Button>
                )}
              />
            </div>
            <PostsList communityId={community.id} />
          </div>
        )}
      />
    </main>
  );
};

export default CommunityPage;
