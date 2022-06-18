import { Layout } from "antd";
import ButtonGroup from "../components/buttonGroup/buttonGroup";
import LogPanel from "../components/logPanel/logPanel";
import { UserBag } from "../components/userBag/userBag";
import UserModule from "../components/userModule/userModule";
import "./scss/index.scss";
export default function IndexPage() {
  return (
    <div className="main-frame">
      <Layout.Sider className="user-panel" theme="light" width={250}>
        <div className="user-panel-inner">
          <UserModule />
          <hr />
          <UserBag />
        </div>
      </Layout.Sider>
      <Layout.Content className="main-panel">
        <LogPanel />
        <Layout.Footer>
          <ButtonGroup />
        </Layout.Footer>
      </Layout.Content>
    </div>
  );
}
