import { Link } from "@remix-run/react";

export default function CategoryListItem({ category }) {
  return (
      <div key={category.id} className="category-list-item">
      <Link
        to={`/categories/${category.id}`}
        className="text-blue-600 hover:underline border-b block py-2"
      >
        {category.name}
      </Link>
    </div>
  );
}
