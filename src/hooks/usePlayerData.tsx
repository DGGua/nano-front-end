import { useEffect, useState } from "react";
import { gameService } from "../services/gameService";
import { PlayerInfo } from "../types/gameType";

export default function usePlayerData() {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    playerId: "",
    cur_weight: 0,
    bearing_capacity: 0,
    userItems: [],
  });
  useEffect(() => updatePlayerInfo, []);

  function updatePlayerInfo() {
    gameService.curPlayerInfo().then((res) => {
      setPlayerInfo(res.data.data);
    });
  }
  return {
    playerInfo,
    updatePlayerInfo,
  };
}
