import { useLoaderData } from "@remix-run/react";
import { CATEGORIES as categories } from "~/../data/dummy";
import CategoriesList from "~/components/site/category/CategoriesList";
import { getCategories } from "~/data/blog.server";

export function loader({ params }) {
  const categoryId = params.categoryId;
  return getCategories(categoryId);
}

export function meta () {
  return {
    title: "Categories"
  }
}

export function headers ({ parentHeaders }) {
  return {
    "Cache-Control": parentHeaders.get("Cache-Control"),
  }
}

export default function CategoriesPage () {
  const categories = useLoaderData();
  return (
    <div class="categories-list">
      <h1 class="font-bold text-xl mb-3 border-b">Categories</h1>
      
      <CategoriesList categories={categories} />
    </div>
  );
}
