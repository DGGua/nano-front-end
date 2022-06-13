import { useState } from "react";
import "./userBag.scss";

type UserBagProps = {
  userItems: string[];
};
export function UserBag(props: UserBagProps) {
  const { userItems } = props;
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showText, setShowText] = useState("");
  function mouseEnter(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    index: number
  ) {
    setX(event.clientX + "px");
    setY(event.clientY + "px");
    setShow(true);
    setShowText(userItems[index]);
  }
  return (
    <>
      <div className="bag-list">
        {userItems.map((item, index) => {
          return (
            <p
              onMouseEnter={(event) => mouseEnter(event, index)}
              onMouseLeave={() => {
                setShow(false);
              }}
            >
              {item}
            </p>
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
