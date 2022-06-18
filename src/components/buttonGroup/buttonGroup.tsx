import { Button, Divider, Input, InputNumber, Popover, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLog } from "../../hooks/useLog";
import { usePlayerData } from "../../hooks/usePlayerData";
import { useRoomData } from "../../hooks/useRoomData";
import { gameService } from "../../services/gameService";
import { Item } from "../../types/gameType";
import ItemInfoPanel from "../itemInfoPanel/itemInfoPanel";
import "./buttonGroup.scss";
export default function ButtonGroup() {
  const { roomInfo, updateRoomInfo } = useRoomData();
  const { addLog } = useLog();
  const { playerInfo, updatePlayerInfo } = usePlayerData();
  const [step, setStep] = useState(1);

  const panelRef = useRef<HTMLDivElement>(null);

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
          <Popover
            placement="top"
            title={<Typography.Title level={5}>{item.name}</Typography.Title>}
            content={
              <div>
                <Typography.Paragraph>重量：{item.weight}</Typography.Paragraph>
                {item.available ? (
                  <Typography.Paragraph italic>可使用</Typography.Paragraph>
                ) : null}
              </div>
            }
            trigger="hover"
          >
            <Button
              onClick={() => pickUpItem(item)}
            >{`捡起 ${item.name}`}</Button>
          </Popover>
        ))}
      </div>
      <div className="divider" />
      <div className="group group-directions">
        {Object.keys(roomInfo.directions).map((direction) => (
          <Button onClick={() => goRoom(direction)}>{direction}</Button>
        ))}
      </div>
      <div className="divider" />
      <div className="group group-events">
        <Button
          type="primary"
          block
          onClick={() => randomRoom}
          disabled={!roomInfo.event}
        >
          随机传送
        </Button>
        <div className="back-event">
          <Button onClick={back}>后退N步</Button>
          <InputNumber value={step} onChange={setStep}></InputNumber>
        </div>
      </div>
    </div>
  );
}
