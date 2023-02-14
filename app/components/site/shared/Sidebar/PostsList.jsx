import PostListItem from "./PostListItem";

export default function PostsList({ posts }) {
  return (
    <div className="posts-list">
      <h3 className="text-lg font-semibold">Posts</h3>
      <div>
        {posts.map((category) => (
          <PostListItem
            category={category}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
