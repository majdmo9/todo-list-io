"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const io = require("socket.io")(3005, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("connected to: " + socket.id);
    //? on connection
    socket.on("todo-event", (todo) => {
        socket.broadcast.emit("receive-todo", todo);
    });
    //? on done
    socket.on("todo-event-done", (id) => {
        io.emit("receive-todo-done", id);
    });
    //? on delete
    socket.on("todo-event-deleted", (id) => {
        io.emit("receive-todo-deleted", id);
    });
});
app.listen(4000, () => {
    console.log(`app listening on PORT: 4000`);
});
