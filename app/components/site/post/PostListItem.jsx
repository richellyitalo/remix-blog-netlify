import { Link } from "react-router-dom";

export default function PostListItem({ post }) {
  function createMarkup(markup) {
    return { __html: markup };
  }

  return (
    <div className="post-list-item py-2">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <div
        className="pb-2 entry-text text-slate-500"
        dangerouslySetInnerHTML={createMarkup(post.content)}
      />
      <div>
        {post.categories &&
          post.categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="text-blue-500 underline hover:no-underline"
            >
              {category.name}
            </Link>
          ))}
      </div>
      <div className="mt-2">
        <Link
          to={`/post/${post.id}`}
          className="text-white rounded-md p-1 px-4 bg-blue-600 hover:bg-blue-900"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
