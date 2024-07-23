import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  photoFile: z
    .custom<File>(value => {
      return value instanceof File;
    })
    .optional(),
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach(image =>
    dataTransfer.items.add(image)
  );

  const file = dataTransfer.files[0];
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { file, displayUrl };
}

type Props = {
  onSubmit: (
    values: Omit<z.infer<typeof formSchema>, "photoUrl"> & { photoFile?: File }
  ) => void;
  actionError: string | null;
};

const RegisterComponent: React.FC<Props> = ({
  onSubmit,
  actionError,
}) => {
  const [photoData, setPhotoData] = useState<
    | {
        displayUrl: string;
        file: File;
      }
    | undefined
  >();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photoFile: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(values =>
          onSubmit({ ...values, photoFile: photoData?.file })
        )}>
        <Card className="flex flex-col space-y-4">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
          </CardHeader>
          <CardContent
            className={cn("flex flex-col", actionError !== null ? "pb-0" : "")}>
            <div className="flex flex-col gap-4">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage
                  src={photoData?.displayUrl}
                  alt="Photo"
                />
                <AvatarFallback>Photo</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="photoFile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...rest}
                        type="file"
                        disabled={form.formState.isSubmitting}
                        className="file:text-muted-foreground"
                        onChange={event => {
                          const data = getImageData(event);
                          setPhotoData(data);
                          onChange(data.file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <span>Email</span>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={16} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>
                              We'll never share your email with anyone else.
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <span>Password</span>
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={16} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <span>
                              Password must be at least 8 characters long.
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {actionError && (
              <span className="mx-auto pb-2 pt-4 text-red-700">
                {actionError}
              </span>
            )}
          </CardContent>
          <CardFooter className="mt-2 flex flex-col pb-4">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}>
              Sign in
            </Button>
            <div className="mt-2 flex w-full justify-between gap-1 px-2 py-1">
              <Button
                type="button"
                variant="link"
                className="px-0"
                disabled={form.formState.isSubmitting}
                asChild>
                <Link to="/auth/login">Already have an account?</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RegisterComponent;
