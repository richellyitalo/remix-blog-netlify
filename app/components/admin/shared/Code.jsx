export default function Code({ children }) {
  return (
    <code className="text-red-500 border border-2 border-orange-500 px-2 rounded-full bg-orange-50">
      {children}
    </code>
  );
}
