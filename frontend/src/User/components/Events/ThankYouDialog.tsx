import { NavLink } from "react-router-dom";

interface ThankProps {
  message : string;
}
const ThankYouDialog = ({
  message 
} : ThankProps) => {
  return (
    <div
      className={`flex h-[80%] w-[50%] flex-col items-center justify-between rounded bg-gradient-to-t from-[#071739] to-[#103263] p-10 py-20 text-white shadow-sm transition-transform`}
    >
      <img src="/yw-event-img/thank-you.png" alt="thanks" className="w-[30%]" />
      <h2 className="text-3xl font-semibold">Thank You!</h2>
      <p>{message}</p>
      <NavLink
        to={"/"}
        className="w-fit cursor-pointer rounded-md bg-white px-10 py-3 text-black transition-colors duration-500 hover:bg-[#103263] hover:text-white"
      >
        Back to Home
      </NavLink>
    </div>
  );
};

export default ThankYouDialog;
