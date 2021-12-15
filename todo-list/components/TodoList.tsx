import React, { useState, useEffect, FunctionComponent } from "react";
import Todo from "./Todo";
import Login from "./Login";
import Register from "./Rigester";
import styles from "../styles/TodoList.module.css";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import firebase from "../database/firebase";
import { useAuth } from "../authentication/auth";
import "firebase/auth";
import Authenticated from "../authentication/authenticated";
// import nookies from "nookies";
//* user auth
//- firebase database reference
const db = firebase.database();
interface todoType {
  todo: string;
  id: string;
  done: boolean;
  username: string;
}
interface IUser {
  username: string;
  password: string;
}
const TodoList: FunctionComponent = () => {
  const [todo, setTodo] = useState<todoType>({
    todo: "",
    id: "",
    done: false,
    username: "",
  });
  const [todos, setTodos] = useState<todoType[]>([]);
  const [socket, setSocket] = useState<undefined | Socket>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });
  const { User }: any = useAuth();

  //* Get all todos from firebase on connect | refresh
  const getData = () => {
    db.ref("todos").on("value", (snapshot: any) => {
      let tempUsersArray: todoType[] = [];
      snapshot.forEach((data: any) => {
        tempUsersArray.push({
          todo: data.val().todo,
          id: data.val().id,
          done: data.val().done,
          username: data.val().username,
        });
      });
      setTodos(tempUsersArray);
    });
  };
  //* make new connection on connect
  useEffect(() => {
    const socket = io("http://localhost:3005");
    setSocket(socket);
    getData();
  }, []);
  //* Append on todos on new todo
  useEffect(() => {
    if (socket) {
      socket.on("receive-todo", (todo: todoType) => {
        setTodos([...todos, todo]);
      });
      socket.on("receive-todo-done", (id: string) => {
        setTodos(
          todos.map((el) => {
            if (el.id === id) {
              el.done = true;
              db.ref("todos").child(id).update(el);
            }
            return el;
          })
        );
      });
      socket.on("receive-todo-deleted", (id: string) => {
        db.ref("todos").child(id).remove();
      });
    }
  }, [todos, socket]);
  //* Push one todo to firebase
  const handleClick = () => {
    if (!socket) return;
    if (todo.todo !== "") {
      socket.emit("todo-event", todo);
      setTodo({ todo: "", id: "", done: false, username: User.email });
      db.ref("todos").child(todo.id).set(todo);
    }
  };

  const handleChange = (e: any) => {
    if (todo.id === "")
      setTodo({
        todo: e.target.value,
        id: uuidv4(),
        done: false,
        username: User.email,
      });
    else
      setTodo({
        todo: e.target.value,
        id: todo.id,
        done: false,
        username: User.email,
      });
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.target.value = "";
      handleClick();
      setTodo({ todo: "", id: "", done: false, username: "" });
    }
  };
  const setTodoDone = (key: string) => {
    socket?.emit("todo-event-done", key);
  };
  const setTodoDeleted = (key: string) => {
    socket?.emit("todo-event-deleted", key);
  };
  const handleUserChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.username, user.password)
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err: any) => {
        alert(err.message);
        throw err;
      });
  };
  const handleLogIn = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.username, user.password)
      .then(() => {
        setLoggedIn(true);
        getData();
      })
      .catch((err: any) => {
        alert("User name or password might be wrong!" + "\n" + err.message);
        throw err;
      });
  };
  return (
    <>
      {!loggedIn && !register && !User ? (
        <>
          <Login
            handleUserChange={(e: any) => handleUserChange(e)}
            handleLogIn={() => handleLogIn()}
            handleRegister={() => setRegister(true)}
            username={user.username}
            password={user.password}
          />
        </>
      ) : register && !loggedIn ? (
        <Register
          handleLogIn={() => handleRegister()}
          handleUserChange={(e: any) => handleUserChange(e)}
          username={user.username}
          password={user.password}
        />
      ) : (
        <div className={styles.todoListDiv}>
          <h1>Todo List</h1>
          <Authenticated session={User?.email} />
          <ul className={styles.todo}>
            <li className={styles.todoInput}>
              <input
                type="text"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </li>
            <li className={styles.todoButton}>
              <button onClick={handleClick}>
                <i className="far fa-plus-square"></i>
              </button>
            </li>
          </ul>
          {todos.map(
            (todo) =>
              User?.email === todo.username && (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  todo={todo.todo}
                  done={todo.done}
                  setTodoDone={() => setTodoDone(todo.id)}
                  setTodoDeleted={() => setTodoDeleted(todo.id)}
                />
              )
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
