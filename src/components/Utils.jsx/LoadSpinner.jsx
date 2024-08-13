import logo from "../../assets/Q_Logo.png";

export default function LoadSpinner({ text }) {
  return (
    <div className="">
      <div className="  flex justify-center items-center gap-6 p-20 rounded ">
        <div className="font-semibold animate-fade-left animate-duration-[800ms] animate-ease-linear">{text}</div>
        <img src={logo} className="h-24 w-24 animate-spin animate-infinite animate-duration-[800ms] animate-ease-linear" />
      </div>
    </div>
  );
}
