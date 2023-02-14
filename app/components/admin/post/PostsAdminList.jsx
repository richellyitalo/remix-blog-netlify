import PostAdminListItem from "./PostAdminListItem";

export default function PostsAdminList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostAdminListItem
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
