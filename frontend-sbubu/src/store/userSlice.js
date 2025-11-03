import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
    dataDonation: null,
    loadingDonation: false,
    errorDonation: null,
    dataEditProfile: null,
    loadingEditProfile: false,
    errorEditProfile: null,
    completedEditProfile: false,
  },
  reducers: {
    userRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    userError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    donationRequest: (state) => {
      state.loadingDonation = true;
      state.errorDonation = null;
    },
    donationSuccess: (state, action) => {
      state.loadingDonation = false;
      state.dataDonation = action.payload;
    },
    donationError: (state, action) => {
      state.loadingDonation = false;
      state.errorDonation = action.payload;
    },
    editProfileRequest: (state) => {
      state.loadingEditProfile = true;
      state.errorEditProfile = null;
      state.completedEditProfile = false;
    },
    editProfileSuccess: (state, action) => {
      state.loadingEditProfile = false;
      state.dataEditProfile = action.payload;
      state.completedEditProfile = true;
    },
    editProfileError: (state, action) => {
      state.loadingEditProfile = false;
      state.errorEditProfile = action.payload;
      state.completedEditProfile = false;
    },
    editProfileReset: (state) => {
      state.dataEditProfile = null;
      state.errorEditProfile = null;
      state.completedEditProfile = false;
      state.loadingEditProfile = false;
    },
  },
});

export const {
  userRequest,
  userSuccess,
  userError,
  donationRequest,
  donationSuccess,
  donationError,
  editProfileRequest,
  editProfileSuccess,
  editProfileError,
  editProfileReset
} = userSlice.actions;

export function fetchUserData() {
  return async (dispatch) => {
    try {
      dispatch(userRequest());

      const access_token = localStorage.access_token;

      //   await new Promise((resolve) => setTimeout(resolve, 10000));

      const response = await instance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      dispatch(userSuccess(response.data.user));
    } catch (error) {
      dispatch(
        userError(error.response.data.message || "Failed to fetch user data")
      );
    }
  };
}

export function fetchUserDonationData() {
  return async (dispatch) => {
    try {
      dispatch(donationRequest());
      const access_token = localStorage.access_token;

      const response = await instance.get("/donation/my-history", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response, "<< res di userSlice");

      dispatch(donationSuccess(response.data));
    } catch (error) {
      dispatch(
        donationError(
          error.response.data.message || "Failed to fetch user data"
        )
      );
    }
  };
}

