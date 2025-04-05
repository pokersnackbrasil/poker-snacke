import { useEffect, useState } from "react";
import { Table } from "../../componentes/Table";
import Style from "./home.module.css";
import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import style from "../../componentes/globalStyles/Table.module.css"
import { Legend } from "../../componentes/Legend";


function mapStyleKeys(styles: Record<string, string>, styleModule: Record<string, string>) {
  const mapped: Record<string, string> = {};
  for (const key in styles) {
    mapped[key] = styleModule[styles[key]] || styles[key];
  }
  return mapped;
}

function mapObjectsColors(jsonData: typeof rawObjectsColors, styleModule: typeof style) {
  const mappedData: any = {};
  for (const position in jsonData) {
    mappedData[position] = {
      ...jsonData[position],
      blinds: jsonData[position].blinds.map((blind: any) => ({
        ...blind,
        styles: mapStyleKeys(blind.styles, styleModule),
        legends: blind.legends
          ? {
              ...blind.legends,
              values: Object.fromEntries(
                Object.entries(blind.legends.values).map(([key, val]: any) => [
                  key,
                  {
                    ...val,
                    color: styleModule[val.color] || val.color,
                  },
                ])
              ),
            }
          : undefined,
      })),
    };
  }
  return mappedData;
}

const objectsColors = mapObjectsColors(rawObjectsColors, style);

export function Home() {
  type PositionKey = keyof typeof objectsColors;
  const [position, setPosition] = useState<PositionKey>(Object.keys(objectsColors)[0] as PositionKey);
  const [listBlinds, setListBlinds] = useState(objectsColors[position]?.blinds || []);
  const [blind, setBlind] = useState(listBlinds[0]?.id || "");
  const [objectColors, setObjectColors] = useState(listBlinds[0] || {});

  useEffect(() => {
    const blinds = objectsColors[position]?.blinds || [];
    setListBlinds(blinds);
    setBlind(blinds[0]?.id || "");
  }, [position]);

  useEffect(() => {
    const selectedBlind = objectsColors[position]?.blinds.find((b) => b.id === blind);
    if (selectedBlind) {
      setObjectColors(selectedBlind);
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
            <Table objectColors={objectColors.styles || {}} />
            <Legend objectLegends = {objectColors.legends||null}/>
          </div>
        </div>
      </div>
    </div>
  );
}