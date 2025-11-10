const midtransClient = require("midtrans-client");
const { User, Donation } = require("../models/index");
const { checkBannedWords } = require("../helpers/checkBannedWords");
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

  static async createDonation(req, res, next) {
    try {
      // Ambil username
      const { username } = req.params;

      // ✅ SAFE: Check if req.body exists before destructuring
      if (!req.body) {
        console.error("❌ req.body is undefined!");
        throw {
          name: "VALIDATION_ERROR",
          message: "Request body is missing. Check middleware configuration.",
        };
      }

      const {
        donorName,
        donorEmail,
        amount,
        message,
        voiceDuration,
        messageType,
        mediaUrl,
        mediaTitle,
        videoId,
        startTime,
        mediaDuration,
        tiktokUrl,
      } = req.body;
      console.log("Req Body Create", req.body);

      // Validasi Input
      if (!donorName || !amount) {
        throw { name: "DONATION_CREATE_INPUT_ERROR" };
      }

      // Cek jika amount kurang dari 5000
      if (amount < 5000) {
        throw { name: "DONATION_CREATE_INPUT_AMOUNT_ERROR" };
      }

      // Check banned words in message
      // Voice
      let voiceUrl = null;
      let finalVoiceDuration = null;
      // Message
      let finalMessage = message || "";
      let isBanned = false;
      let bannedWordsFound = [];
      let originalMessage = "";
      // Youtube
      let finalMediaUrl = null;
      let finalVideoId = null;
      let finalMediaTitle = null;
      let finalStartTime = null;
      let finalMediaDuration = null;
      // Tiktok
      let finalTiktokUrl = null;

      if (messageType === "voice" && req.file) {
        // ✅ Voice message
        voiceUrl = req.file.path;
        finalVoiceDuration = voiceDuration ? parseInt(voiceDuration) : null;
      } else if (messageType === "text" && message) {
        // ✅ Text message - check banned words
        const result = await checkBannedWords(message);

        finalMessage = result.finalMessage;
        isBanned = result.banned;
        bannedWordsFound = result.bannedWords;

        if (isBanned) {
          originalMessage = result.originalMessage;
        }
      } else if (messageType === "youtube" && mediaUrl) {
        // Youtube mediashare
        finalMediaUrl = mediaUrl;
        finalVideoId = videoId;
        finalMediaTitle = mediaTitle || "YouTube Video";
        finalStartTime = startTime ? parseInt(startTime) : 0;
        finalMediaDuration = mediaDuration ? parseInt(mediaDuration) : 15;

        // Check message
        if (message) {
          const result = await checkBannedWords(message);
          finalMessage = result.finalMessage;
          isBanned = result.banned;
          bannedWordsFound = result.bannedWords;

          if (isBanned) {
            originalMessage = result.originalMessage;
          }
        }
      } else if (messageType === "tiktok" && tiktokUrl) {
        console.log("tiktokUrl", tiktokUrl);

        // Tiktok mediashare
        finalTiktokUrl = tiktokUrl;
        finalMediaDuration = mediaDuration ? parseInt(mediaDuration) : 15;

        // Check message
        if (message) {
          const result = await checkBannedWords(message);
          finalMessage = result.finalMessage;
          isBanned = result.banned;
          bannedWordsFound = result.bannedWords;

          if (isBanned) {
            originalMessage = result.originalMessage;
          }
        }
      } else if (messageType === "text") {
        // ✅ Empty text message
        finalMessage = "";
      }
      // Cari streamer berdasarkan username
      let streamer = await User.findOne({
        where: { username },
      });

      if (!streamer) {
        throw { name: "STREAMER_NOT_FOUND" };
      }

      // Generate unique OrderId
      let orderId = `DON-${username}-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;

      // Setup midtrans snap
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      // Buat parameter transaksi
      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: donorName,
          email: donorEmail,
        },
      };

      // Generate midtrans token
      const midtransToken = await snap.createTransaction(parameter);
      // Simpan donasi ke database dengan status 'pending'

      let newDonation = await Donation.create({
        OrderId: orderId,
        UserId: streamer.id,
        donorName,
        donorEmail: donorEmail || null,
        amount,
        message: finalMessage,
        originalMessage: originalMessage || null,
        messageType: messageType || "text",
        voiceUrl: voiceUrl, // ✅ Add voice URL
        voiceDuration: finalVoiceDuration,
        status: "pending",
        midtransToken: midtransToken.token,
        // Youtube fields
        mediaUrl: finalMediaUrl,
        mediaTitle: finalMediaTitle,
        videoId: finalVideoId,
        startTime: finalStartTime,
        mediaDuration: finalMediaDuration,
        // Tiktok fields
        tiktokUrl: finalTiktokUrl,
      });

      res.status(201).json({
        message: "Donation created successfully",
        donation: {
          id: newDonation.id,
          OrderId: newDonation.OrderId,
          amount: newDonation.amount,
          donorName: newDonation.donorName,
          messageBanned: isBanned,
          originalMessage: originalMessage,
          messageType: messageType || "text", // ✅ Use from request
          voiceUrl: voiceUrl, // ✅ Add voice URL
          voiceDuration: finalVoiceDuration,
          finalMessage: finalMessage,
          bannedWords: bannedWordsFound,
          createdAt: newDonation.createdAt,
          updatedAt: newDonation.updatedAt,
          mediaUrl: newDonation.mediaUrl,
          mediaTitle: newDonation.mediaTitle,
          videoId: newDonation.videoId,
          startTime: newDonation.startTime,
          mediaDuration: newDonation.mediaDuration,
          tiktokUrl: newDonation.tiktokUrl,
        },
        midtransToken: midtransToken.token,
        midtransRedirectUrl: midtransToken.redirect_url,
      });
    } catch (error) {
      console.log(error, "error createDonation");

      next(error);
    }
  }

  static async midtransWebhook(req, res, next) {
    try {
      // ambil data dari midtrans
      const {
        order_id,
        transaction_status,
        fraud_status,
        data,
        isLogin,
        dataUser,
      } = req.body;

      // cari donasi berdasarkan order_id
      let donation = await Donation.findOne({
        where: {
          OrderId: order_id,
        },
        include: [
          {
            model: User,
            as: "Recipient",
          },
        ],
      });

      if (!donation) {
        throw { name: "DONATION_NOT_FOUND" };
      }

      // update status berdasarkan respon midtrans
      let newStatus = "pending";
      if (transaction_status === "capture") {
        if (fraud_status === "accept") {
          newStatus = "success";
        }
      } else if (transaction_status === "settlement") {
        newStatus = "success";
      } else if (
        transaction_status === "cancel" ||
        transaction_status === "deny" ||
        transaction_status === "expire"
      ) {
        newStatus = "failed";
      } else if (transaction_status === "pending") {
        newStatus = "pending";
      }

      // update donation status
      await Donation.update(
        {
          status: newStatus,
          midtransResponse: data,
          paidAt: newStatus === "success" ? new Date() : null,
        },
        {
          where: {
            OrderId: order_id,
          },
        }
      );

      // TODO later: emit socket.io event to alert widget in streamer page
      if (newStatus === "success") {
        const io = req.app.get("io");

        // Prepare donation data untuk alert
        const alertData = {
          id: donation.id,
          donorName: donation.donorName,
          amount: donation.amount,
          message: donation.message,
          messageType: donation.messageType, // ✅ Include messageType
          voiceUrl: donation.voiceUrl, // ✅ Include voiceUrl
          voiceDuration: donation.voiceDuration, // ✅ Include voiceDuration
          createdAt: donation.createdAt,
          isLogin,
          dataUser,
          // Youtube fields
          mediaUrl: donation.mediaUrl,
          mediaTitle: donation.mediaTitle,
          videoId: donation.videoId,
          startTime: donation.startTime,
          mediaDuration: donation.mediaDuration,
          // Tiktok fields
          tiktokUrl: donation.tiktokUrl,
        };

        // Emit ke room streamer
        // io.to(`streamer-${donation.Recipient.username}`).emit(
        //   "new-donation",
        //   alertData
        // );

        // 1. Kirim ke room overlay key yang sesuai dengan donation ini dengan nama event "new-donation"
        // yang akan diterima oleh client  adalah event "new-donation"
        io.to(`overlay-${donation.Recipient.overlayKey}`).emit(
          "new-donation",
          alertData
        );

        console.log(
          `Donation ${order_id} SUCCESS! Alert emitted to streamer ${donation.UserId}`
        );
      }

      res.status(200).json({ message: "Webhook handled successfully" });
    } catch (error) {
      console.log(error, "<<< error midtrans webhook");

      next(error);
    }
  }

  static async getStreamerDonations(req, res, next) {
    try {
      // ambil username dari params
      const { username } = req.params;

      // cari streamer berdasarkan username
      let streamer = await User.findOne({
        where: { username },
        attributes: [
          "id",
          "username",
          "name",
          "banner",
          "isEmailVerified",
          "socialMediaLinks",
          "avatarUrl",
        ],
      });

      if (!streamer) {
        throw { name: "STREAMER_NOT_FOUND" };
      }

      // ambil recent donation yang success untuk streamer tersebut
      // let recentDonations = await Donation.findAll({
      //   where: {
      //     UserId: streamer.id,
      //     status: "success",
      //   },
      //   order: [["createdAt", "DESC"]],
      //   limit: 10,
      //   attributes: ["donorName", "amount", "message", "createdAt"],
      // });

      // let totalEarnings = await Donation.sum("amount", {
      //   where: {
      //     UserId: streamer.id,
      //     status: "success",
      //   },
      // });

      res.status(200).json({
        streamer,
        // totalEarnings: totalEarnings || 0,
        // recentDonations,
      });
    } catch (error) {
      console.log(error, "<<< error getStreamerDonations");

      next(error);
    }
  }

  static async getMyDonationHistory(req, res, next) {
    try {
      // ambil user id dari authen
      const UserId = req.user.id;

      // ambil donasi dari database
      let donations = await Donation.findAll({
        where: { UserId },
        order: [["createdAt", "DESC"]],
        status: "success",
      });

      const stats = {
        totalDonations: donations.length,
        totalEarnings: donations
          .filter((el) => el.status === "success")
          .reduce((acc, curr) => acc + curr.amount, 0),
        pendingAmount: donations
          .filter((el) => el.status === "pending")
          .reduce((acc, curr) => acc + curr.amount, 0),
      };

      res.status(200).json({
        stats,
        donations,
      });
    } catch (error) {
      console.log(error, "<<< error getMyDonationHistory");

      next(error);
    }
  }
}
module.exports = DonationController;

// DONATION_CREATE_INPUT_ERROR
// DONATION_CREATE_INPUT_AMOUNT_ERROR
// STREAMER_NOT_FOUND
// DONATION_NOT_FOUND
