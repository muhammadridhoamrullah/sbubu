const { or } = require("sequelize");
const { BannedWord } = require("../models/index");

let cache = null;
let cacheTime = null;

// Helper function untuk mensensor kata
function sensorKata(word) {
  if (word.length <= 2) {
    return "*".repeat(word.length);
  }
  // repeat ini untuk mencetak karakter '*' sesuai panjang kata yang disensor

  const firstChar = word[0];
  const lastChar = word[word.length - 1];
  const middleLength = word.length - 2;
  // anjing, firstChar = a, lastChar = g, middleLength = 4.
  // kenapa 4? karena total word.length itu 6, dikurang 2 (firstChar & lastChar)

  // satukan semuanya
  return firstChar + "*".repeat(middleLength) + lastChar;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function checkBannedWords(inputText) {
  try {
    // Cek jika inputText kosong atau hanya berisi spasi, jika iya, kembalikan langsung
    if (!inputText || inputText.trim() === "") {
      console.log(`Masuk disini`);

      return {
        banned: false,
        moderateMessage: inputText,
        bannedWords: [],
      };
    }

    // Tempat penyimpanan kata terlarang, baik itu dari cache atau database
    let bannedWordLists;
    let now = Date.now();

    // Periksa apakah cache masih valid (misalnya, valid selama 5 menit)
    if (cache && cacheTime && now - cacheTime < 300000) {
      bannedWordLists = cache;
    } else {
      console.log("Ambil dari database");

      const bannedWords = await BannedWord.findAll({
        where: { isActive: true },
      });

      bannedWordLists = bannedWords.map((bw) => bw.value.toLowerCase());
      cache = bannedWordLists;
      cacheTime = now;
    }

    // Disini kondisi daftar kata terlarang sudah ada di bannedWordLists

    // Proses filtering kata terlarang
    let moderateMessage = inputText.toLowerCase();
    let finalMessage = inputText.toLowerCase();
    const foundBannedWords = [];

    // Dicek 1 per 1 apakah ada mengandung kata terlarang
    for (const bannedWord of bannedWordLists) {
      // Untuk memastikan hanya mencocokkan kata utuh
      const regex = new RegExp(`\\b${escapeRegex(bannedWord)}\\b`, "gi");
      // kalo "anjing" maka regexnya jadi /\banjing\b/gi dan hasilnya hanya mencocokkan kata "anjing" saja
      // kalo "anjingan" tidak akan terdeteksi karena tidak ada spasi di depannya atau di belakangnya

      // Untuk mengecek apakah ada bannedWord di dalam pesan
      const isMatch = regex.test(finalMessage);

      if (isMatch) {
        // Jika ada kecocokan, maka tambahkan ke daftar kata terlarang yang ditemukan
        foundBannedWords.push(bannedWord);

        // Untuk mengganti kata terlarang dengan sensor
        const replaceRegex = new RegExp(
          `\\b${escapeRegex(bannedWord)}\\b`,
          "gi"
        );

        // Lakukan sensor pada kata terlarang
        const sensor = sensorKata(bannedWord);

        finalMessage = finalMessage.replace(replaceRegex, sensor);
      } else {
        console.log("❌ No match");
      }
    }

    // Jika ada 1 atau lebih kata terlarang ditemukan, kembalikan daftar tersebut
    if (foundBannedWords.length > 0) {
      return {
        banned: true,
        finalMessage: finalMessage,
        bannedWords: foundBannedWords,
        originalMessage: inputText,
      };
    }

    return {
      banned: false,
      finalMessage: inputText,
      bannedWords: [],
      originalMessage: inputText,
    };
  } catch (error) {
    return {
      banned: false,
      moderateMessage: inputText,
      bannedWords: [],
      error: error.message,
    };
  }
}

function clearCacheBannedWords() {
  cache = null;
  cacheTime = null;
}

module.exports = { checkBannedWords, clearCacheBannedWords };
