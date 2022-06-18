import ButtonGroup from "../components/buttonGroup/buttonGroup";
import LogPanel from "../components/logPanel/logPanel";
import { UserBag } from "../components/userBag/userBag";
import UserModule from "../components/userModule/userModule";
import "./scss/index.scss";
export default function IndexPage() {
  return (
    <div className="main-frame">
      <div className="user-panel">
        <UserModule />
        <UserBag />
      </div>
      <div className="main-panel">
        <LogPanel />
        <ButtonGroup />
      </div>
    </div>
  );
}
