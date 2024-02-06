import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Admin_page } from "./pages/admin/Admin_page";
import { Home } from "./pages/home/Home";
import { Products } from "./pages/products/Products";
import { Notfound } from "./pages/notfound/Notfound";
import { Contact } from "./pages/contact/Contact";
import { About } from "./pages/about/About";
import { Singleproduct } from "./pages/products/Singleproduct";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import { Checkout } from "./pages/checkout/Checkout";
import { Placeorder } from "./pages/placeorder/Placeorder";
import { Success } from "./pages/success/Success";
import { Oldorder } from "./pages/oldorders/Oldorder";
import { Gift } from "./pages/gift/Gift";
import { Wedding } from "./pages/wedding/Wedding";
import { Failed } from "./pages/failed/Failed";

function App() {
  const Routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/perfum-website-app", element: <Home /> },
        { path: "/Products", element: <Products /> },
        { path: "/Contact", element: <Contact /> },
        { path: "/About", element: <About /> },
        { path: "/Login", element: <Login /> },
        { path: "/Register", element: <Register /> },
        { path: "/Success", element: <Success /> },
        { path: "/Failed", element: <Failed /> },
        { path: "/Oldorder", element: <Oldorder /> },
        { path: "/Gift", element: <Gift /> },
        { path: "/Wedding", element: <Wedding /> },
        { path: "/singleItem/:category/:id", element: <Singleproduct /> },
        {
          path: "/Checkout",
          children: [
            { index: true, element: <Checkout /> },
            { path: "place_order", element: <Placeorder /> },
            // { path: "payment", element: <PaymentForm /> },
            // { path: "confirmation", element: <OrderConfirmation /> },
          ],
        },
        { path: "/*", element: <Notfound /> },
      ],
    },
    {
      path: "/admin/*",
      element: <Admin_page />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={Routing} />
    </>
  );
}

export default App;
