import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { PaymentDetails } from "./Components/PaymentDetails/PaymentDetails";
import { Payments } from "./Components/Payments/Payments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/payment",
    element: <Payments />
  },
  {
    path: "/details",
    element: <PaymentDetails />
  }
])