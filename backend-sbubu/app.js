if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");

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
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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