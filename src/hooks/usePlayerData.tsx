import { useEffect, useState } from "react";
import { gameService } from "../services/gameService";
import { PlayerInfo } from "../types/gameType";

let subscriptions: Array<React.Dispatch<React.SetStateAction<PlayerInfo>>> = [];
let playerInfo: PlayerInfo = {
  playerId: "",
  cur_weight: 0,
  bearing_capacity: 0,
  userItems: [],
};
export async function updatePlayerInfo() {
  const res = await gameService.curPlayerInfo();
  playerInfo = res.data.data;
  subscriptions.forEach((subscription) => subscription(playerInfo));
}
updatePlayerInfo();

export function usePlayerData() {
  const [_, subscription] = useState<PlayerInfo>({
    playerId: "",
    cur_weight: 0,
    bearing_capacity: 0,
    userItems: [],
  });
  useEffect(() => {
    subscriptions.push(subscription);
    return () => {
      subscriptions = subscriptions.filter((item) => item !== subscription);
    };
  }, []);
  return { playerInfo, updatePlayerInfo };
}
