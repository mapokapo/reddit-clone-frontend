import { CommunitiesService } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import QueryHandler from "@/components/query-handler";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock } from "lucide-react";

type Props = {
  communityId: number;
};

const CommunityInfoSidebar: React.FC<Props> = ({ communityId }) => {
  const query = useQuery({
    queryKey: ["communities", communityId],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () =>
          CommunitiesService.findOneCommunity({
            id: communityId,
          }),
        key: `/communities/${communityId}`,
      }),
  });

  return (
    <div className="flex h-min max-h-[48rem] w-full flex-col rounded-lg bg-muted/60 p-4">
      <QueryHandler
        query={query}
        error={() => <span>An error has occured</span>}
        loading={
          <div className="flex h-1/3 w-full flex-col gap-2">
            <Skeleton className="h-2/3 w-full" />
            <Skeleton className="h-1/3 w-full" />
          </div>
        }
        success={community => (
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-end gap-2">
              {community.isPrivate && (
                <Lock
                  size={18}
                  className="mb-0.5 text-muted-foreground"
                />
              )}
              <h3 className="text-xl">{community.name}</h3>
            </div>
            <p className="text-sm text-secondary-foreground/75">
              {community.description}
            </p>
            <span className="ml-auto mt-auto text-sm text-muted-foreground">
              Since {new Date(community.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default CommunityInfoSidebar;
