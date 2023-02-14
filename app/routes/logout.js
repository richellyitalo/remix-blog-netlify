import { json } from "@remix-run/node";
import { destroySession } from "~/data/auth.server";

export async function action ({ request }) {
  console.log("__LOGOUT__");
  if (request.method !== "POST") {
    throw json({ message: "Invalid method requested" }, {
      status: 400 // Bad request
    })
  }

  return await destroySession(request);
}