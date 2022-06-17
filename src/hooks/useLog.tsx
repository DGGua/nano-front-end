import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { LogInfo } from "../types/gameType";

let subscriptions: Array<React.Dispatch<React.SetStateAction<LogInfo[]>>> = [];
let logs: LogInfo[] = [];
export function addLog(
  message: string,
  level: "error" | "warn" | "info" = "info"
) {
  logs = [{ message, level, time: dayjs() }, ...logs];
  subscriptions.forEach((subscription) => subscription(logs));
}

export function useLog() {
  const [_, subscription] = useState<LogInfo[]>([]);
  useEffect(() => {
    subscriptions.push(subscription);
    return () => {
      subscriptions = subscriptions.filter((item) => item !== subscription);
    };
  }, []);
  return { logs, addLog };
}
