import { Link, useActionData, useFetcher } from "@remix-run/react";

export default function PostAdminListItem({ post }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  function createMarkup(content) {
    return { __html: content };
  }

  function deletePostHandler() {
    const proceed = confirm("Are you sure you want to delete this post?");

    if (!proceed) {
      return;
    }

    fetcher.submit(null, {
      method: "DELETE",
      action: `/admin/posts/edit/${post.id}`,
    });
  }

  if (isSubmitting) {
    return (
      <div className="p-2 bg-purple-400 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm">
        Deleting post...
      </div>
    );
  }

  return (
    <div className="p-2 bg-purple-700 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm">
      <div>
        <h2 className="font-semibold">{post.title}</h2>
        <p
          className="text-sm text-purple-300"
          dangerouslySetInnerHTML={createMarkup(post.content.slice(0, 200))}
        />
        <p>
          {post?.categories.map((category) => (
            <span
              key={category.id}
              className="text-sm mr-2 bg-purple-600 p-1 rounded-sm"
            >
              {category.name}
            </span>
          ))}
        </p>
      </div>
      <div className="text-right pl-2">
        <div>
          <Link
            to={`/admin/posts/edit/${post.id}`}
            className="text-white text-lg hover:text-yellow-300"
          >
            Edit
          </Link>
        </div>
        <button
          type="button"
          className="text-sm text-red-200 hover:text-yellow-300"
          onClick={deletePostHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
