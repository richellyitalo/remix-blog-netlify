import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostsList from "~/components/site/post/PostList";
import { getPosts } from "~/data/blog.server";

export async function loader() {
  const posts = await getPosts();
  if (!posts || posts.length === 0) {
    throw json(
      { message: "Posts not found" },
      { status: 404, statusText: "Not Found" }
    );

    // _WAY #A
    // throw new Response(
    //   JSON.stringify({ message: "Sorry! No one posts registered." }),
    //   {
    //     headers: { "Content-Type": "application/json;" },
    //     status: 404,
    //     statusText: "No posts"
    //   }
    // );
  }

  return posts;
}

export function headers ({
  parentHeaders
}) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  }
}

export default function SiteHomePage() {
  const posts = useLoaderData();

  return (
    <>
      <h1 className="font-bold text-lg border-b">Posts</h1>
      <div>
        <PostsList posts={posts} />
      </div>
    </>
  );
}
