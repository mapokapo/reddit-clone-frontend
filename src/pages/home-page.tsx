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
      schemas:
      {
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
      })
    },
    })
  );

  if (error) {
    const message = mapErrorToMessage(error);
    toast.error(message);
  }

  if (isLoading || data === undefined) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="prose dark:prose-invert flex h-full w-full flex-col">
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
