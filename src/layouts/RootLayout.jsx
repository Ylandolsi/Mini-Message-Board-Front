import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className=" RootLayout flex flex-col items-center">
      <div className="mt-10 mr-auto ml-20 text-4xl font-bold ">
        Mini Message Board
      </div>
      <Outlet />
    </div>
  );
}
