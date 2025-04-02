import { useEffect, useState } from "react";
import { Table } from "../../componentes/Table";
import { objectsColors } from "../../componentes/globalStyles";
import Style from "./home.module.css"

export function Home() {
  type PositionKey = keyof typeof objectsColors;
  const [position, setPosition] = useState<PositionKey>(Object.keys(objectsColors)[0] as PositionKey);
  const [listBlinds, setListBlinds] = useState(objectsColors[position]?.blinds || []);
  const [blind, setBlind] = useState(listBlinds[0]?.id || "");
  const [objectColors, setObjectColors] = useState(listBlinds[0]?.styles || {});

  useEffect(() => {
    const blinds = objectsColors[position]?.blinds || [];
    setListBlinds(blinds);
    setBlind(blinds[0]?.id || "");
  }, [position]);

  useEffect(() => {
    const selectedBlind = objectsColors[position]?.blinds.find((b) => b.id === blind);
    if (selectedBlind) {
      setObjectColors(selectedBlind.styles);
    } else {
      setObjectColors({});
    }
  }, [blind, position]);

  return (
    <div className="home">
      <div className={Style.body}>
        <div className={Style.menuOptions}>
          {Object.keys(objectsColors).map((pos) => (
            <button
              key={pos}
              className={Style.buttonPosition}
              onClick={() => setPosition(pos as PositionKey)}
            >
              {pos}
            </button>
          ))}
        </div>
        <div className={Style.bodyConteudo}>
          <div className={Style.menuBlinds}>
            {listBlinds.map((blind) => (
              <button
                key={blind.id}
                className={Style.buttonBlinds}
                onClick={() => setBlind(blind.id)}
                style={{ backgroundColor: blind.styles?.A1 || undefined }}
              >
                {blind.name}
              </button>
            ))}
          </div>
          <div>
            <Table objectColors={objectColors} />
          </div>
        </div>
      </div>
    </div>
  );
}
