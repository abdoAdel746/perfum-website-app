import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./components/common/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Elements } from "@stripe/react-stripe-js";
import {  HelmetProvider } from "react-helmet-async";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OPvLIIKedvA98wCFtO4VVbvZVAZ389pPNnS4KIIXc92TccnYsW0tQyd3nUBh1rqZvxLzdEQpllt5SyaXu8Pf1FA00BKBskW23"
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <Elements stripe={stripePromise} options={options}>
          <App />
        </Elements> */}
        <HelmetProvider>
          <Elements stripe={stripePromise} options={options}>
            <App />
          </Elements>
        </HelmetProvider>
      </PersistGate>
    </Provider>
    ,
  </React.StrictMode>
);
