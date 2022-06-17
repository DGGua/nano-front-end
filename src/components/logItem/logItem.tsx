import { LogInfo } from "../../types/gameType";

export default function LogItem(props: { log: LogInfo }) {
  const { log } = props;
  return (
    <p className={`log-item log-${log.level}`}>
      {`[${log.time.format("HH:mm:ss")}] ${log.message}`}
    </p>
  );
}
