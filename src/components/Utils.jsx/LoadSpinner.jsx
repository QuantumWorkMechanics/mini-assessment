import logo from "../../assets/Q_Logo.png";

export default function LoadSpinner() {
  return (
    <img
      src={logo}
      className="h-full w-full animate-spin animate-infinite animate-duration-[800ms] animate-ease-linear"
    />
  );
}
