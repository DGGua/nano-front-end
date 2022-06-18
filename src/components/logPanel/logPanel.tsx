import { List } from "antd";
import { useLog } from "../../hooks/useLog";
import LogItem from "../logItem/logItem";
import "./logPanel.scss";
export default function LogPanel() {
  const { logs } = useLog();
  return (
    <List
      className="log"
      locale={{ emptyText: "今日无战事" }}
      dataSource={logs}
      renderItem={(item) => (
        <List.Item>
          <LogItem log={item} />
        </List.Item>
      )}
    ></List>
  );
}
