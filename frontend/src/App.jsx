import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import UserRegister from "../Components/UserRegister";
import UserLogin from "../Components/UserLogin";
import ResetPassword from "../Components/ResetPassword";
import SetnewPassword from "../Components/SetnewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRegister />,
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/setnew-password",
    element: <SetnewPassword />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
