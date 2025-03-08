import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const urlServer = "https://shy-miquela-issat-a790b927.koyeb.app";

export function HomePage() {
  const [dialogVisible, setDialog] = useState(false);
  const messages = useRef(null);
  const msg = useLoaderData();
  const navigate = useNavigate();

  const toggleBlur = () => {
    if (messages.current) {
      if (!dialogVisible) messages.current.style.filter = "none";
      else messages.current.style.filter = "blur(2px)";
    }
  };

  useEffect(() => {
    toggleBlur();
  }, [dialogVisible]);

  //  higher-order function that returns another function
  const buttonClick = (oc) => (e) => {
    e.preventDefault();
    setDialog(oc);
  };

  // regular event handler function
  const sendMessage = (e) => {
    e.preventDefault();
    const sender = document.getElementById("sender").value;
    const message = document.getElementById("message").value;

    if (!sender || !message) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post(urlServer + "/api/messages/", {
        user: sender,
        text: message,
      })
      .then(() => {
        setDialog(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        alert("Failed to send message");
      });
  };

  return (
    <>
      <div
        ref={messages}
        style={{
          boxShadow: "0 0 5px 5px #1ABC9C",
          borderRadius: "10px",
          scrollbarWidth: "none",
        }}
        className="p-10 display flex flex-col items-center gap-3 mt-5 w-150 h-150 overflow-auto"
      >
        {msg.map((m) => {
          const dateOnly = m.time
            ? m.time instanceof Date
              ? m.time.toLocaleDateString()
              : new Date(m.time).toLocaleDateString()
            : "Unknown date";
          return (
            <div
              key={m.id}
              style={{
                boxShadow: "0 0 5px 5px #1ABC9C",
                borderRadius: "10px",
              }}
              className="p-2 my-2 w-120 h-20 flex flex-col justify-between0 "
            >
              <div className="row1 flex align-center justify-between">
                <div className="font-bold">{m.username}</div>
                <div className="text-sm">{dateOnly}</div>
              </div>
              <div className="row2 flex align-center justify-between">
                <div>{m.text}</div>
                <NavLink
                  to={`${m.id}`}
                  className="text-blue-500 hover:text-blue-700 hover:glow-blue-400"
                >
                  Details
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="mt-10 w-40 h-10 bg-[#1ABC9C] text-black rounded-md hover:bg-[#16A085] hover:cursor-pointer"
        onClick={buttonClick(true)}
      >
        NewMessage
      </button>
      {dialogVisible && (
        <div
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="flex flex-col justify-center w-full h-full"
        >
          <div className="p-4 rounded-md bg-gray-600 w-100 h-fit border-3 border-gray-950">
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="sender" className="block text-white mb-1">
                  Sender:
                </label>
                <input
                  type="text"
                  id="sender"
                  className="w-full p-2 rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-1">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 rounded-md"
                  placeholder="Type your message here"
                  rows="3"
                ></textarea>
              </div>
              <button
                onClick={sendMessage}
                className="bg-[#1ABC9C] text-black px-4 py-2 rounded-md hover:bg-[#16A085]"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={buttonClick(false)}
                className="bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export async function allMessagesLoader() {
  try {
    const response = await axios
      .get(urlServer + "/api/messages/")
      .then((res) => res.data);

    return response;
  } catch (error) {
    console.error("Failed to load messages:", error);
    throw Error("Failed to load messages , ", error);
  }
}
