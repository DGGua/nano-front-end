import { useEffect } from "react";
import LogItem from "../components/logItem/logItem";
import { UserBag } from "../components/userBag/userBag";
import UserModule from "../components/userModule/userModule";
import { useLog } from "../hooks/useLog";
import "./scss/index.scss";
export default function IndexPage() {
  const { logs } = useLog();
  return (
    <div className="main-frame">
      <div className="user-panel">
        <div className="user-avatar">
          <img src="https://via.placeholder.com/150" alt="" />
        </div>
        <div className="user-name"> NickName</div>
        <UserModule />
        <UserBag />
      </div>
      <div className="main-panel">
        <div className="log">
          {logs.map((log) => (
            <LogItem log={log} />
          ))}
        </div>
        <div className="choice">
          <button>123</button>
          <button>123</button>
          <button>123</button>
          <button>123</button>
          <button>123</button>
          <button>123</button>
        </div>
      </div>
    </div>
  );
}
