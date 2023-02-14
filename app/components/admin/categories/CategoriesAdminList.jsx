import CategoryAdminListItem from "./CategoryAdminListItem";

export default function CategoriesAdminList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <CategoryAdminListItem
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}
