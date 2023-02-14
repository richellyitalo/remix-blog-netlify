import Title from "~/components/admin/shared/Title";
import PostsAdminList from "~/components/admin/post/PostsAdminList";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCategories, getPosts } from "~/data/blog.server";
import { json } from "@remix-run/node";
import { requireUserIdSession } from "~/data/auth.server";

export async function loader({ request }) {
  const userId = await requireUserIdSession(request);
  const posts = await getPosts({userId});
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    throw json(
      { message: "At least a category its necessary to create a new Post." },
      { status: 404, statusText: "No categories found." }
    );
  }

  return posts;
}

export default function ListPostsPage() {
  const posts = useLoaderData();

  return (
    <>
      <Title>Posts</Title>

      <AddLink
        to="add"
        text="Add Post"
      />

      {posts && posts.length === 0 && (
        <div class="bg-amber-100 p-3 border border-yellow-500 rounded">
          There are no registered posts.
        </div>
      )}

      <PostsAdminList posts={posts} />
      <Outlet />
    </>
  );
}
