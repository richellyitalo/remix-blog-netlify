import { Link, useLoaderData } from "@remix-run/react";
import { Col, Row } from "react-grid-system";
import PostsList from "~/components/site/post/PostList";
import { getCategory } from "~/data/blog.server";

export function loader ({params}) {
  const categoryId = params.categoryId;
  return getCategory(categoryId);
}

export function meta ({ data: category }) {
  return {
    title: `Posts of category: ${category.name}`
  }
}

export default function CategoriesDetailPage () {
  const category = useLoaderData();

  return (
    <>
      <Row>
        <Col sm={8}>
          <h1 className="font-bold text-lg border-b">
            Posts of {category.name}
          </h1>
        </Col>
        <Col
          sm={4}
          className="text-right"
        >
          <Link
            to=".."
            className="hover:underline text-blue-500"
            relative="path"
          >
            back to Categories
          </Link>
        </Col>
      </Row>
      <PostsList posts={category.posts} />
    </>
  );
}
