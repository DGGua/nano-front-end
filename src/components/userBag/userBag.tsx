import { Button, List, Popover, Typography } from "antd";
import { useState } from "react";
import { useLog } from "../../hooks/useLog";
import { usePlayerData } from "../../hooks/usePlayerData";
import { updateRoomInfo } from "../../hooks/useRoomData";
import { gameService } from "../../services/gameService";
import { Item } from "../../types/gameType";
import ItemInfoPanel from "../itemInfoPanel/itemInfoPanel";
import "./userBag.scss";

export function UserBag() {
  const { addLog } = useLog();
  const { playerInfo, updatePlayerInfo } = usePlayerData();
  const {
    bearing_capacity: capacity,
    cur_weight: weight,
    userItems,
  } = playerInfo;
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [showItem, setShowItem] = useState<Item>();
  const [chosenItemIndex, setChosenItemIndex] = useState<number>();
  function mouseEnter(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    index: number
  ) {
    setX(event.clientX + 5);
    setY(event.clientY + 5);
    setShow(true);
    setShowItem(userItems[index]);
  }

  function useItem() {
    if (chosenItemIndex === undefined) return;
    const item = userItems[chosenItemIndex];
    if (!item.available) return;
    gameService.useItem(item.id).then((res) => {
      updatePlayerInfo();
      addLog(res.data.data);
      setChosenItemIndex(undefined);
    });
  }
  function dropItem() {
    if (chosenItemIndex === undefined) return;
    const item = userItems[chosenItemIndex];
    gameService.drop(userItems[chosenItemIndex].id).then(() => {
      updatePlayerInfo();
      updateRoomInfo();
      addLog(`你丢下了 ${item.name}`);
      setChosenItemIndex(undefined);
    });
  }
  return (
    <div className="user-bag">
      <div className="bag-buttons">
        <Button
          type="primary"
          disabled={
            chosenItemIndex === undefined ||
            !userItems[chosenItemIndex].available
          }
          block
          onClick={useItem}
        >
          使用
        </Button>
        <Button
          disabled={chosenItemIndex === undefined}
          block
          onClick={dropItem}
        >
          丢下
        </Button>
      </div>
      <Typography.Title level={4}>
        负重：{weight} / {capacity}
      </Typography.Title>
      <List
        className="bag-list"
        locale={{ emptyText: "你的背包空无一物" }}
        dataSource={userItems}
        renderItem={(item, index) => (
          <Popover
            placement="right"
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
            <List.Item
              key={index}
              className={`${index === chosenItemIndex ? "chosen" : ""}`}
              onClick={() => setChosenItemIndex(index)}
            >
              {item.name}
            </List.Item>
          </Popover>
        )}
      />
      <ItemInfoPanel item={showItem} x={x} y={y} show={show} />
    </div>
  );
}
