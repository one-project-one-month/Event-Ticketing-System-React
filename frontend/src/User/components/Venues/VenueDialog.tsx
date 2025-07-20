import ThankYouImg from "@/User/assets/thank-you.png";

export default function VenueDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full flex-row items-center justify-center bg-[rgba(125,125,125,0.5)]"
      onClick={onClose}
    >
      <div
        className="flex h-[30rem] w-[43rem] flex-col items-center bg-gradient-to-b from-[#103263] to-[#071739] px-20 py-16"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        <img src={ThankYouImg} alt="Thank You!" className="size-40" />
        <div className="mt-5 flex w-full flex-col gap-8 text-center text-white">
          <p className="text-3xl font-semibold">Thank You</p>
          <p>
            Thank you for your interest in our venue.
            <br />
            Our team will contact you in 24–48 hours.
          </p>
          <a
            href="/"
            className="mx-auto w-60 rounded bg-white py-2 text-black transition-colors duration-500 hover:bg-[#103263] hover:text-white"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
