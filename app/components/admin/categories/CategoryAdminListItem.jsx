import { Link, useFetcher } from "@remix-run/react";

export default function CategoryAdminListItem({ category }) {
  function deleteCategoryHandler() {
    const proceed = confirm("Are you sure you want to delete this category?");

    if (!proceed) {
      return;
    }

    fetcher.submit(null, {
      method: "DELETE",
      action: `/admin/categories/edit/${category.id}`,
    });
  }

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  if (isSubmitting) {
    return (
      <div className="p-2 bg-purple-400 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm">
        Deleting category...
      </div>
    );
  }

  return (
    <div className="p-2 bg-purple-700 rounded mb-3 text-white flex justify-between drop-shadow-md hover:drop-shadow-sm">
      <div>
        <h2 className="font-semibold">{category.name}</h2>
      </div>
      <div className="text-right pl-2">
        <div>
          <Link
            to={`/admin/categories/edit/${category.id}`}
            className="text-white text-lg hover:text-yellow-300"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={deleteCategoryHandler}
          type="button"
          className="text-sm text-red-200 hover:text-yellow-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
