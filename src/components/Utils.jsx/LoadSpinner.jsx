import logo from "../../assets/Q_Logo.png";

export default function LoadSpinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-6">
      <div className="font-semibold animate-fade-left animate-duration-[800ms] animate-ease-linear">
        ... fetching data{" "}
      </div>
      <img
        src={logo}
        className="h-24 w-24 animate-spin animate-infinite animate-duration-[800ms] animate-ease-linear"
      />
    </div>
  );
}
