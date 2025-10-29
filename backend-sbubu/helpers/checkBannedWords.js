const { BannedWord } = require("../models/index");

let cache = null;
let cacheTime = null;

async function checkBannedWords(inputText) {
  try {
    let bannedWordLists;
    let now = Date.now();

    // Periksa apakah cache masih valid (misalnya, valid selama 5 menit)
    if (cache && cacheTime && now - cacheTime < 300000) {
      bannedWordLists = cache;
    } else {
      const bannedWords = await BannedWord.findAll({
        where: { isActive: true },
      });

      bannedWordLists = bannedWords.map((bw) => bw.word);
      cache = bannedWordLists;
      cacheTime = now;
    }

    const inputLower = inputText.toLowerCase();
    const foundBannedWords = [];

    for (const bannedWord of bannedWordLists) {
      const regex = new RegExp(`\\b${bannedWord}\\b`, "i");
      if (regex.test(inputLower)) {
        foundBannedWords.push(bannedWord);
      }
    }

    // Jika ada 1 atau lebih kata terlarang ditemukan, kembalikan daftar tersebut
    if (foundBannedWords.length > 0) {
      return {
        banned: true,
        moderateMessage: "⚠️ Pesan ini mengandung kata yang dilarang",
        bannedWords: foundBannedWords,
      };
    }

    return {
      banned: false,
      moderateMessage: inputText,
      bannedWords: [],
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
