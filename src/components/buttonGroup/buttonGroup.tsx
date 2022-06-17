import { useState } from "react";
import { servicesVersion, setTokenSourceMapRange } from "typescript";
import { useLog } from "../../hooks/useLog";
import { usePlayerData } from "../../hooks/usePlayerData";
import { useRoomData } from "../../hooks/useRoomData";
import { gameService } from "../../services/gameService";
import { Item } from "../../types/gameType";

export default function ButtonGroup() {
  const { roomInfo, updateRoomInfo } = useRoomData();
  const { addLog } = useLog();
  const { playerInfo, updatePlayerInfo } = usePlayerData();
  const [step, setStep] = useState(1);
  async function pickUpItem(item: Item) {
    if (playerInfo.bearing_capacity - playerInfo.cur_weight < item.weight) {
      addLog(`你尝试捡起 ${item.name}，但他太沉了，你失败了`);
      return;
    }
    const { id, name } = item;
    await gameService.take(id);
    addLog(`你捡起了 ${name}`);
    updateRoomInfo();
    updatePlayerInfo();
  }

  async function goRoom(direction: string) {
    await gameService.move(direction);
    updateRoomInfo();
  }

  async function randomRoom() {
    await gameService.doEvent();
    updateRoomInfo();
  }

  async function back() {
    await gameService.back(step);
    updateRoomInfo();
  }
  return (
    <div className="button-group">
      {roomInfo.roomItems.map((item) => (
        <button onClick={() => pickUpItem(item)}>{`捡起 ${item.name}`}</button>
      ))}
      {Object.keys(roomInfo.directions).map((direction) => (
        <button onClick={() => goRoom(direction)}>{direction}</button>
      ))}
      {roomInfo.event ? <button onClick={randomRoom}>随机传送</button> : <></>}
      <button onClick={back}>后退N步</button>
      <input
        value={step}
        onChange={(event) => setStep(Number.parseInt(event.target.value))}
      ></input>
    </div>
  );
}
