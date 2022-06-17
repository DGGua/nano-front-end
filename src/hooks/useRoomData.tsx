import { useEffect, useState } from "react";
import { gameService } from "../services/gameService";
import { RoomInfo } from "../types/gameType";

let subscriptions: Array<React.Dispatch<React.SetStateAction<RoomInfo>>> = [];
let roomInfo: RoomInfo = {
  id: "",
  name: "",
  description: "",
  event: "",
  directions: {},
  roomItems: [],
};
export async function updateRoomInfo() {
  const res = await gameService.curRoomInfo();
  roomInfo = res.data.data;
  subscriptions.forEach((subscription) => subscription(roomInfo));
}
updateRoomInfo();

export function usePlayerData() {
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
