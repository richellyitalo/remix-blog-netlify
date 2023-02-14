import { Link } from "@remix-run/react";
import { FaPlusCircle } from "react-icons/fa";

export default function AddLink({ to, text }) {
  return (
    <div className="my-3">
      <Link
        to={to}
        className="p-1 bg-green-300 rounded hover:bg-green-400"
      >
        <FaPlusCircle className="inline mr-1 drop-shadow-sm" />
        {text}
      </Link>
    </div>
  );
}
