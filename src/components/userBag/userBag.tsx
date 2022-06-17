import {
  DetailedHTMLProps,
  DOMAttributes,
  HTMLAttributes,
  useState,
} from "react";
import { useLog } from "../../hooks/useLog";
import usePlayerData from "../../hooks/usePlayerData";
import { gameService } from "../../services/gameService";
import { Item, PlayerInfo } from "../../types/gameType";
import "./userBag.scss";

function ItemComp(props: {
  item: Item;
  className: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { item, className, onClick, onMouseEnter, onMouseLeave } = props;
  return (
    <div
      className={"bag-item " + className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{item.name}</span>
      <span>{`重量：${item.weight}`}</span>
    </div>
  );
}

export function UserBag() {
  const { addLog } = useLog();
  const { playerInfo, updatePlayerInfo } = usePlayerData();
  const {
    bearing_capacity: capacity,
    cur_weight: weight,
    userItems,
  } = playerInfo;
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showText, setShowText] = useState("");
  const [chosenItemIndex, setChosenItemIndex] = useState<number>();
  function mouseEnter(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    index: number
  ) {
    setX(event.clientX + 5 + "px");
    setY(event.clientY + 5 + "px");
    setShow(true);
    setShowText(userItems[index].name);
  }

  function useItem() {
    if (chosenItemIndex === undefined) return;
    const item = userItems[chosenItemIndex];
    if (!item.available) return;
    gameService.useItem(item.id).then((res) => {
      updatePlayerInfo();
      addLog(res.data.data);
    });
  }
  function dropItem() {
    if (chosenItemIndex === undefined) return;
    const item = userItems[chosenItemIndex];
    gameService.drop(userItems[chosenItemIndex].id).then(() => {
      updatePlayerInfo();
      addLog(`你丢下了 ${item.name}`);
    });
  }
  return (
    <>
      <div className="bag-buttons">
        <button onClick={useItem}>使用</button>
        <button onClick={dropItem}>丢下</button>
        <div>
          最大重量：{capacity} 当前重量：{weight}
        </div>
      </div>
      <div className="bag-list" onScroll={() => setShow(false)}>
        {userItems.map((item, index) => {
          return (
            <ItemComp
              item={item}
              className={`${index === chosenItemIndex ? "chosen" : ""}`}
              onClick={() => {
                setChosenItemIndex(index);
              }}
              onMouseEnter={(event) => mouseEnter(event, index)}
              onMouseLeave={() => {
                setShow(false);
              }}
            ></ItemComp>
          );
        })}
      </div>

      <div
        className="toast"
        style={{
          left: x,
          top: y,
          display: show ? "block" : "none",
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        {showText}
      </div>
    </>
  );
}
