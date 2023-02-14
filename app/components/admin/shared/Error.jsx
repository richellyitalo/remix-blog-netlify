import { FaExclamationCircle } from "react-icons/fa";

export default function Error({ title, children }) {
  return (
    <div className="text-center p-3">
      <div className="text-center">
        <FaExclamationCircle className="mx-auto mb-4"/>
      </div>
      <h2 className="font-bold text-2xl mb-3">{title}</h2>
      {children}
    </div>
  );
}
