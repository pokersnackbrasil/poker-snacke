import styles from "../globalStyles/Table.module.css";
type LegendProps = {
 objectLegends: {
   legend: string;
   values: {
     id: string;
     color: string;
     text1: string;
     text2: string;
   }[];
 };
 highlightedClasses?: string[] | null;
 dinamico:boolean;
 setDinamico:()=>void;
};
export function Legend ({objectLegends,highlightedClasses,dinamico,setDinamico}: LegendProps) {
  console.log("highlightedClasses: ",highlightedClasses)
  
 if(objectLegends === null) {
   return <div>Loading...</div>; 
 }else if(objectLegends !== null) {
  const values = Array.isArray(objectLegends.values)
    ? objectLegends.values
    : Object.values(objectLegends.values) as { id: string; color: string; text1: string; text2: string }[];
  const isHighlighted = (color: string) => {
    if(color){
      return highlightedClasses?.includes(color.match(/_(.+?)_[^_]*/)?.[1]||"")
    }
  };

  
  return (
    <div className={styles.legenda}>
      <div className={styles.titleLegenda}>
        <span>Legendas</span>
        <span style={{fontSize:'1rem', color:"#11110f"}}>
          DINAMICO <input type="checkbox" checked={dinamico}  style={{cursor:'pointer'}} onChange={() => setDinamico()}/>
        </span>
      </div>
      <div>
        {values != null
          ? values.map((legend) => (
              <>
                {dinamico ? (
                  <div
                    key={legend.id}
                    className={`${legend.color || styles.defaultStyle} ${
                      styles.defaultCelulaLegenda
                    }`}
                    style={{
                      transform: isHighlighted(legend.color)
                        ? "scale(1.2)"
                        : "scale(1)",
                      transition: "transform 0.2s ease-in-out",
                      zIndex: isHighlighted(legend.color) ? 999 : "auto",
                    }}
                  >
                    <p>{legend.text1}</p>
                    <p>{legend.text2}</p>
                  </div>
                ) : (
                  <div
                    key={legend.id}
                    style={{cursor:"none"}}
                    className={`${legend.color || styles.defaultStyle} ${
                      styles.defaultCelulaLegenda
                    }`}
                  >
                    <p>{legend.text1}</p>
                    <p>{legend.text2}</p>
                  </div>
                )}
              </>
            ))
          : null}
      </div>
      <div className={styles.titleFooter}>
        <p>{objectLegends.legend}</p>
      </div>
    </div>
  );
 }
}