function Box({ children }) {
  return (
    <div className="bg-slate-200 flex flex-col md:mx-20 xl:mx-40  mt-14 md:my-8 p-10 gap-10  md:border md:border-[#999999] shadow">
      <div className="flex flex-col items-center ">
        <>{children}</>
      </div>
    </div>
  );
}

export default Box;
