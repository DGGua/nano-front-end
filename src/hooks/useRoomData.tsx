import { useEffect, useState } from "react";
import { gameService } from "../services/gameService";
import { RoomInfo } from "../types/gameType";

export default function useRoomData() {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    id: "",
    name: "",
    description: "",
    event: "",
    directions: {},
    roomItems: [],
  });
  useEffect(() => updateRoomInfo, []);

  function updateRoomInfo() {
    gameService.curRoomInfo().then((res) => {
      setRoomInfo(res.data.data);
    });
  }
  return {
    roomInfo,
    updateRoomInfo,
  };
}
