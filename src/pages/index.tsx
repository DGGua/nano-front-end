import UserModule from "../components/userModule/userModule";
import "./scss/index.scss";
export default function IndexPage() {
  return (
    <div className="main-frame">
      <div className="user-panel">
        <div className="user-avatar">
          <img src="https://via.placeholder.com/150" alt="" />
        </div>
        <div className="user-name"> NickName</div>
        <UserModule />
        <div className="user-bag">dididada</div>
      </div>
      <div className="main-panel">
        <div className="log">
          <p className="log-item">log1</p>
          <p className="log-item">log2</p>
          <p className="log-item">log3</p>
          <p className="log-item">log4</p>
          <p className="log-item">log5</p>
          <p className="log-item">log6</p>
          <p className="log-item">log7</p>
          <p className="log-item">log8</p>
          <p className="log-item">log9</p>
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