export function editUserProfile(formData) {
  return async (dispatch) => {
    try {
      dispatch(editProfileRequest());

      const access_token = localStorage.access_token;

      const response = await instance.put("/user/editProfile", formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      dispatch(editProfileSuccess(response.data));
    } catch (error) {
      dispatch(
        editProfileError(
          error.response?.data?.message || "Failed to edit profile"
        )
      );
    }
  };
}

export default userSlice.reducer;

// {
//     "data": {
//         "stats": {
//             "totalDonations": 38,
//             "totalEarnings": 4300000,
//             "pendingAmount": 690000
//         },
//         "donations": [
//             {
//                 "id": 38,
//                 "OrderId": "DON-ridhoamrullah-1761458966739-6926",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 25000,
//                 "message": "Halo bang",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "ca0731d8-d875-43d7-80cc-7ea67ccc7547",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761458966739-6926",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "25000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "1234e49f-29b2-4137-9918-b49293402343",
//                     "transaction_time": "2025-10-26 13:09:37",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761458966739-6926&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-26T06:09:50.041Z",
//                 "createdAt": "2025-10-26T06:09:26.953Z",
//                 "updatedAt": "2025-10-26T06:09:50.041Z"
//             },
//             {
//                 "id": 37,
//                 "OrderId": "DON-ridhoamrullah-1761458517563-3337",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 1000000,
//                 "message": "Halo kreator favoritku",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "b7ef6243-d3c7-4ffe-98fb-05a06599139a",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761458517563-3337",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "1000000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "60006bac-85e5-4b89-bafa-9a67c9cd37f7",
//                     "transaction_time": "2025-10-26 13:02:10",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761458517563-3337&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-26T06:02:23.778Z",
//                 "createdAt": "2025-10-26T06:01:57.852Z",
//                 "updatedAt": "2025-10-26T06:02:23.779Z"
//             },
//             {
//                 "id": 36,
//                 "OrderId": "DON-ridhoamrullah-1761409421769-6784",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 500000,
//                 "message": "Wow",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "dd33d551-89a0-47ac-a083-bc613ff842a2",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/dd33d551-89a0-47ac-a083-bc613ff842a2/pdf",
//                     "order_id": "DON-ridhoamrullah-1761409421769-6784",
//                     "va_numbers": [
//                         {
//                             "bank": "bca",
//                             "va_number": "17710708940848196648299"
//                         }
//                     ],
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "500000",
//                     "payment_type": "bank_transfer",
//                     "bca_va_number": "17710708940848196648299",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "5547eab2-b1a7-4ae0-a4dd-e4f9bc3f02c8",
//                     "transaction_time": "2025-10-25 23:23:48",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761409421769-6784&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T16:23:42.126Z",
//                 "updatedAt": "2025-10-25T16:23:50.336Z"
//             },
//             {
//                 "id": 35,
//                 "OrderId": "DON-ridhoamrullah-1761409365448-4648",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 50000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "5f036789-1db4-46cd-90f3-d889764f9a75",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/5f036789-1db4-46cd-90f3-d889764f9a75/pdf",
//                     "bill_key": "679332365503",
//                     "order_id": "DON-ridhoamrullah-1761409365448-4648",
//                     "biller_code": "70012",
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "50000",
//                     "payment_type": "echannel",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "c09e4cd5-395b-400e-b98f-1f68f1a8964b",
//                     "transaction_time": "2025-10-25 23:22:49",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761409365448-4648&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T16:22:45.706Z",
//                 "updatedAt": "2025-10-25T16:22:51.357Z"
//             },
//             {
//                 "id": 34,
//                 "OrderId": "DON-ridhoamrullah-1761409216349-8555",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 5000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "94dd89f7-811a-4fd9-9580-81e2ef1616d2",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/94dd89f7-811a-4fd9-9580-81e2ef1616d2/pdf",
//                     "bill_key": "77626468819",
//                     "order_id": "DON-ridhoamrullah-1761409216349-8555",
//                     "biller_code": "70012",
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "5000.00",
//                     "payment_type": "echannel",
//                     "status_message": "Success, transaction is found",
//                     "transaction_id": "179a0bcb-c287-476f-b4ba-f8fde8db798e",
//                     "transaction_time": "2025-10-25 23:20:20",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761409216349-8555&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T16:20:16.567Z",
//                 "updatedAt": "2025-10-25T16:22:25.909Z"
//             },
//             {
//                 "id": 33,
//                 "OrderId": "DON-ridhoamrullah-1761408941845-5675",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 5000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "dcfeede1-aa01-4d59-8f6a-2e7ea943777b",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/dcfeede1-aa01-4d59-8f6a-2e7ea943777b/pdf",
//                     "bill_key": "177877460366",
//                     "order_id": "DON-ridhoamrullah-1761408941845-5675",
//                     "biller_code": "70012",
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "5000",
//                     "payment_type": "echannel",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "40003cc4-d721-451b-b1d2-ee2d6e4c8755",
//                     "transaction_time": "2025-10-25 23:15:49",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761408941845-5675&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T16:15:42.293Z",
//                 "updatedAt": "2025-10-25T16:15:51.509Z"
//             },
//             {
//                 "id": 32,
//                 "OrderId": "DON-ridhoamrullah-1761408816700-3689",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "huhu",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "3507388d-88b3-4180-9be6-b43d97353798",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761408816700-3689",
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000",
//                     "payment_type": "qris",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "df03a7c7-954f-4472-90b9-e0810a0eb1f8",
//                     "transaction_time": "2025-10-25 23:13:42",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761408816700-3689&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T16:13:36.929Z",
//                 "updatedAt": "2025-10-25T16:13:45.204Z"
//             },
//             {
//                 "id": 31,
//                 "OrderId": "DON-ridhoamrullah-1761408741861-9480",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 1000000,
//                 "message": "Anon",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "97f5b3aa-6b37-4008-9963-6785cf292ebe",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761408741861-9480",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "1000000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "62770581-6772-48b1-9153-3ebc83ac3baa",
//                     "transaction_time": "2025-10-25 23:12:32",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761408741861-9480&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T16:12:51.594Z",
//                 "createdAt": "2025-10-25T16:12:22.081Z",
//                 "updatedAt": "2025-10-25T16:12:51.594Z"
//             },
//             {
//                 "id": 30,
//                 "OrderId": "DON-ridhoamrullah-1761408653450-2341",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 5000,
//                 "message": "HH",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "2f7b65a4-46f4-4997-906d-25bb2903a604",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761408653450-2341",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "5000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "da3c36d9-32c4-4fa1-a2ab-59afd8625113",
//                     "transaction_time": "2025-10-25 23:11:04",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761408653450-2341&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T16:11:13.623Z",
//                 "createdAt": "2025-10-25T16:10:53.691Z",
//                 "updatedAt": "2025-10-25T16:11:13.623Z"
//             },
//             {
//                 "id": 29,
//                 "OrderId": "DON-ridhoamrullah-1761408567060-5703",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 50000,
//                 "message": "WeW",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "24a06e00-9934-4aed-8b4a-f36291b27639",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761408567060-5703",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "50000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "cb1a7132-26a9-41ae-b941-d27578bf337b",
//                     "transaction_time": "2025-10-25 23:09:39",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761408567060-5703&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T16:09:50.040Z",
//                 "createdAt": "2025-10-25T16:09:27.269Z",
//                 "updatedAt": "2025-10-25T16:09:50.041Z"
//             },
//             {
//                 "id": 28,
//                 "OrderId": "DON-ridhoamrullah-1761407995897-1671",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "18847f10-4cab-4035-8cf0-ffb84e2d99a8",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T15:59:56.127Z",
//                 "updatedAt": "2025-10-25T15:59:56.127Z"
//             },
//             {
//                 "id": 27,
//                 "OrderId": "DON-ridhoamrullah-1761403948353-4749",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 5000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "645f379b-7615-42c7-b788-88f3c08583eb",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761403948353-4749",
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "5000",
//                     "payment_type": "qris",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "4a5873ad-d27f-4555-ba58-968adf50f1e7",
//                     "transaction_time": "2025-10-25 21:52:34",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761403948353-4749&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T14:52:28.588Z",
//                 "updatedAt": "2025-10-25T14:52:49.845Z"
//             },
//             {
//                 "id": 26,
//                 "OrderId": "DON-ridhoamrullah-1761403797387-6636",
//                 "UserId": 8,
//                 "donorName": "Muhammad Ridho Amrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "c0d51a28-11d0-4113-a74f-0ec92011488a",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761403797387-6636",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "89aa66a5-b96b-4f72-8ce4-dc61595e31c2",
//                     "transaction_time": "2025-10-25 21:50:08",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761403797387-6636&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T14:50:21.255Z",
//                 "createdAt": "2025-10-25T14:49:57.686Z",
//                 "updatedAt": "2025-10-25T14:50:21.255Z"
//             },
//             {
//                 "id": 25,
//                 "OrderId": "DON-ridhoamrullah-1761398654632-606",
//                 "UserId": 8,
//                 "donorName": "ridhoamrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "Wow kamu streamer favoritku",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "17f5b946-e6af-4995-9d78-3a426054e446",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761398654632-606",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "83d40dae-05d3-40bb-a66d-ebbd882d6776",
//                     "transaction_time": "2025-10-25 20:24:27",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761398654632-606&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T13:24:38.210Z",
//                 "createdAt": "2025-10-25T13:24:15.237Z",
//                 "updatedAt": "2025-10-25T13:24:38.210Z"
//             },
//             {
//                 "id": 24,
//                 "OrderId": "DON-ridhoamrullah-1761374336598-4038",
//                 "UserId": 8,
//                 "donorName": "Olivia",
//                 "donorEmail": "oliviarodrigo@gmail.com",
//                 "amount": 10000,
//                 "message": "Wow",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "8034e57e-4615-4b3e-bf28-baa68647cd29",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761374336598-4038",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "755c25cd-b76a-4847-91bd-30caf4b2a716",
//                     "transaction_time": "2025-10-25 13:39:23",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761374336598-4038&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T06:39:37.855Z",
//                 "createdAt": "2025-10-25T06:38:56.805Z",
//                 "updatedAt": "2025-10-25T06:39:37.855Z"
//             },
//             {
//                 "id": 23,
//                 "OrderId": "DON-ridhoamrullah-1761374321737-6171",
//                 "UserId": 8,
//                 "donorName": "Olivia",
//                 "donorEmail": "oliviarodrigo@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "5aa83827-153f-45d5-bcbc-a576adea4cfd",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:38:42.001Z",
//                 "updatedAt": "2025-10-25T06:38:42.001Z"
//             },
//             {
//                 "id": 22,
//                 "OrderId": "DON-ridhoamrullah-1761373639098-8395",
//                 "UserId": 8,
//                 "donorName": "Wew",
//                 "donorEmail": "dewaberasgerlong@gmail.com",
//                 "amount": 25000,
//                 "message": "12",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "failed",
//                 "midtransToken": "aaf93f2a-8900-44bf-968f-768b99933c65",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/aaf93f2a-8900-44bf-968f-768b99933c65/pdf",
//                     "order_id": "DON-ridhoamrullah-1761373639098-8395",
//                     "va_numbers": [
//                         {
//                             "bank": "bca",
//                             "va_number": "17710167402849827557005"
//                         }
//                     ],
//                     "status_code": "407",
//                     "fraud_status": "accept",
//                     "gross_amount": "25000.00",
//                     "payment_type": "bank_transfer",
//                     "bca_va_number": "17710167402849827557005",
//                     "status_message": "Success, transaction is found",
//                     "transaction_id": "e8f798a9-f051-4fc5-a407-2a001e183827",
//                     "transaction_time": "2025-10-25 13:27:26",
//                     "transaction_status": "expire",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761373639098-8395&status_code=407&transaction_status=expire"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:27:19.592Z",
//                 "updatedAt": "2025-10-25T06:28:42.733Z"
//             },
//             {
//                 "id": 21,
//                 "OrderId": "DON-ridhoamrullah-1761373583105-128",
//                 "UserId": 8,
//                 "donorName": "BCA",
//                 "donorEmail": "bac@gmail.com",
//                 "amount": 5000,
//                 "message": "12",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "14e2f62b-397f-438f-b66c-e89ffe72f906",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:26:23.319Z",
//                 "updatedAt": "2025-10-25T06:26:23.319Z"
//             },
//             {
//                 "id": 20,
//                 "OrderId": "DON-ridhoamrullah-1761373295365-3434",
//                 "UserId": 8,
//                 "donorName": "Maudy Ayunda",
//                 "donorEmail": "maudyayunda@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "failed",
//                 "midtransToken": "db1b9bd1-8f87-4676-86a9-0a8b1f607e4b",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761373295365-3434",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "202",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "3DS Authentication Denied",
//                     "transaction_id": "92dd4594-143c-4727-91cb-5e44696530a8",
//                     "transaction_time": "2025-10-25 13:22:01",
//                     "transaction_status": "deny",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761373295365-3434&status_code=202&transaction_status=deny"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:21:35.955Z",
//                 "updatedAt": "2025-10-25T06:26:07.609Z"
//             },
//             {
//                 "id": 19,
//                 "OrderId": "DON-ridhoamrullah-1761372944653-2093",
//                 "UserId": 8,
//                 "donorName": "Feby",
//                 "donorEmail": "febyputri@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "5a3617ae-5069-4e0b-a53f-14ef2ac6df50",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761372944653-2093",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "b6d8527b-3df6-4b90-943d-ecf1a40c98f9",
//                     "transaction_time": "2025-10-25 13:16:00",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761372944653-2093&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T06:16:14.521Z",
//                 "createdAt": "2025-10-25T06:15:44.896Z",
//                 "updatedAt": "2025-10-25T06:16:14.521Z"
//             },
//             {
//                 "id": 18,
//                 "OrderId": "DON-ridhoamrullah-1761372906115-6858",
//                 "UserId": 8,
//                 "donorName": "Dewa Beras Gerlong",
//                 "donorEmail": "dewaberasgerlong@gmail.com",
//                 "amount": 10000,
//                 "message": "w",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "88acd46a-6829-428a-bdc5-71ecf183deee",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/88acd46a-6829-428a-bdc5-71ecf183deee/pdf",
//                     "order_id": "DON-ridhoamrullah-1761372906115-6858",
//                     "va_numbers": [
//                         {
//                             "bank": "bca",
//                             "va_number": "17710122325678697516541"
//                         }
//                     ],
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000",
//                     "payment_type": "bank_transfer",
//                     "bca_va_number": "17710122325678697516541",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "a069ae5a-abe9-4ec2-a3f6-8c858a8b3285",
//                     "transaction_time": "2025-10-25 13:15:09",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761372906115-6858&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:15:06.377Z",
//                 "updatedAt": "2025-10-25T06:15:13.061Z"
//             },
//             {
//                 "id": 17,
//                 "OrderId": "DON-ridhoamrullah-1761372843025-5851",
//                 "UserId": 8,
//                 "donorName": "Bernadya 2",
//                 "donorEmail": "bernadya@gmial.com",
//                 "amount": 25000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "58d52f9e-c671-4cf5-b1c2-80a39ffaa383",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/58d52f9e-c671-4cf5-b1c2-80a39ffaa383/pdf",
//                     "order_id": "DON-ridhoamrullah-1761372843025-5851",
//                     "va_numbers": [
//                         {
//                             "bank": "bca",
//                             "va_number": "17710293038671217917804"
//                         }
//                     ],
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "25000",
//                     "payment_type": "bank_transfer",
//                     "bca_va_number": "17710293038671217917804",
//                     "status_message": "Your Transaction is being processed",
//                     "transaction_id": "73cbe278-3f59-4b43-978b-9a3ae08b74a6",
//                     "transaction_time": "2025-10-25 13:14:08",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761372843025-5851&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:14:03.243Z",
//                 "updatedAt": "2025-10-25T06:14:10.240Z"
//             },
//             {
//                 "id": 16,
//                 "OrderId": "DON-ridhoamrullah-1761372777744-9806",
//                 "UserId": 8,
//                 "donorName": "Bernadya",
//                 "donorEmail": "bernadya@gmail.com",
//                 "amount": 10000,
//                 "message": "Lama-lama",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "97a84604-3bcd-48c9-b435-77e817606a64",
//                 "midtransResponse": {
//                     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/97a84604-3bcd-48c9-b435-77e817606a64/pdf",
//                     "order_id": "DON-ridhoamrullah-1761372777744-9806",
//                     "va_numbers": [
//                         {
//                             "bank": "bca",
//                             "va_number": "17710853486398645994846"
//                         }
//                     ],
//                     "status_code": "201",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "bank_transfer",
//                     "bca_va_number": "17710853486398645994846",
//                     "status_message": "Success, transaction is found",
//                     "transaction_id": "4d781d58-78b3-4318-b854-e71231cfc4d1",
//                     "transaction_time": "2025-10-25 13:13:04",
//                     "transaction_status": "pending",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761372777744-9806&status_code=201&transaction_status=pending"
//                 },
//                 "paidAt": null,
//                 "createdAt": "2025-10-25T06:12:57.979Z",
//                 "updatedAt": "2025-10-25T06:13:11.479Z"
//             },
//             {
//                 "id": 15,
//                 "OrderId": "DON-ridhoamrullah-1761371344349-2329",
//                 "UserId": 8,
//                 "donorName": "Ridho Amrullah",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 1000000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "82419b22-be43-4520-8a54-8a5ff7f2b2cb",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761371344349-2329",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "1000000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "cef66ba1-3f95-46bc-baab-231f84ec4820",
//                     "transaction_time": "2025-10-25 12:49:17",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761371344349-2329&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-25T05:49:31.670Z",
//                 "createdAt": "2025-10-25T05:49:04.607Z",
//                 "updatedAt": "2025-10-25T05:49:31.670Z"
//             },
//             {
//                 "id": 14,
//                 "OrderId": "DON-ridhoamrullah-1761316274840-5841",
//                 "UserId": 8,
//                 "donorName": "Olivia",
//                 "donorEmail": "oliviarodrigo@gmail.com",
//                 "amount": 10000,
//                 "message": "Wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "c5a68ce5-142d-4bed-8bba-9747d49ce77f",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761316274840-5841",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "10000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "19091c22-f41e-4781-b03a-5c0a8f9f5e50",
//                     "transaction_time": "2025-10-24 21:31:25",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761316274840-5841&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-24T14:31:37.269Z",
//                 "createdAt": "2025-10-24T14:31:15.083Z",
//                 "updatedAt": "2025-10-24T14:31:37.269Z"
//             },
//             {
//                 "id": 13,
//                 "OrderId": "DON-ridhoamrullah-1761315869724-334",
//                 "UserId": 8,
//                 "donorName": "Last",
//                 "donorEmail": "lastwew@gmail.com",
//                 "amount": 1000000,
//                 "message": "W",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "8a1d955e-2647-429b-9ce0-e2df93ea7e20",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761315869724-334",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "1000000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "9aa1db67-5cee-4701-a7b0-d621f6a6520c",
//                     "transaction_time": "2025-10-24 21:24:41",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761315869724-334&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-24T14:24:52.741Z",
//                 "createdAt": "2025-10-24T14:24:29.927Z",
//                 "updatedAt": "2025-10-24T14:24:52.741Z"
//             },
//             {
//                 "id": 12,
//                 "OrderId": "DON-ridhoamrullah-1761315209260-9015",
//                 "UserId": 8,
//                 "donorName": "Multo",
//                 "donorEmail": "multogaming@gmail.com",
//                 "amount": 10000,
//                 "message": "Qwer",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "d69f4af7-5bee-4272-87fb-94d2a086a790",
//                 "midtransResponse": {},
//                 "paidAt": "2025-10-24T14:13:51.619Z",
//                 "createdAt": "2025-10-24T14:13:29.471Z",
//                 "updatedAt": "2025-10-24T14:13:51.619Z"
//             },
//             {
//                 "id": 11,
//                 "OrderId": "DON-ridhoamrullah-1761314613630-2913",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 10000,
//                 "message": "W",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "623de324-ea2f-4cc3-a51b-c78045544fa1",
//                 "midtransResponse": {},
//                 "paidAt": "2025-10-24T14:03:54.468Z",
//                 "createdAt": "2025-10-24T14:03:33.848Z",
//                 "updatedAt": "2025-10-24T14:03:54.468Z"
//             },
//             {
//                 "id": 10,
//                 "OrderId": "DON-ridhoamrullah-1761313108701-3340",
//                 "UserId": 8,
//                 "donorName": "Dewa Beras Gerlong",
//                 "donorEmail": "dewaberasgerlong@gmail.com",
//                 "amount": 100000,
//                 "message": "Wow",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "2acd5c17-806d-4727-a8c9-3c6f42955a7a",
//                 "midtransResponse": {
//                     "bank": "cimb",
//                     "order_id": "DON-ridhoamrullah-1761313108701-3340",
//                     "card_type": "credit",
//                     "masked_card": "48111111-1114",
//                     "status_code": "200",
//                     "fraud_status": "accept",
//                     "gross_amount": "100000.00",
//                     "payment_type": "credit_card",
//                     "status_message": "Success, Credit Card capture transaction is successful",
//                     "transaction_id": "a36deae3-5066-4961-b9fc-4fee1ca2245b",
//                     "transaction_time": "2025-10-24 20:38:40",
//                     "transaction_status": "capture",
//                     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761313108701-3340&status_code=200&transaction_status=capture"
//                 },
//                 "paidAt": "2025-10-24T13:38:57.367Z",
//                 "createdAt": "2025-10-24T13:38:29.040Z",
//                 "updatedAt": "2025-10-24T13:38:57.370Z"
//             },
//             {
//                 "id": 9,
//                 "OrderId": "DON-ridhoamrullah-1761312776088-6785",
//                 "UserId": 8,
//                 "donorName": "Coba Lagi",
//                 "donorEmail": "cobalagi@gmail.com",
//                 "amount": 25000,
//                 "message": "123",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "4a26c875-9ac7-466e-a887-102093baceab",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761312776088-6785",
//                     "fraud_status": "accept",
//                     "transaction_status": "capture"
//                 },
//                 "paidAt": "2025-10-24T13:33:30.538Z",
//                 "createdAt": "2025-10-24T13:32:56.450Z",
//                 "updatedAt": "2025-10-24T13:33:30.539Z"
//             },
//             {
//                 "id": 8,
//                 "OrderId": "DON-ridhoamrullah-1761312530414-4932",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 10000,
//                 "message": "Wow",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "0c87c554-b2c5-41de-9588-be26d5133adb",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761312530414-4932",
//                     "fraud_status": "accept",
//                     "transaction_status": "capture"
//                 },
//                 "paidAt": "2025-10-24T13:32:23.408Z",
//                 "createdAt": "2025-10-24T13:28:50.744Z",
//                 "updatedAt": "2025-10-24T13:32:23.409Z"
//             },
//             {
//                 "id": 7,
//                 "OrderId": "DON-ridhoamrullah-1761312121903-9722",
//                 "UserId": 8,
//                 "donorName": "Berhasil",
//                 "donorEmail": "akutauiniberhasil@gmail.com",
//                 "amount": 10000,
//                 "message": "Berhasil wew",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "b4696feb-6dd0-4205-ace3-47096ce986d5",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-24T13:22:02.120Z",
//                 "updatedAt": "2025-10-24T13:22:02.120Z"
//             },
//             {
//                 "id": 6,
//                 "OrderId": "DON-ridhoamrullah-1761312021746-5818",
//                 "UserId": 8,
//                 "donorName": "Ridho",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "Wow",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "07b4f392-d733-478a-969e-156998498ff7",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-24T13:20:21.963Z",
//                 "updatedAt": "2025-10-24T13:20:21.963Z"
//             },
//             {
//                 "id": 5,
//                 "OrderId": "DON-ridhoamrullah-1761311992338-4828",
//                 "UserId": 8,
//                 "donorName": "Dewa Beras Gerlong",
//                 "donorEmail": "dewaberasgerlong@gmail.com",
//                 "amount": 10000,
//                 "message": "Test donation to dewa beras gerlong",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "1b0b937f-2c2f-4e31-9268-71f08d55c9b6",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-24T13:19:52.875Z",
//                 "updatedAt": "2025-10-24T13:19:52.875Z"
//             },
//             {
//                 "id": 4,
//                 "OrderId": "DON-ridhoamrullah-1761311958768-260",
//                 "UserId": 8,
//                 "donorName": "Dewa Beras Gerlong",
//                 "donorEmail": "dewaberasgerlong@gmail.com",
//                 "amount": 10000,
//                 "message": "Test donation to dewa beras gerlong",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "c95582a1-7c99-4bb4-a7e3-d4fa8c6efb08",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-24T13:19:19.069Z",
//                 "updatedAt": "2025-10-24T13:19:19.069Z"
//             },
//             {
//                 "id": 3,
//                 "OrderId": "DON-ridhoamrullah-1761308748186-900",
//                 "UserId": 8,
//                 "donorName": "Anonymous",
//                 "donorEmail": "anonymous@gmail.com",
//                 "amount": 5000,
//                 "message": "Semanagat!",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "pending",
//                 "midtransToken": "16c62e82-148f-49df-aadb-1fda7a90e7e9",
//                 "midtransResponse": {},
//                 "paidAt": null,
//                 "createdAt": "2025-10-24T12:25:48.434Z",
//                 "updatedAt": "2025-10-24T12:25:48.434Z"
//             },
//             {
//                 "id": 2,
//                 "OrderId": "DON-ridhoamrullah-1761299657340-2554",
//                 "UserId": 8,
//                 "donorName": "Ridho",
//                 "donorEmail": "ridhoamrullah99@gmail.com",
//                 "amount": 10000,
//                 "message": "WeW",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "b2259ed0-36f8-44f1-ad3f-e6f4ccfd4cd7",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761299657340-2554",
//                     "fraud_status": "accept",
//                     "transaction_status": "settlement"
//                 },
//                 "paidAt": "2025-10-24T09:58:12.383Z",
//                 "createdAt": "2025-10-24T09:54:17.764Z",
//                 "updatedAt": "2025-10-24T09:58:12.384Z"
//             },
//             {
//                 "id": 1,
//                 "OrderId": "DON-ridhoamrullah-1761190117573-4559",
//                 "UserId": 8,
//                 "donorName": "Olivia Rodrigo",
//                 "donorEmail": "oliviarodrigo@gmail.com",
//                 "amount": 5000,
//                 "message": "Semanagat kaka",
//                 "messageType": "text",
//                 "mediaUrl": null,
//                 "gifUrl": null,
//                 "status": "success",
//                 "midtransToken": "55434d23-4caf-4a6e-841e-f40a5a244746",
//                 "midtransResponse": {
//                     "order_id": "DON-ridhoamrullah-1761190117573-4559",
//                     "fraud_status": "accept",
//                     "transaction_status": "settlement"
//                 },
//                 "paidAt": "2025-10-23T03:33:34.547Z",
//                 "createdAt": "2025-10-23T03:28:37.849Z",
//                 "updatedAt": "2025-10-23T03:33:34.547Z"
//             }
//         ]
//     },
//     "status": 200,
//     "statusText": "OK",
//     "headers": {
//         "content-length": "30166",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http",
//             "fetch"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzYxNDA4NTQwfQ.V2A1rxgS_0rtPXprJrW3Y6RQ-9AdfoDxDmyNraQhzFA"
//         },
//         "baseURL": "http://localhost:3000",
//         "method": "get",
//         "url": "/donation/my-history",
//         "allowAbsoluteUrls": true
//     },
//     "request": {}
// }
