import { CommunitiesService, PostsService } from "@/client/requests";
import Combobox from "@/components/combobox";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mapFetchErrors } from "@/lib/fetcher";
import mapErrorToMessage from "@/lib/mapError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  communityId: z.string().min(1, {
    message: "Community is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
});

const CreatePostPage: React.FC = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityId: "",
      title: "",
      content: "",
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: () =>
      mapFetchErrors({
        fetchFunction: () => CommunitiesService.findUserCommunities(),
        key: "/communities/me",
      }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      mapFetchErrors({
        fetchFunction: () =>
          PostsService.createPost({
            communityId: parseInt(values.communityId),
            requestBody: {
              content: values.content,
              title: values.title,
            },
          }),
        key: "/posts",
      }),
    onSuccess: async () => {
      form.reset();

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync(values);

      toast.success("Post created");
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      toast.error(text, {
        description: details,
      });
    }
  };

  if (error) {
    const [text, details] = mapErrorToMessage(error);
    toast.error(text, {
      description: details,
    });

    return <p>{text}</p>;
  }

  if (isLoading || data === undefined) {
    return <Loading />;
  }

  return (
    <main className="ml-24 mr-auto flex min-h-full w-full max-w-4xl flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Create post</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="communityId"
            render={({ field: { value, disabled } }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    value={value}
                    onValueChange={id =>
                      form.setValue("communityId", id, {
                        shouldDirty: true,
                        shouldValidate: true,
                        shouldTouch: true,
                      })
                    }
                    items={data.map(c => ({
                      label: c.name,
                      value: c.id.toString(),
                    }))}
                    emptyLabel="Join some communities to create a post."
                    searchLabel="Search for a community"
                    selectLabel="Select a community"
                    disabled={disabled === true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write something..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="ml-auto"
            disabled={
              form.formState.isSubmitting ||
              Object.values(form.getValues()).some(v => v.length === 0)
            }>
            Post
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default CreatePostPage;
