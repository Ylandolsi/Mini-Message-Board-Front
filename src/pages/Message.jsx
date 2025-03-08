import axios from "axios";
import {
  NavLink,
  useNavigate,
  useLoaderData,
  useRouteError,
} from "react-router-dom";

const urlServer = "https://shy-miquela-issat-a790b927.koyeb.app";

export function Message() {
  const msg = useLoaderData();
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  // Format the date as a string
  const formattedDate = msg.time
    ? msg.time instanceof Date
      ? msg.time.toLocaleDateString()
      : new Date(msg.time).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div
        style={{ boxShadow: "0 0 5px 5px #1ABC9C", borderRadius: "10px" }}
        className="flex flex-col justify-center gap-5 mt-5 w-150 h-fit p-5 text-2xl"
      >
        <div className="border-b gap-2 font-flex flex-col items-start justify-items-start">
          <h3 className="font-bold"> Name : </h3>
          <p> {msg.username} </p>
        </div>
        <div className="border-b gap-2 flex flex-col items-start justify-items-start">
          <h3 className="font-bold "> Message : </h3>
          <p> {msg.text} </p>
        </div>
        <div className="border-b gap-2 flex flex-col items-start justify-items-start">
          <h3 className="font-bold "> Time : </h3>
          <p> {formattedDate} </p>
        </div>
      </div>
      <button
        className="mt-10 w-40 h-10 bg-[#1ABC9C] text-black rounded-md hover:bg-[#16A085] hover:cursor-pointer"
        onClick={backHome}
      >
        Go back to home
      </button>
    </div>
  );
}

export const messageDetailsLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await axios.get(urlServer + `/api/messages/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request)
      throw new Error("No response received from the server.");
    else throw new Error("An unexpected error occurred.");
  }
};

export function MessageError() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8">
      <h1 className="text-3xl font-bold text-red-500">Error</h1>
      <p className="text-xl">{error.message || "An unknown error occurred"}</p>
      <NavLink
        to="/"
        className="mt-4 px-6 py-2 bg-[#1ABC9C] text-black rounded-md hover:bg-[#16A085]"
      >
        Go back to home
      </NavLink>
    </div>
  );
}
