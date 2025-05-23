import Style from "./style.module.css"
import { useEffect, useRef, useState } from "react";
import { Table } from "../../componentes/Table";
// import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import style from "../../componentes/globalStyles/Table.module.css"
import { Legend } from "../../componentes/Legend";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { updateDinamico } from "../../Server/update";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slices";
import { saveUserSession } from "../../utils/saveUser";
import { getGrupoRelacionado } from "./utils";
// import Cookies from "js-cookie";


type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	json: any;
};

export const PageContainer = ({json}:Props) => {

  const dispatch = useDispatch();


  const didMountRef = useRef(false);


  const [highlightedClasses, setHighlightedClasses] = useState<string[] | null>(null);



  function mapStyleKeys(styles: Record<string, string>, styleModule: Record<string, string>) {
    const mapped: Record<string, string> = {};
    for (const key in styles) {
      mapped[key] = styleModule[styles[key]] || styles[key];
    }
    return mapped;
  }
  
  // type RawObjectsColors = typeof json;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type RawObjectsColors = Record<string, any>;;
  type RawPositionKey = keyof RawObjectsColors;
  
  function mapObjectsColors(jsonData: RawObjectsColors, styleModule: typeof style) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedData: Record<string, any> = {};
  
    (Object.keys(jsonData) as RawPositionKey[]).forEach((position) => {
      mappedData[position] = {
        ...jsonData[position],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        blinds: jsonData[position].blinds.map((blind: any) => ({
          ...blind,
          styles: mapStyleKeys(blind.styles, styleModule),
          legends: blind.legends
            ? {
                ...blind.legends,
                values: Object.fromEntries(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);
  
    useEffect(() => {
      const selectedBlind = objectsColors[position]?.blinds.find((b:{id:string}) => b.id === blind);
      if (selectedBlind) {
        setObjectColors(selectedBlind);
      } else {
        setObjectColors({});
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blind, position]);

    const userData = useSelector((state: RootState) => state.user.userData);

    const [ dinamico,setDinamico]=useState(userData?.dinamico ?? true)



    useEffect(()=>{
      if(userData){
        setDinamico(userData.dinamico)
      }
    },[userData])


    useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }
    
      if (userData && userData.dinamico !== dinamico) {
        const updatedUser = { ...userData, dinamico };
    
        updateDinamico(userData.id, dinamico)
          .then(() => {
            dispatch(setUserData(updatedUser));
            saveUserSession(
              updatedUser,
              localStorage.getItem("levelAccess") || "",
              true
            );
          })
          .catch((err) => console.error("Erro ao atualizar dinamico:", err));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dinamico]);
    
    
    

 return (
  <div className={Style.home} style={{backgroundColor:"#ece9e9"}}>
  <div className={Style.body}>
    <div className={Style.menuEOptions}>
      <div className={Style.menuOptions}>
        <div className={Style.menuOptionsbox}>
          {Object.keys(objectsColors).map((pos) => (
            <button
              key={pos}
              className={ position == pos ? Style.buttonPositionSelected: getGrupoRelacionado(position,pos)?Style.family:Style.buttonPosition}
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: { id: string; name: string; styles?: any }) => (
            <button
              key={item.id}
              className={blind === item.id ? Style.buttonBlindsSelected:Style.buttonBlinds}
              onClick={() => setBlind(item.id)}
              style={{ backgroundColor: item.styles?.A1 || undefined }}
            >
              {item.name}
            </button>
          )
        )}
        <span className={Style.positionTitleVoltar} onClick={()=>navigate("/Home")}>Back</span>
      </div>
      <span className={Style.positionTitle}>{position}</span>
      <div className={Style.containerTable}>
        <Table onHoverClasses={setHighlightedClasses} objectColors={objectColors.styles||{}}/>
        <Legend dinamico={dinamico} setDinamico={()=>{setDinamico(!dinamico)}} highlightedClasses={highlightedClasses} objectLegends={objectColors.legends||null}/>
      </div>
    </div>
  </div>
</div>
 );
};