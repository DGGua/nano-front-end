import { forwardRef, useEffect, useRef, useState } from "react";
import { Item } from "../../types/gameType";
import "./itemInfoPanel.scss";
interface ItemInfoPanelProps {
  item?: Item;
  show: boolean;
  x: number;
  y: number;
}
const ItemInfoPanel = forwardRef(
  (props: ItemInfoPanelProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { item, show, x, y } = props;
    const [entered, setEntered] = useState(false);

    return (
      <div
        className="item-info-panel"
        style={{
          left: x,
          top: y,
          visibility: show || entered ? "visible" : "hidden",
        }}
        onMouseEnter={() => setEntered(true)}
        onMouseLeave={() => setEntered(false)}
        ref={ref}
      >
        <div className="item-info-panel-header">
          <h3>{item?.name}</h3>
          {item?.available ? <i>可使用</i> : null}
          <p>{item?.weight}</p>
        </div>
      </div>
    );
  }
);

export default ItemInfoPanel;
