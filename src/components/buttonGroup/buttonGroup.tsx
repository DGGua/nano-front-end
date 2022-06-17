import { useState } from "react";
import { servicesVersion, setTokenSourceMapRange } from "typescript";
import { useLog } from "../../hooks/useLog";
import { usePlayerData } from "../../hooks/usePlayerData";
import { useRoomData } from "../../hooks/useRoomData";
import { gameService } from "../../services/gameService";
import { Item } from "../../types/gameType";
import "./buttonGroup.scss";
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
      <div className="group group-items">
        {roomInfo.roomItems.map((item) => (
          <button
            onClick={() => pickUpItem(item)}
          >{`捡起 ${item.name}`}</button>
        ))}
      </div>
      <div className="group group-directions">
        {Object.keys(roomInfo.directions).map((direction) => (
          <button onClick={() => goRoom(direction)}>{direction}</button>
        ))}
      </div>
      <div className="group group-events">
        <button onClick={randomRoom} disabled={!roomInfo.event}>
          随机传送
        </button>
        <div className="back-event">
          <button onClick={back}>后退N步</button>
          <input
            value={step}
            onChange={(event) => setStep(Number.parseInt(event.target.value))}
          ></input>
        </div>
      </div>
    </div>
  );
}
