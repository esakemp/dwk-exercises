const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const getHash = () =>
  new Promise((res) =>
    fs.readFile("/usr/src/app/files/hashes.txt", function (err, buff) {
      if (err) return console.log(err);
      res(buff);
    })
  );

const getPongs = () =>
  new Promise((res) =>
    fs.readFile("/usr/src/app/files/pongs.txt", function (err, buff) {
      if (err) return console.log(err);
      res(buff);
    })
  );

app.use(cors());

app.get("/", async (req, res) => {
  const data = await getHash();
  const pongs = await getPongs();
  res.status(200).json({ hash: data.toString(), pongs: pongs.toString() });
});

app.get("/hash", async (req, res) => {
  const data = await getHash();
  res.status(200).json(data.toString());
});

const PORT = "3000";
const server = app.listen(PORT, () => {
  console.log(`Server started at ${new Date()}`);
  console.log(`Server listening on port ${PORT}!`);
});
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
