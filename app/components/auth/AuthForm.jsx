import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import InputError from "../admin/shared/InputError";

export default function AuthForm() {
  const validationErrors = useActionData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const mode = searchParams.get("mode") || "login";
  const isLogin = mode === "login";
  const textAlternativeAction = isLogin
    ? "Create a new user"
    : "Login with a existing user";
  const gotoMode = isLogin ? "signup" : "login";
  const isSubmitting = navigation.state !== "idle";
  const title = isLogin ? "Login" : "Sign Up";
  let textButtonSubmit = isSubmitting ? "Logging in..." : "Login";

  if (!isLogin) {
    textButtonSubmit = isSubmitting ? "Signing up..." : "Sign up";
  }

  return (
    <Form method="post">
      <h1 className="text-lg font-bold mb-3 border-b">{title}</h1>
      <p className="mb-3">
        <label className="font-bold">Email</label>
        <input
          type="text"
          name="email"
          className="p-2 border rounded-sm block"
        />
      </p>

      <InputError
        stack={validationErrors}
        index="email"
      />

      <p className="mb-3">
        <label className="font-bold">Password</label>
        <input
          type="password"
          name="password"
          className="p-2 border rounded-sm block"
        />
      </p>

      <InputError
        stack={validationErrors}
        index="password"
      />

      <InputError
        stack={validationErrors}
        index="general"
      />

      <p class="flex">
        <button
          disabled={isSubmitting}
          className={`p-2 px-4 rounded ${
            isSubmitting ? "bg-gray-200 text-gray-400" : "bg-blue-200"
          }`}
        >
          {textButtonSubmit}
        </button>
      </p>
      <p className="mt-3">
        <Link
          to={`?mode=${gotoMode}`}
          className="text-slate-400 hover:text-slate-800"
        >
          {textAlternativeAction}
        </Link>
      </p>
    </Form>
  );
}
