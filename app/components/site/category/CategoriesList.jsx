import { Link } from "@remix-run/react";
import { Col, Row } from "react-grid-system";

export default function CategoriesList({ categories }) {
  return (
    <Row>
      {categories.map((category) => (
        <Col
          key={category.id}
          sm={4}
        >
          <h3 className="font-semibold text-xl">{category.name}</h3>
          <div className="mb-2 text-sm text-slate-400">{category.posts.length} posts</div>
          <Link
            to={`/categories/${category.id}`}
            className="bg-blue-700 px-2 rounded-md p-1 text-white"
          >
            See post(s)
          </Link>
        </Col>
      ))}
    </Row>
  );
}
