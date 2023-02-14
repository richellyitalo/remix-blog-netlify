import {
  Outlet,
  useCatch,
  useLoaderData,
  useLocation
} from "@remix-run/react";
import SiteHeader from "~/components/nav/SiteHeader";
import { Row, Col } from "react-grid-system";

import Sidebar from "~/components/site/shared/Sidebar/Sidebar";
import { getCategories, getPosts } from "~/data/blog.server";

export async function loader () {
  const posts = await getPosts();
  const categories = await getCategories();
  return {
    posts,
    categories
  };
}

export function headers () {
  return {
    "Cache-Control": "max-age=1800"
  }
}


export default function SiteLayout() {
  const location = useLocation();
  const { posts, categories } = useLoaderData();

  const isCategoriesPage = ["/categories", "/categories/"].includes(
    location.pathname
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <SiteHeader />
      <Row>
        <Col sm={9}>
          <Outlet />
        </Col>

        <Col sm={3}>
          {isCategoriesPage ? (
            <Sidebar posts={posts.slice(0, 4)} />
          ) : (
            <Sidebar categories={categories} />
          )}
        </Col>
      </Row>
    </div>
  );
}
