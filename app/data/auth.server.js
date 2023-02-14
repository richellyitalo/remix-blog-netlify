import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { compare, hash } from "bcryptjs";
import { prisma } from "./database.server";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function signup({ email, password }) {
  const userWithSameEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (userWithSameEmail) {
    const error = new Error("User already exists");
    error.status = 422; // Unprocessable Entity

    throw Error(error);
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: passwordHash,
    },
  });

  // create user session with userId
  return await createUserSession(user.id, "/admin");
}

export async function login({ email, password }) {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    const error = new Error("Is not a registered user with this email.");
    error.status = 401; // Unauthorized
    throw error;
  }

  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch) {
    const error = new Error("You provided a wrong password.");
    error.status = 401;
    throw error;
  }

  return await createUserSession(user.id, "/admin");
}

export async function requireUserIdSession (request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");
  if (!userId) {
    // const error = new Error("Your are not logged in.");
    // error.status = 401;
    // throw error;
    throw redirect("/auth?mode=login");
  }

  return userId;
}

export async function requireUserSession (request) {
  const userId = await requireUserIdSession(request);

  return await prisma.user.findFirst({
    where: { id: userId }
  });
}

export async function destroySession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/auth?mode=login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
