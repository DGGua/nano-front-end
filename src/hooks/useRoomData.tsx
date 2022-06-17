import { useEffect, useState } from "react";
import { gameService } from "../services/gameService";
import { RoomInfo } from "../types/gameType";
import { addLog } from "./useLog";

let subscriptions: Array<React.Dispatch<React.SetStateAction<RoomInfo>>> = [];
let roomInfo: RoomInfo = {
  id: "",
  name: "",
  description: "",
  event: "",
  directions: {},
  roomItems: [],
};
let lastRoomId: string = "";
export async function updateRoomInfo() {
  const res = await gameService.curRoomInfo();
  roomInfo = res.data.data;
  subscriptions.forEach((subscription) => subscription(roomInfo));
  if (lastRoomId !== roomInfo.id) {
    lastRoomId = roomInfo.id;
    addLog(roomInfo.description);
  }
}
updateRoomInfo();

export function useRoomData() {
  const [_, subscription] = useState<RoomInfo>({
    id: "",
    name: "",
    description: "",
    event: "",
    directions: {},
    roomItems: [],
  });
  useEffect(() => {
    subscriptions.push(subscription);
    return () => {
      subscriptions = subscriptions.filter((item) => item !== subscription);
    };
  }, []);
  return { roomInfo, updateRoomInfo };
}
