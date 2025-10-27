if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const { Server } = require("socket.io");

// Buat HTTP server ( bukan langsung dari express )
const server = http.createServer(app);

// Setup Socket.io dengan CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Untuk development (production: set URL frontend yang spesifik)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".mp3")) {
        res.setHeader("Content-Type", "audio/mpeg");
      }
    },
  })
); // Serve static files from the 'public' directory

// Socket.io Connection Handling
io.on("connection", (socket) => {
  console.log("Client Connected", socket.id);

  // Event: Streamer join room (untuk listen donation alert)
  socket.on("join-streamer-room", (streamerUsername) => {
    socket.join(`streamer-${streamerUsername}`);
    console.log(`Socket ${socket.id} joined room: ${streamerUsername}`);
  });

  // Event: Join by overlay key (alternative method)
  socket.on("join-by-overlay-key", (overlayKey) => {
    socket.join(`overlay-${overlayKey}`);
    console.log(
      `Socket ${socket.id} joined room by overlay key: ${overlayKey}`
    );
  });

  // Event: Disconnect
  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.id);
  });
});

// Simpan io instance agar bisa diakses ke controller
app.set("io", io);

// Routes
app.use(router);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Socket io ready for real-time connections`);
});

// 1. Public Donation Page (/:username)
//    ↓
// 2. User isi form → Submit
//    ↓
// 3. Backend: Create donation + Generate Midtrans token
//    ↓
// 4. Frontend: Open Midtrans Snap popup
//    ↓
// 5. User bayar via Midtrans
//    ↓
// 6. Midtrans webhook → Update donation status
//    ↓
// 7. Socket.io emit event → Alert widget
//    ↓
// 8. Alert muncul di OBS streamer

// Implementasi Socket.io untuk real-time alert

// Donatur bayar → Midtrans webhook → Backend update DB
// → Socket.io emit event → Widget di OBS terima event
// → Alert muncul dengan animasi! 🎉
