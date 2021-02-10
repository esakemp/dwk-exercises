const fs = require("fs");

let randHash;

const hashingFunc = () => {
  randHash = Math.random().toString(36);
};

const printRandHash = () => {
  if (!randHash) hashingFunc();
  const currDate = new Date();
  console.log(currDate, randHash);
  fs.writeFile("/usr/src/app/files/hashes.txt", `${currDate} - ${randHash}`, function (err) {
    if (err) return console.log(err);
    console.log("Succesfully written to file");
  });
  setTimeout(printRandHash, 5000);
};

printRandHash();
