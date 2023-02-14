export default function Title({ children, className = "" }) {
  return (
    <h1 className={`font-bold text-lg border-b ${className}`}>{children}</h1>
  );
}
