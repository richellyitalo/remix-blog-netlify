export default function InputError({ stack, index }) {
  return (
    stack &&
    stack[index] && <p className="text-red-500 text-xs mb-3"> {stack[index]}</p>
  );
}
