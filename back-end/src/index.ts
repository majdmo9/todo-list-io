interface todoType {
  todo: string;
  id: string | undefined;
}

const ioPORT = process.env.PORT || 3005;
const cors = require("cors");

const io = require("socket.io")(ioPORT, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.12:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: any) => {
  console.log("connected to: " + socket.id);
  //? on connection
  socket.on("todo-event", (todo: todoType) => {
    socket.broadcast.emit("receive-todo", todo);
  });
  //? on done
  socket.on("todo-event-done", (id: string) => {
    io.emit("receive-todo-done", id);
  });
  //? on delete
  socket.on("todo-event-deleted", (id: string) => {
    io.emit("receive-todo-deleted", id);
  });
});
