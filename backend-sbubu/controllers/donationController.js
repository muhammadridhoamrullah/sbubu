const midtransClient = require("midtrans-client");

class DonationController {
  static async generateMidtransToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let orderId = `DON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      // Untuk sekarang harga tetap 10.000
      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          //   first_name: "budi",
          //   last_name: "pratama",
          email: "ridhoamrullah99@gmail.com",
          //   phone: "08111222333",
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken, "midtransToken");
      //       {
      //   token: '8abf60d7-e5d4-4517-9c05-97a6c44b88a1',
      //   redirect_url: 'https://app.sandbox.midtrans.com/snap/v4/redirection/8abf60d7-e5d4-4517-9c05-97a6c44b88a1'
      // } midtransToken

      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = DonationController;
