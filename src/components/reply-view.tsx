import { RepliesService, ReplyResponse } from "@/client/requests";
import { useUserProfile } from "@/components/user-provider";
import { Button } from "@/components/ui/button";
import {
  containsMention,
  extractMentionFromReply,
  getRelativeTime,
  normalizeReplyContent,
} from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import mapErrorToMessage from "@/lib/mapError";
import { Dot, Ellipsis, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import VotingButtons from "@/components/voting-buttons";
import { toast } from "sonner";
import { mapFetchErrors } from "@/lib/fetcher";

enum Dialogs {
  deleteReplyDialog = "deleteReplyDialog",
  editReplyDialog = "editReplyDialog",
}

type Props = {
  reply: ReplyResponse;
  onReplyTo: (reply: ReplyResponse) => void;
};

const ReplyView: React.FC<Props> = ({ reply, onReplyTo }) => {
  const { profile } = useUserProfile();
  const queryClient = useQueryClient();

  const [editReplyText, setEditReplyText] = useState("");
  const [dialog, setDialog] = useState<Dialogs | null>(null);

  const {
    mutateAsync: mutateDeleteReplyAsync,
    isPending: deleteReplyIsPending,
  } = useMutation({
    mutationFn: ({ replyId }: { replyId: number }) =>
      mapFetchErrors({
        fetchFunction: () =>
          RepliesService.deleteReply({
            replyId,
          }),
        key: `/replies/${replyId}`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["replies", reply.commentId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["comments", reply.commentId],
      });
    },
  });

  const { mutateAsync: mutateEditReplyAsync, isPending: editReplyIsPending } =
    useMutation({
      mutationFn: ({
        replyId,
        content,
      }: {
        replyId: number;
        content: string;
      }) =>
        mapFetchErrors({
          fetchFunction: () =>
            RepliesService.updateReply({
              replyId,
              requestBody: {
                content,
              },
            }),
          key: `/replies/${replyId}`,
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["replies", reply.commentId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["comments", reply.commentId],
        });
      },
    });

  const onDelete = async (replyId: number) => {
    try {
      await mutateDeleteReplyAsync({ replyId });
      setDialog(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onEdit = async (
    replyId: number,
    content: string,
    replyingTo: {
      name: string;
      id: number;
    } | null
  ) => {
    try {
      await mutateEditReplyAsync({
        replyId,
        content:
          replyingTo !== null
            ? `@{${replyingTo.name}-${replyingTo.id}} ${content}`
            : content,
      });
      setDialog(null);
    } catch (e) {
      const [text, details] = mapErrorToMessage(e);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <div className="ml-2 flex flex-col gap-2">
      <div className="relative ml-1 flex items-center text-sm text-muted-foreground">
        <Link
          to={`/app/profiles/${reply.author.id}`}
          className="font-bold text-foreground hover:underline">
          {reply.author.name}
        </Link>
        <Dot size={16} />
        <span>{getRelativeTime(new Date(reply.createdAt))}</span>
        {reply.author.id === profile.id && (
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
                    if (containsMention(reply.content)) {
                      setEditReplyText(
                        normalizeReplyContent(reply.content, true)
                      );
                    } else {
                      setEditReplyText(reply.content);
                    }
                    setDialog(Dialogs.editReplyDialog);
                  }}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={() => setDialog(Dialogs.deleteReplyDialog)}>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              {dialog === Dialogs.editReplyDialog ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Edit reply
                      {containsMention(reply.content)
                        ? ` to ${extractMentionFromReply(reply.content)?.name ?? "user"}`
                        : ""}{" "}
                    </DialogTitle>
                    <DialogDescription>
                      Make changes to your reply.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Textarea
                      value={editReplyText}
                      onChange={e => setEditReplyText(e.target.value)}
                      className="text-foreground"
                      disabled={editReplyIsPending}
                    />
                  </div>
                  <DialogFooter>
                    {containsMention(reply.content) && (
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => {
                            onEdit(reply.id, editReplyText, null);
                          }}
                          disabled={editReplyIsPending}>
                          Remove mention
                        </Button>
                      </DialogClose>
                    )}
                    <DialogClose asChild>
                      <Button
                        variant="default"
                        type="button"
                        onClick={() => {
                          onEdit(
                            reply.id,
                            editReplyText,
                            extractMentionFromReply(reply.content)
                          );
                        }}
                        disabled={editReplyIsPending}>
                        Save
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={editReplyIsPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      Are you sure you want to delete this reply?
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
                          onDelete(reply.id);
                        }}
                        disabled={deleteReplyIsPending}>
                        Delete
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={deleteReplyIsPending}>
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
      <p className="ml-1 text-sm">{normalizeReplyContent(reply.content)}</p>
      <div className="flex gap-2">
        {reply.author.id !== profile.id && (
          <VotingButtons
            reply={reply}
            isListItem={false}
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="!m-0 ml-2 flex h-min w-min items-center gap-2 p-1"
          onClick={() => {
            onReplyTo(reply);
          }}>
          <MessageCircle size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ReplyView;
