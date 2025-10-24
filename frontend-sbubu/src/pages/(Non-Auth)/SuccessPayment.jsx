import { useLocation } from "react-router-dom";

export default function SuccessPayment() {
  const location = useLocation();

  const paymentData = location.state?.paymentData;

  console.log("Payment Data:", paymentData);
  return (
    <div>
      <h1>Success boi </h1>
    </div>
  );
}
