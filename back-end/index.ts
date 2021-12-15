interface todoType {
  todo: string;
  id: string | undefined;
}
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const io = require("socket.io")(3005, {
  cors: {
    origin: ["http://localhost:3000"],
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

app.listen(4000, () => {
  console.log(`app listening on PORT: 4000`);
});
