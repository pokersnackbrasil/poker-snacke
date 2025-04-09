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
};
export function Legend ({objectLegends}: LegendProps) {
 if(objectLegends === null) {
   return <div>Loading...</div>; 
 }else if(objectLegends !== null) {
  const values = Array.isArray(objectLegends.values)
    ? objectLegends.values
    : Object.values(objectLegends.values) as { id: string; color: string; text1: string; text2: string }[];
  return (
    <div className={styles.legenda}>
      <div className={styles.titleLegenda}>
        <span>Legendas</span>
      </div>
      <div>
        {values != null
          ? values.map((legend) => (
              <div 
               key={legend.id} 
               className={`${legend.color || styles.defaultStyle} ${styles.defaultCelulaLegenda}`
             }>
                <p>{legend.text1}</p>
                <p>{legend.text2}</p>
              </div>
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