import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import PostForm from "~/components/admin/post/PostForm";
import Modal from "~/components/util/Modal";
import { requireUserIdSession } from "~/data/auth.server";
import {
  deletePost,
  getCategories,
  getPost,
  updatePost,
  validatePostRequest,
} from "~/data/blog.server";

export function meta({ params, parentsData }) {
  let title = "Add new Post";

  if (params.postId) {
    const post = parentsData["routes/admin/posts"].find(
      (post) => post.id === params.postId
    );
    title = `Editing post: ${post.title}`;
  }

  // console.log(params)
  // conso
  return {
    title,
  };
}

export async function action({ request, params }) {
  const userId = await requireUserIdSession(request);
  const formData = await request.formData();
  const postData = {
    title: formData.get("title"),
    content: formData.get("content"),
    categories: formData.getAll("categories[]"),
  };
  const postId = params.postId;

  const postEntity = await getPost(postId);

  if (postEntity.userId !== userId) {
    throw json(
      {
        message: "You don't have permission to edit this post.",
      },
      {
        status: 401,
      }
    );
  }

  if (request.method === "PATCH") {
    try {
      validatePostRequest(postData);
    } catch (error) {
      return error;
    }

    await updatePost(postId, postData);
  } else if (request.method === "DELETE") {
    await deletePost(postId);
    return { postId };
  }

  return redirect("..");
}

export async function loader({ request }) {
  await requireUserIdSession(request);
  return await getCategories();
}

export default function EditPostPage() {
  const categories = useLoaderData();
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <PostForm categories={categories} />
    </Modal>
  );
}
