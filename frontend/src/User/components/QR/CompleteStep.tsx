interface CompleteStepProps {
  fileName?: string;
}

export const CompleteStep = ({ fileName }: CompleteStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 w-full h-[360px] border-2 border-dashed border-black rounded-lg bg-[#e6e6e6]">
      <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-6">

        <div className="absolute w-[160px] h-[160px] rounded-full bg-[#233b75ff] opacity-10 animate-ping" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-[#233b75ff] opacity-20 animate-ping delay-150" />
        <div className="absolute w-[80px] h-[80px] rounded-full bg-[#233b75ff] opacity-30" />

        <div className="z-10 w-[56px] h-[56px] rounded-full bg-[#233b75ff] flex items-center justify-center shadow-md">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <p className="text-[#233b75ff] text-xl font-bold">Upload Complete!</p>
      {fileName && (
        <p className="text-muted-foreground text-sm mt-1">{fileName}</p>
      )}
    </div>
  );
};
