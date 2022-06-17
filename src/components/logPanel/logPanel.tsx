import { useLog } from "../../hooks/useLog";
import LogItem from "../logItem/logItem";
import "./logPanel.scss";
export default function LogPanel() {
  const { logs } = useLog();
  return (
    <div className="log">
      {logs.map((log) => (
        <LogItem log={log} />
      ))}
    </div>
  );
}
