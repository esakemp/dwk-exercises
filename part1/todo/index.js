const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const filepath = "/usr/src/app/files";

let todos = ["get a job", "get money"];

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const fileExists = async () =>
  new Promise((res) => {
    fs.stat(`${filepath}/image.jpg`, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const getImage = async () => {
  const image = await fileExists();
  if (image) return;
  const response = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  });
  response.data.pipe(fs.createWriteStream(`${filepath}/image.jpg`));
};

const getFile = async () =>
  new Promise((res) => {
    fs.readFile(`${filepath}/image.jpg`, function (err, buff) {
      if (err) return console.log(err);
      res(buff);
    });
  });

app.get("/pingpong", async (req, res) => {
  console.log(new Date(), "pinged");
  res.status(200).json("pong");
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/todos", async (req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  todos.push(req.body.todo);
  res.status(200).json(req.body);
});

app.use(express.static(__dirname + "/"));

const PORT = "8080";
const server = app.listen(PORT, () => {
  console.log(`Server started at ${new Date()}`);
  console.log(`Server listening on port ${PORT}!`);
});
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

getImage();
