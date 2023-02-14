import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";

export default function Sidebar({ categories, posts }) {
  return (
    <aside>
      {categories && <CategoriesList categories={categories} />}
      {posts && <PostsList posts={posts} />}
    </aside>
  );
}
