import PostListItem from "./PostListItem";

export default function PostsList ({ posts }) {
    return (
        <div className="posts-list">
            {posts.map((post) => (
              <div
                key={post.id}
                className="py-4 border-b"
              >
                <PostListItem post={post} />
              </div>
            ))}
        </div>
    )
}