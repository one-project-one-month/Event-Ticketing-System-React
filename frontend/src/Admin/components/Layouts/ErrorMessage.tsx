export default function ErrorMessage({ text }: { text: string }) {
  return (
    <p className="mt-4 w-2/3 min-w-2/3 rounded bg-red-200 p-4 text-red-500">
      {text}
    </p>
  );
}
