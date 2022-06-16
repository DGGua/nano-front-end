import { log } from "console";

export default function LogItem(props: { log: string }) {
  const { log } = props;
  return <p className="log-item">{log}</p>;
}
