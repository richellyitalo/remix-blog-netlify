import { Link, useLoaderData } from "@remix-run/react";
import { getPost } from "~/data/blog.server";

export function loader({ params }) {
  const postId = params.id;
  return getPost(postId);
}

export function meta({ data : post, params, parentsData }) {
  const postInParent = parentsData["routes/__site"].posts.find(
    (postParent) => postParent.id === params.id
  );

  // or just use variable "data:post"

  return {
    title: postInParent.title,
    description: postInParent.content.slice(0, 60)
  };
}

export default function PostPage() {
  const post = useLoaderData();
  function createMarkup(markup) {
    return { __html: markup };
  }

  return (
    <div className="post-detail">
      <h1 className="text-2xl font-bold">{post.title}</h1>
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

      <div
        className="post-entry-text py-4"
        dangerouslySetInnerHTML={createMarkup(post.content)}
      />
    </div>
  );
}
