import RecentPosts from "@/components/recent-posts";
import PostsList from "@/components/posts-list";

const Feed: React.FC = () => {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-6xl gap-8 p-4">
      <div className="flex-[3]">
        <PostsList />
      </div>
      <div className="flex-1">
        <RecentPosts />
      </div>
    </main>
  );
};

export default Feed;
