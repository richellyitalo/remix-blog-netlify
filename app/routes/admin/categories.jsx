import Title from "~/components/admin/shared/Title";
import AddLink from "~/components/admin/shared/AddLink";
import { Outlet, useLoaderData } from "@remix-run/react";
import CategoriesAdminList from "~/components/admin/categories/CategoriesAdminList";
import { getCategories } from "~/data/blog.server";

export function loader() {
  return getCategories();

}

export default function ListCategoriresPage() {
  const categories = useLoaderData();

  return (
    <>
      <Title>Categories</Title>

      <AddLink
        to="add"
        text="Add Category"
      />

      {categories && categories.length === 0 && (
        <div class="bg-amber-100 p-3 border border-yellow-500 rounded">
          There are no registered categories.
        </div>
      )}

      <CategoriesAdminList categories={categories} />
      <Outlet />
    </>
  );
}
