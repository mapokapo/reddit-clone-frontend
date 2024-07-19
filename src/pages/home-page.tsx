import Loading from "@/components/loading";
import { fetcher } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";

const HomePage: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/products?limit=10",
    fetcher({
      schemas: {
        responseBody: z.object({
          products: z.array(
            z.object({
              id: z.number(),
              title: z.string(),
              price: z.number(),
            })
          ),
          total: z.number(),
          limit: z.number(),
          skip: z.number(),
        }),
      },
    })
  );

  if (error) {
    const [text, details] = mapErrorToMessage(error);
    toast.error(text, {
      description: details,
    });
  }

  if (isLoading || data === undefined) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="prose flex min-h-screen w-full flex-col dark:prose-invert">
      <h1>Hello world!</h1>
      <ul>
        {data.products.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
