import { useLocation, useParams } from "react-router-dom";

export default function Transaction() {
  const location = useLocation();

  const { orderId } = useParams();
  const paymentData = location.state?.paymentData;
  console.log(orderId, "orderId");

  console.log("Payment Data:", paymentData);
  return (
    <div>
      <h1>Success boi </h1>
    </div>
  );
}

// Payment Type, transaction_time, gross_amount, transaction_status, order_id
