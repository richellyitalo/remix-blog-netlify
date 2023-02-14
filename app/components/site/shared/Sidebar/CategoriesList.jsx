import CategoryListItem from "./CategoryListItem";

export default function CategoriesList({ categories }) {
  return (
    <div className="categories-list">
      <h3 className="text-lg font-semibold">Categories</h3>
      <div>
        {categories.map((category) => (
          <CategoryListItem
            category={category}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
