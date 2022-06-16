import { useEffect, useState } from "react";

let subscriptions: Array<React.Dispatch<React.SetStateAction<string[]>>> = [];
let logs = ["1", "2", "3", "4"];
export function addLog(log: string) {
  logs = [...logs, log];
  subscriptions.forEach((subscription) => subscription(logs));
}

export function useLog() {
  const [_, subscription] = useState<string[]>([]);
  useEffect(() => {
    subscriptions.push(subscription);
    return () => {
      subscriptions = subscriptions.filter((item) => item !== subscription);
    };
  }, []);
  return { logs, addLog };
}
