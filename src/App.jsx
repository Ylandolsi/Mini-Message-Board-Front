import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import { HomePage, allMessagesLoader } from "./pages/Home";
import { Message, messageDetailsLoader } from "./pages/Message";
import { MessageError } from "./pages/Message";
import { NotFound } from "./pages/NotFound";
// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} loader={allMessagesLoader} />
      <Route
        path=":id"
        element={<Message />}
        loader={messageDetailsLoader}
        errorElement={<MessageError />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
