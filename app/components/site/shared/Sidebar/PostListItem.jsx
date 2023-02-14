import { Link } from "@remix-run/react";

export default function PostListItem({ category: post }) {
  function createMarkup(markup) {
    return { __html: markup };
  }

  return (
    <div
      key={post.id}
      className="post-list-item mb-3 border-b pb-4"
    >
      <Link
        to={`/post/${post.id}`}
        className="text-blue-600 hover:underline block pb-2"
      >
        {post.title}
      </Link>
      <p
        className="text-slate-500 text-sm"
        dangerouslySetInnerHTML={createMarkup(post.content.substring(0, 100))}
      />
    </div>
  );
}
