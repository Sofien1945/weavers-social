import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
//import http from "http"

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	path: "/socket.io",
	cors: {
		origin: "http://localhost:3000",
		method: ["GET", "POST"],
		allowHeaders: ["Content-type"],
	},
});

//Check server Connexion
const PORT = process.env.PORT || 8000;
http.listen(PORT, console.log("server running on port:", PORT));

//Apply middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));

//Setup db connexion
const DATABASE = process.env.DATABASE;
mongoose
	.connect(DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connected"))
	.catch((err) => console.log("ERROR DB CONNEXION", err));

//Autoload routes from routes folder
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//Socket.io
io.on("connect", (socket) => {
	socket.on("new-post", (newPost) => {
		socket.broadcast.emit("new-post", newPost);
	});
});
