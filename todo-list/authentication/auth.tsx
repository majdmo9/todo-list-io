import {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import firebase from "../database/firebase";
import nookies from "nookies";
import "firebase/auth";

interface IProps {
  children: any;
}

const AuthContext = createContext({});
interface IUser {
  username: string;
  password: string;
}
export const AuthProvider: FunctionComponent<IProps> = ({ children }) => {
  const [User, setUser] = useState<null | firebase.User>(null);
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (User) => {
      if (!User) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }
      const token = await User.getIdToken();
      setUser(User);
      nookies.set(undefined, "token", token, {});
    });
  }, []);
  return (
    <AuthContext.Provider value={{ User }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
