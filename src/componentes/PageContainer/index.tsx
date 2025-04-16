import Style from "./style.module.css"
import { useEffect, useState } from "react";
import { Table } from "../../componentes/Table";
// import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import style from "../../componentes/globalStyles/Table.module.css"
import { Legend } from "../../componentes/Legend";
import { useNavigate } from "react-router-dom";

type Props = {
	json: any;
};

export const PageContainer = ({json}:Props) => {
  function mapStyleKeys(styles: Record<string, string>, styleModule: Record<string, string>) {
    const mapped: Record<string, string> = {};
    for (const key in styles) {
      mapped[key] = styleModule[styles[key]] || styles[key];
    }
    return mapped;
  }
  
  // type RawObjectsColors = typeof json;
  type RawObjectsColors = Record<string, any>;;
  type RawPositionKey = keyof RawObjectsColors;
  
  function mapObjectsColors(jsonData: RawObjectsColors, styleModule: typeof style) {
    const mappedData: Record<string, any> = {};
  
    (Object.keys(jsonData) as RawPositionKey[]).forEach((position) => {
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
    });
  
    return mappedData;
  }
  const objectsColors = mapObjectsColors(json, style);
  const navigate = useNavigate();
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
      const selectedBlind = objectsColors[position]?.blinds.find((b:{id:string}) => b.id === blind);
      if (selectedBlind) {
        setObjectColors(selectedBlind);
      } else {
        setObjectColors({});
      }
    }, [blind, position]);
 return (
  <div className={Style.home} style={{backgroundColor:"#ece9e9"}}>
  <div className={Style.body}>
    <div className={Style.menuEOptions}>
      <div className={Style.menuOptions}>
        <div className={Style.menuOptionsbox}>
          {Object.keys(objectsColors).map((pos) => (
            <button
              key={pos}
              className={ position == pos ? Style.buttonPositionSelected:Style.buttonPosition}
              onClick={() => setPosition(pos as PositionKey)}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

    </div>
    <div className={Style.bodyConteudo}>
      <div className={Style.menuBlinds}>
        {listBlinds.map(
          (item: { id: string; name: string; styles?: any }) => (
            <button
              key={item.id}
              className={blind === item.id ? Style.buttonBlindsSelected : Style.buttonBlinds}
              onClick={() => setBlind(item.id)}
              style={{ backgroundColor: item.styles?.A1 || undefined }}
            >
              {item.name}
            </button>
          )
        )}
        <span className={Style.positionTitleVoltar} onClick={()=>navigate("/Home")}>Voltar</span>
      </div>
      <span className={Style.positionTitle}>{position}</span>
      <div className={Style.containerTable}>
        <Table objectColors={objectColors.styles || {}} />
        <Legend objectLegends = {objectColors.legends||null}/>
      </div>
    </div>
  </div>
</div>
 );
};