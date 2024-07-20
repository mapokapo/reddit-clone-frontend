import Loading from "@/components/loading";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";
import { CommunitiesService } from "@/client/requests";
import { useCommunitiesServiceFindAllCommunitiesKey } from "@/client/queries";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

const HomePage: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [useCommunitiesServiceFindAllCommunitiesKey],
    queryFn: fetcher({
      fetchFunction: CommunitiesService.findAllCommunities,
    }),
  });

  if (error) {
    const [text, details] = mapErrorToMessage(error);
    toast.error(text, {
      description: details,
    });
  }

  if (isLoading || data === undefined) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="prose flex h-full w-full flex-col dark:prose-invert">
      <h1>Hello world!</h1>
      <ul>
        {data.map(community => (
          <li key={community.id}>
            <h2>{community.name}</h2>
            <p>{community.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
