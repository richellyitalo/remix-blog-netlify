import { defer, json } from "@remix-run/node";
import { Await, useAsyncError, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import PostsList from "~/components/site/post/PostList";
import { getPosts } from "~/data/blog.server";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loader() {
  const posts = getPosts();
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

  const feriados = fetch("https://brasilapi.com.br/api/feriados/v1/2023").then(
    (res) => delay(5000).then(() => res.json())
  );

  const endereco = await fetch(
    "https://brasilapi.com.br/api/cep/v1/01001000"
  ).then((res) => res.json());

  return defer({
    posts,
    feriados,
    endereco,
  });
}

export function headers({ parentHeaders }) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  };
}

export default function SiteHomePage() {
  let { posts, feriados: promiseFeriados, endereco } = useLoaderData();

  return (
    <>
      <h1 className="font-bold text-lg border-b">Posts</h1>
      <h1>Welcome to Remix</h1>
      <div>
        <p>
          {endereco.street} {endereco.neighborhood} {endereco.city}{" "}
          {endereco.state} {endereco.cep}
        </p>
      </div>
      <div>
        <Suspense fallback={<p>CARREGANDO FERIADOS</p>}>
          <Await resolve={promiseFeriados}>
            {(feriados) => (
              <ul>
                {feriados.map((feriado) => (
                  <li key={feriado.date}>{feriado.name}</li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
        {/* <PostsList posts={loaderData.posts} /> */}
        {/* <Suspense fallback={<p>Loading posts...</p>}>
          <Await
            resolver={posts}
            errorElement={<ReviewsError />}
          >
            {(posts) =>
              posts.map((review) => (
                <div key={review.id}>
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </div>
              ))
            }
          </Await>
        </Suspense> */}
      </div>
    </>
  );
}
function ReviewsError() {
  let error = useAsyncError(); // Get the rejected value
  return <p>There was an error loading reviews: {error.message}</p>;
}
