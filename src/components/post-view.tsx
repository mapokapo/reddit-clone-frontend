import { Post } from "@/client/requests";

type Props = {
  post: Post;
};

const PostView: React.FC<Props> = ({ post }) => {
  return (
    <div className="py- gap-22 m-4 flex flex-col rounded-lg bg-background px-4">
      <p>{post.title}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostView;
