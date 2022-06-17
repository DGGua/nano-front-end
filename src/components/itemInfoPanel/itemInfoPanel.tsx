import { useState } from "react";
import { Item } from "../../types/gameType";
import "./itemInfoPanel.scss";
interface ItemInfoPanelProps {
  item?: Item;
  show: boolean;
  x: number;
  y: number;
}
export default function ItemInfoPanel(props: ItemInfoPanelProps) {
  const { item, show, x, y } = props;
  const [entered, setEntered] = useState(false);

  return (
    <div
      className="item-info-panel"
      style={{
        left: x,
        top: y,
        display: show || entered ? "block" : "none",
      }}
      onMouseEnter={() => setEntered(true)}
      onMouseLeave={() => setEntered(false)}
    >
      <div className="item-info-panel-header">
        <h3>{item?.name}</h3>
        {item?.available ? <i>可使用</i> : null}
        <p>{item?.weight}</p>
      </div>
    </div>
  );
}
