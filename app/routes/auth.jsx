import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import SiteHeader from "~/components/nav/SiteHeader";
import { login, signup } from "~/data/auth.server";
import { validateUserCredentials } from "~/data/validation.server";

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  try {
    validateUserCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials);
    } else if (authMode === "signup") {
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status && [422, 401].includes(error.status)) {
      return {
        general: error.message,
      };
    }

    return { general: "Something went wrong" };
  }
}

export default function AuthPage() {
  return (
    <div className="container mx-auto">
      <SiteHeader />
      <AuthForm />
    </div>
  );
}
