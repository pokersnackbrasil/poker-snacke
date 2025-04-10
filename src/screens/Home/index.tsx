import { useEffect, useState } from "react";
import { Table } from "../../componentes/Table";
import Style from "./home.module.css";
import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import style from "../../componentes/globalStyles/Table.module.css"
import { Legend } from "../../componentes/Legend";
import CabecalhoVerde from "../../componentes/CabecalhoVerde";


function mapStyleKeys(styles: Record<string, string>, styleModule: Record<string, string>) {
  const mapped: Record<string, string> = {};
  for (const key in styles) {
    mapped[key] = styleModule[styles[key]] || styles[key];
  }
  return mapped;
}

type RawObjectsColors = typeof rawObjectsColors;
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
    const selectedBlind = objectsColors[position]?.blinds.find((b:{id:string}) => b.id === blind);
    if (selectedBlind) {
      setObjectColors(selectedBlind);
    } else {
      setObjectColors({});
    }
  }, [blind, position]);

  // const [color,setColor]=useState("#fff")
  // const listColor = ["#ffffff","#1C1C1E","#292D32","#232323","#31353D","#181818","#2B2B2B","#98989e54"]



  return (
    <div className={Style.home} style={{backgroundColor:"#ece9e9"}}>
      <CabecalhoVerde />
      {/* <div style={{height:"1rem", width:"100%", display:'flex',flexDirection:'row', justifyContent:'flex-start',gap:'0.5rem'}}>
        {listColor.map((color)=>{
          return <span onClick={()=>setColor(color)} style={{backgroundColor:color ,width: "1rem",height:"1rem"}}></span>
        })}
      </div> */}
      <div className={Style.body}>
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
          </div>
          <div className={Style.containerTable}>
            <Table objectColors={objectColors.styles || {}} />
            <Legend objectLegends = {objectColors.legends||null}/>
          </div>
        </div>
      </div>
    </div>
  );
}