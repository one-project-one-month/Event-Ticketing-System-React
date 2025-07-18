import BackgroundBanner from "@/User/assets/homepage/herobg.png";
import HeroImg from "@/User/assets/homepage/heroimg.png";

export default function HeroSection() {
  return (
    <main className="absolute top-0 left-0 h-screen w-screen [&>*]:text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-full">
        <img
          src={BackgroundBanner}
          alt="Banner Background Photo"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Hero Elements */}
      <div className="absolute top-35 left-0 z-20 grid w-full grid-cols-8 px-15">
        {/* Big Text */}
        <div className="col-span-5 mt-1 ml-5 flex flex-col justify-start gap-0 [&>p]:text-7xl [&>p]:font-semibold">
          <p>GET READY TO EXPERIENCE THE BEST EVENTS</p>
        </div>
        {/* Image */}
        <div className="col-span-3 row-span-3 ml-6 h-[34.5rem] w-[29rem] overflow-hidden rounded-t-full rounded-b-4xl shadow-lg shadow-gray-800">
          <img
            src={HeroImg}
            alt="Hero Image"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Small Text */}
        <div className="col-span-5 mt-20 mr-20 flex flex-row items-center justify-center">
          <p className="figtreef w-100">
            Welcome to our ticketing platform , your one-stop-shop for all
            events you NEEDS ! whether you are planning to attend an event!
          </p>
        </div>
      </div>
    </main>
  );
}
