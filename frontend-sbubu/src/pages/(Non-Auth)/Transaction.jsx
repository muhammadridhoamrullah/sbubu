import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, useLocation, useParams } from "react-router-dom";
import { fetchTransactionDetails } from "../../store/transactionSlice";

export default function Transaction() {
  const { orderId } = useParams();
  const {
    loading: loadingTransaction,
    data: dataTransaction,
    error: errorTransaction,
  } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  console.log(dataTransaction, "data");

  useEffect(() => {
    dispatch(fetchTransactionDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="bg-[#111D22] text-white w-full min-h-screen ">
      <h1>Success boi </h1>
    </div>
  );
}

// Payment Type, transaction_time, gross_amount, transaction_status, order_id

// {"bank": "cimb", "order_id": "DON-ridhoamrullah-1762782800703-780", "card_type": "credit", "masked_card": "48111111-1114", "status_code": "200", "fraud_status": "accept", "gross_amount": "1000000.00", "payment_type": "credit_card", "status_message": "Success, Credit Card capture transaction is successful", "transaction_id": "a4e1f3c7-9bb6-47e6-a844-968cabaa4dec", "transaction_time": "2025-11-10 20:53:30", "transaction_status": "capture", "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1762782800703-780"}
