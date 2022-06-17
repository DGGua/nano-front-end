import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { JWTType } from "../../types/jwtType";
import { UserService } from "../../services/userService";
import "./userModule.scss";
import { useLog } from "../../hooks/useLog";

export default function UserModule() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const { addLog } = useLog();
  useEffect(() => {
    const jwt = localStorage.getItem("auth");
    if (jwt) {
      const { exp, username } = jwtDecode<JWTType>(jwt);
      if (new Date().getTime() > exp) {
        setLogged(true);
        setUsername(username);
      }
    }
  }, []);

  const login = () => {
    UserService.login(username, password).then(({ code, data, msg }) => {
      if (code === 200200) {
        localStorage.setItem("auth", data);
        window.location.reload();
      } else {
        addLog(msg, "error");
      }
    });
  };
  const register = () => {
    UserService.register(username, password).then(({ code, msg }) => {
      if (code === 200200) {
        login();
      } else {
        addLog(msg, "error");
      }
    });
  };

  if (logged) {
    return <div className="username">{username}</div>;
  } else {
    return (
      <div className="form">
        <div className="username">
          用户名：
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="password">
          密码：
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={login}>登录</button>
          <button onClick={register}>注册</button>
        </div>
        <span className="alerts">{alert}</span>
      </div>
    );
  }
}
