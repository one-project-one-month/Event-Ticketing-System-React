interface YellowButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function YellowButton({
  text,
  onClick,
  className = "",
  type = "button",
}: YellowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#FC9B51] hover:bg-[#e48945] h-[50px] text-lg text-white px-6 py-2 rounded-md border border-transparent cursor-pointer transition min-w-[150px] ${className}`}
    >
      {text}
    </button>
  );
}
