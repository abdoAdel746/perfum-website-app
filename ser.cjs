const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51OPvLIIKedvA98wCyd5TtuiTpBr7MImZo2EVG19KdcMz7I4Qpmqo8ZIKjFDu33tuG3lQBJaF2YmpeFu2wBF1CvGd00JpA2VM3V"
);

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());
let uniqueOrderId = uuidv4();

// POST route
// app.post("/create-checkout-session", async (req, res) => {
//   const { cartItems } = req.body;
//   const uniqueOrderId = uuidv4();

//   // TODO: Calculate total amount securely
//   const totalAmount = 1000; // Example amount

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: cartItems.map(item => ({
//         price_data: {
//           currency: 'usd',
//           product_data: { name: item.name },
//           unit_amount: item.price,
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: `http://localhost:5173/Success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:5173/Cancel`,
//       metadata: { order_id: uniqueOrderId },
//     });

//     res.json({ sessionId: session.id });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months start at 0
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}

app.post("/create-checkout-session", async (req, res) => {
  const { cartTotalPrice, userName, userEmail } = req.body;
  const uniqueOrderId = uuidv4();
  const paymentDate = formatDate(new Date());
  // console.log(userName);

  try {
    console.log(req.body);
    // First, create a Stripe customer
    const customer = await stripe.customers.create({
      email: userEmail, // Assuming you are passing userEmail in the request body
      name: userName || "guest",
      metadata: {
        // Any additional metadata you want to store
      },
    });

    // Then, create the checkout session with the customer ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id, // Reference the created customer here
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: cartTotalPrice * 100,
            product_data: {
              name: `Order for ${customer.name||"guest"}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      billing_address_collection: "required",
      invoice_creation: {
        enabled: true,
        invoice_data: {
          account_tax_ids: null,
          custom_fields: null,
          description: null,
          footer: null,
          metadata: {},
          rendering_options: null,
        },
      },

      metadata: { order_id: uniqueOrderId, price: cartTotalPrice },
      success_url: `https://five5-08t6.onrender.com/Success/?session_id={CHECKOUT_SESSION_ID}&order_id=${uniqueOrderId}&price=${cartTotalPrice}&payment_date=${encodeURIComponent(
        paymentDate
      )}`,

      cancel_url: "https://five5-08t6.onrender.com/Failed/",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/get-order-details/:session_id", async (req, res) => {
  const sessionId = req.params.session_id;

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // TODO: Fetch additional order details from your database if needed
    // For example, use session.metadata.order_id to fetch from your DB

    // Respond with session (or more detailed order details from your DB)
    res.json(session);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
