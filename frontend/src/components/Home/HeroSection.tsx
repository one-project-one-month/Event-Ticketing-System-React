import BackgroundBanner from "@/assets/homepage/herobg.png";
import HeroImg from "@/assets/homepage/heroimg.png";

export default function HeroSection() {
  return (
    <main className="absolute top-0 left-0 h-screen w-screen [&>*]:text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 z-0 h-[90vh] w-full">
        <img
          src={BackgroundBanner}
          alt="Banner Background Photo"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Hero Elements */}
      <div className="absolute top-48 left-0 z-20 grid w-full grid-cols-8 px-20">
        {/* Big Text */}
        <div className="col-span-5 mt-3 ml-10 flex flex-col justify-start gap-0 [&>p]:text-8xl [&>p]:font-bold">
          <p>GET READY TO</p>
          <p>EXPERIENCE THE</p>
          <p>BEST EVENTS</p>
        </div>
        {/* Image */}
        <div className="col-span-3 row-span-3 ml-7 h-[41.5rem] w-[29rem] overflow-hidden rounded-tl-full rounded-tr-full">
          <img
            src={HeroImg}
            alt="Hero Image"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Small Text */}
        <div className="col-span-5 mt-10 mr-20 flex flex-row items-center justify-center">
          <p className="figtreef w-80">
            Welcome to our ticketing platform , your one-stop-shop for all
            events you NEEDS ! whether you are planning to attend an event!
          </p>
        </div>
      </div>
    </main>
  );
}
