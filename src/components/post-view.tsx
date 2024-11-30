import { PostResponse, PostsService, UsersService } from "@/client/requests";
import { cn, getRelativeTime, initials } from "@/lib/utils";
import { Dot, Ellipsis } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VotingButtons from "./voting-buttons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mapFetchErrors } from "@/lib/fetcher";
import QueryHandler from "./query-handler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserProfile } from "@/components/user-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

enum Dialogs {
  deletePostDialog = "deletePostDialog",
  editPostDialog = "editPostDialog",
}

type Props = {
  post: PostResponse;
  isListItem?: boolean;
};

const PostView: React.FC<Props> = ({ post, isListItem = true }) => {
  const MainComponent = isListItem ? Link : "div";
  const { profile } = useUserProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [editPostContentText, setEditPostContentText] = useState("");
  const [editPostTitleText, setEditPostTitleText] = useState("");
  const [dialog, setDialog] = useState<Dialogs | null>(null);

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

  const { mutateAsync: mutateDeletePostAsync, isPending: deletePostIsPending } =
    useMutation({
      mutationFn: ({ postId }: { postId: number }) =>
        mapFetchErrors({
          fetchFunction: () =>
            PostsService.removePost({
              id: postId,
            }),
          key: `/posts/${post.id}`,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
    });

  const { mutateAsync: mutateEditPostAsync, isPending: editPostIsPending } =
    useMutation({
      mutationFn: ({
        postId,
        title,
        content,
      }: {
        postId: number;
        title: string;
        content: string;
      }) =>
        mapFetchErrors({
          fetchFunction: () =>
            PostsService.updatePost({
              id: postId,
              requestBody: {
                title,
                content,
              },
            }),
          key: `/posts/${post.id}`,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
    });

  const onDelete = async (postId: number) => {
    try {
      await mutateDeletePostAsync({ postId });
      setDialog(null);
      navigate("/");
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onEdit = async (postId: number, title: string, content: string) => {
    try {
      await mutateEditPostAsync({ postId, title, content });
      setDialog(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <div
      className={cn(
        "flex h-min flex-col items-start py-2",
        isListItem ? "rounded-lg px-4 transition-colors hover:bg-muted" : ""
      )}>
      <div className="relative flex w-full items-center text-sm text-muted-foreground">
        <Link
          to={`/app/communities/${post.communityId}`}
          className="text-foreground hover:underline">
          {post.communityName}
        </Link>
        <Dot size={16} />
        <span>{getRelativeTime(new Date(post.createdAt))}</span>
        {post.authorId === profile.id && (
          <Dialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 !h-min !w-min p-2 !ring-offset-0">
                  <Ellipsis size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger
                  asChild
                  onClick={() => {
                    setEditPostTitleText(post.title);
                    setEditPostContentText(post.content);
                    setDialog(Dialogs.editPostDialog);
                  }}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => setDialog(Dialogs.deletePostDialog)}>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              {dialog === Dialogs.editPostDialog ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Edit post
                    </DialogTitle>
                    <DialogDescription>
                      Make changes to your post.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="edit-post-title"
                        className="text-foreground">
                        Title
                      </Label>
                      <Input
                        id="edit-post-title"
                        value={editPostTitleText}
                        onChange={e => setEditPostTitleText(e.target.value)}
                        className="text-foreground"
                        disabled={deletePostIsPending}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="edit-post-content"
                        className="text-foreground">
                        Content
                      </Label>
                      <Textarea
                        id="edit-post-content"
                        value={editPostContentText}
                        onChange={e => setEditPostContentText(e.target.value)}
                        className="text-foreground"
                        disabled={deletePostIsPending}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="default"
                        type="button"
                        onClick={() => {
                          onEdit(
                            post.id,
                            editPostTitleText,
                            editPostContentText
                          );
                        }}
                        disabled={editPostIsPending}>
                        Save
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={editPostIsPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Are you sure you want to delete this post?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                          onDelete(post.id);
                        }}
                        disabled={deletePostIsPending}>
                        Delete
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={deletePostIsPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
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
