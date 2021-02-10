const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

let pongs = 0;

app.get("/pingpong", async (req, res) => {
  const currPongs = pongs;
  pongs++;
  fs.writeFile(
    "/usr/src/app/files/pongs.txt",
    `${currPongs} times ponged`,
    function (err) {
      if (err) return console.log(err);
      console.log('succesfully pong writte')
    }
  );
  console.log("pinged");
  res.status(200).json(`${currPongs} times ponged`);
});

const PORT = "3001";
const server = app.listen(PORT, () => {
  console.log(`Server started at ${new Date()}`);
  console.log(`Server listening on port ${PORT}!`);
});
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
