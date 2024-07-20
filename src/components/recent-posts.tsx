const RecentPosts: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-muted/60 p-4">
      <h6 className="text-base uppercase text-muted-foreground">
        Recent Posts
      </h6>
      <ol className="flex flex-col gap-4"></ol>
    </div>
  );
};

export default RecentPosts;
