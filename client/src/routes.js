import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./Components/ErrorPage/ErrorPage";
import { PaymentDetails } from "./Components/PaymentDetails/PaymentDetails";
import { Payments } from "./Components/Payments/Payments";
import { ScanQr } from "./Components/ScanQr/ScanQr";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/payment",
    element: <Payments />
  },
  {
    path: "/details",
    element: <PaymentDetails />
  },
  {
    path: "/scan",
    element: <ScanQr />
  },
])