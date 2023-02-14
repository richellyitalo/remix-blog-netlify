import { redirect } from "@remix-run/node";

export function loader({ params }) {
  if (params["*"] === "cat") {
    return redirect("/categories");
  }

  if (["login", "panel"].includes(params["*"])) {
    return redirect("/admin");
  }

  throw new Response("Not found", {
    status: 404,
  });
}
