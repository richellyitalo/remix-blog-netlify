import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import CategoryForm from "~/components/admin/categories/CategoryForm";
import Modal from "~/components/util/Modal";
import { addCategory, validateCategoryRequest } from "~/data/blog.server";

export async function action({ request }) {
  const formData = await request.formData();

  const categoryData = Object.fromEntries(formData);

  try {
    validateCategoryRequest(categoryData);
  } catch (error) {
    return error;
  }

  await addCategory(categoryData);

  return redirect("..");
}

export default function AddCategoryPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <CategoryForm />
    </Modal>
  );
}
