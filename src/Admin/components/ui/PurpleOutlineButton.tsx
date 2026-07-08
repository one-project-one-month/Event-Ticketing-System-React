interface PurpleOutlineButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function PurpleOutlineButton({
  text,
  onClick,
  className = "",
  type = "button",
}: PurpleOutlineButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#D8DFEC] text-[#6C2BD9] h-[50px] text-lg px-6 py-2 rounded-md border border-transparent hover:border-[#6C2BD9] cursor-pointer transition min-w-[150px] ${className}`}
    >
      {text}
    </button>
  );
}
