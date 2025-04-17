import { gradientColorMap } from "../globalStyles/DePara";
import styles from "../globalStyles/Table.module.css";
type TableProps = {
  objectColors: { [key: string]: string };
  onHoverClasses?: (hoveredClasses: string[] | null) => void;
};
export function Table({ objectColors, onHoverClasses }: TableProps) {
  const handleMouseEnter = (colorClass: string) => {
    const relatedColors = gradientColorMap[colorClass]
      ? gradientColorMap[colorClass]
      : [colorClass];

    if (onHoverClasses) onHoverClasses(relatedColors);
  };

  const handleMouseLeave = () => {
    if (onHoverClasses) onHoverClasses(null);
  };

  return (
    <div className={styles.contaynerTable2}>
      <table>
        <tbody>
          <tr>
            <td
              className={`${objectColors.A1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A1)}
              onMouseLeave={handleMouseLeave}
            >
              AA
            </td>
            <td
              className={`${objectColors.A2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A2)}
              onMouseLeave={handleMouseLeave}
            >
              AKs
            </td>
            <td
              className={`${objectColors.A3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A3)}
              onMouseLeave={handleMouseLeave}
            >
              AQs
            </td>
            <td
              className={`${objectColors.A4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A4)}
              onMouseLeave={handleMouseLeave}
            >
              AJs
            </td>
            <td
              className={`${objectColors.A5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A5)}
              onMouseLeave={handleMouseLeave}
            >
              ATs
            </td>
            <td
              className={`${objectColors.A6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A6)}
              onMouseLeave={handleMouseLeave}
            >
              A9s
            </td>
            <td
              className={`${objectColors.A7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A7)}
              onMouseLeave={handleMouseLeave}
            >
              A8s
            </td>
            <td
              className={`${objectColors.A8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A8)}
              onMouseLeave={handleMouseLeave}
            >
              A7s
            </td>
            <td
              className={`${objectColors.A9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A9)}
              onMouseLeave={handleMouseLeave}
            >
              A6s
            </td>
            <td
              className={`${objectColors.A10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A10)}
              onMouseLeave={handleMouseLeave}
            >
              A5s
            </td>
            <td
              className={`${objectColors.A11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A11)}
              onMouseLeave={handleMouseLeave}
            >
              A4s
            </td>
            <td
              className={`${objectColors.A12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A12)}
              onMouseLeave={handleMouseLeave}
            >
              A3s
            </td>
            <td
              className={`${objectColors.A13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.A13)}
              onMouseLeave={handleMouseLeave}
            >
              A2s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.B1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B1)}
              onMouseLeave={handleMouseLeave}
            >
              AKo
            </td>
            <td
              className={`${objectColors.B2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B2)}
              onMouseLeave={handleMouseLeave}
            >
              KK
            </td>
            <td
              className={`${objectColors.B3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B3)}
              onMouseLeave={handleMouseLeave}
            >
              KQs
            </td>
            <td
              className={`${objectColors.B4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B4)}
              onMouseLeave={handleMouseLeave}
            >
              KJs
            </td>
            <td
              className={`${objectColors.B5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B5)}
              onMouseLeave={handleMouseLeave}
            >
              KTs
            </td>
            <td
              className={`${objectColors.B6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B6)}
              onMouseLeave={handleMouseLeave}
            >
              K9s
            </td>
            <td
              className={`${objectColors.B7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B7)}
              onMouseLeave={handleMouseLeave}
            >
              K8s
            </td>
            <td
              className={`${objectColors.B8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B8)}
              onMouseLeave={handleMouseLeave}
            >
              K7s
            </td>
            <td
              className={`${objectColors.B9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B9)}
              onMouseLeave={handleMouseLeave}
            >
              K6s
            </td>
            <td
              className={`${objectColors.B10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B10)}
              onMouseLeave={handleMouseLeave}
            >
              K5s
            </td>
            <td
              className={`${objectColors.B11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B1)}
              onMouseLeave={handleMouseLeave}
            >
              K4s
            </td>
            <td
              className={`${objectColors.B12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B12)}
              onMouseLeave={handleMouseLeave}
            >
              K3s
            </td>
            <td
              className={`${objectColors.B13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.B13)}
              onMouseLeave={handleMouseLeave}
            >
              K2s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.C1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C1)}
              onMouseLeave={handleMouseLeave}
            >
              AQo
            </td>
            <td
              className={`${objectColors.C2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C2)}
              onMouseLeave={handleMouseLeave}
            >
              KQo
            </td>
            <td
              className={`${objectColors.C3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C3)}
              onMouseLeave={handleMouseLeave}
            >
              QQ
            </td>
            <td
              className={`${objectColors.C4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C4)}
              onMouseLeave={handleMouseLeave}
            >
              QJs
            </td>
            <td
              className={`${objectColors.C5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C5)}
              onMouseLeave={handleMouseLeave}
            >
              QTs
            </td>
            <td
              className={`${objectColors.C6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C6)}
              onMouseLeave={handleMouseLeave}
            >
              Q9s
            </td>
            <td
              className={`${objectColors.C7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C7)}
              onMouseLeave={handleMouseLeave}
            >
              Q8s
            </td>
            <td
              className={`${objectColors.C8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C8)}
              onMouseLeave={handleMouseLeave}
            >
              Q7s
            </td>
            <td
              className={`${objectColors.C9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C9)}
              onMouseLeave={handleMouseLeave}
            >
              Q6s
            </td>
            <td
              className={`${objectColors.C10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C10)}
              onMouseLeave={handleMouseLeave}
            >
              Q5s
            </td>
            <td
              className={`${objectColors.C11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C11)}
              onMouseLeave={handleMouseLeave}
            >
              Q4s
            </td>
            <td
              className={`${objectColors.C12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C12)}
              onMouseLeave={handleMouseLeave}
            >
              Q3s
            </td>
            <td
              className={`${objectColors.C13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.C13)}
              onMouseLeave={handleMouseLeave}
            >
              Q2s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.D1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D1)}
              onMouseLeave={handleMouseLeave}
            >
              AJo
            </td>
            <td
              className={`${objectColors.D2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D2)}
              onMouseLeave={handleMouseLeave}
            >
              KJo
            </td>
            <td
              className={`${objectColors.D3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D3)}
              onMouseLeave={handleMouseLeave}
            >
              QJo
            </td>
            <td
              className={`${objectColors.D4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D4)}
              onMouseLeave={handleMouseLeave}
            >
              JJ
            </td>
            <td
              className={`${objectColors.D5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D5)}
              onMouseLeave={handleMouseLeave}
            >
              JTs
            </td>
            <td
              className={`${objectColors.D6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D6)}
              onMouseLeave={handleMouseLeave}
            >
              J9s
            </td>
            <td
              className={`${objectColors.D7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D7)}
              onMouseLeave={handleMouseLeave}
            >
              J8s
            </td>
            <td
              className={`${objectColors.D8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D8)}
              onMouseLeave={handleMouseLeave}
            >
              J7s
            </td>
            <td
              className={`${objectColors.D9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D9)}
              onMouseLeave={handleMouseLeave}
            >
              J6s
            </td>
            <td
              className={`${objectColors.D10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D10)}
              onMouseLeave={handleMouseLeave}
            >
              J5s
            </td>
            <td
              className={`${objectColors.D11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D11)}
              onMouseLeave={handleMouseLeave}
            >
              J4s
            </td>
            <td
              className={`${objectColors.D12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D12)}
              onMouseLeave={handleMouseLeave}
            >
              J3s
            </td>
            <td
              className={`${objectColors.D13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.D13)}
              onMouseLeave={handleMouseLeave}
            >
              J2s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.E1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E1)}
              onMouseLeave={handleMouseLeave}
            >
              ATo
            </td>
            <td
              className={`${objectColors.E2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E2)}
              onMouseLeave={handleMouseLeave}
            >
              KTo
            </td>
            <td
              className={`${objectColors.E3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E3)}
              onMouseLeave={handleMouseLeave}
            >
              QTo
            </td>
            <td
              className={`${objectColors.E4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E4)}
              onMouseLeave={handleMouseLeave}
            >
              JTo
            </td>
            <td
              className={`${objectColors.E5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E5)}
              onMouseLeave={handleMouseLeave}
            >
              TT
            </td>
            <td
              className={`${objectColors.E6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E6)}
              onMouseLeave={handleMouseLeave}
            >
              T9s
            </td>
            <td
              className={`${objectColors.E7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E7)}
              onMouseLeave={handleMouseLeave}
            >
              T8s
            </td>
            <td
              className={`${objectColors.E8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E8)}
              onMouseLeave={handleMouseLeave}
            >
              T7s
            </td>
            <td
              className={`${objectColors.E9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E9)}
              onMouseLeave={handleMouseLeave}
            >
              T6s
            </td>
            <td
              className={`${objectColors.E10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E10)}
              onMouseLeave={handleMouseLeave}
            >
              T5s
            </td>
            <td
              className={`${objectColors.E11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E11)}
              onMouseLeave={handleMouseLeave}
            >
              T4s
            </td>
            <td
              className={`${objectColors.E12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E12)}
              onMouseLeave={handleMouseLeave}
            >
              T3s
            </td>
            <td
              className={`${objectColors.E13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.E13)}
              onMouseLeave={handleMouseLeave}
            >
              T2s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.F1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F1)}
              onMouseLeave={handleMouseLeave}
            >
              A9o
            </td>
            <td
              className={`${objectColors.F2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F2)}
              onMouseLeave={handleMouseLeave}
            >
              K9o
            </td>
            <td
              className={`${objectColors.F3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F3)}
              onMouseLeave={handleMouseLeave}
            >
              Q9o
            </td>
            <td
              className={`${objectColors.F4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F4)}
              onMouseLeave={handleMouseLeave}
            >
              J9o
            </td>
            <td
              className={`${objectColors.F5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F5)}
              onMouseLeave={handleMouseLeave}
            >
              T9o
            </td>
            <td
              className={`${objectColors.F6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F6)}
              onMouseLeave={handleMouseLeave}
            >
              99
            </td>
            <td
              className={`${objectColors.F7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F7)}
              onMouseLeave={handleMouseLeave}
            >
              98s
            </td>
            <td
              className={`${objectColors.F8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F8)}
              onMouseLeave={handleMouseLeave}
            >
              97s
            </td>
            <td
              className={`${objectColors.F9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F9)}
              onMouseLeave={handleMouseLeave}
            >
              96s
            </td>
            <td
              className={`${objectColors.F10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F10)}
              onMouseLeave={handleMouseLeave}
            >
              95s
            </td>
            <td
              className={`${objectColors.F11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F11)}
              onMouseLeave={handleMouseLeave}
            >
              94s
            </td>
            <td
              className={`${objectColors.F12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F12)}
              onMouseLeave={handleMouseLeave}
            >
              93s
            </td>
            <td
              className={`${objectColors.F13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.F13)}
              onMouseLeave={handleMouseLeave}
            >
              92s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.G1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G1)}
              onMouseLeave={handleMouseLeave}
            >
              A8o
            </td>
            <td
              className={`${objectColors.G2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G2)}
              onMouseLeave={handleMouseLeave}
            >
              K8o
            </td>
            <td
              className={`${objectColors.G3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G3)}
              onMouseLeave={handleMouseLeave}
            >
              Q8o
            </td>
            <td
              className={`${objectColors.G4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G4)}
              onMouseLeave={handleMouseLeave}
            >
              J8o
            </td>
            <td
              className={`${objectColors.G5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G5)}
              onMouseLeave={handleMouseLeave}
            >
              T8o
            </td>
            <td
              className={`${objectColors.G6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G6)}
              onMouseLeave={handleMouseLeave}
            >
              98o
            </td>
            <td
              className={`${objectColors.G7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G7)}
              onMouseLeave={handleMouseLeave}
            >
              88
            </td>
            <td
              className={`${objectColors.G8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G8)}
              onMouseLeave={handleMouseLeave}
            >
              87s
            </td>
            <td
              className={`${objectColors.G9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G9)}
              onMouseLeave={handleMouseLeave}
            >
              86s
            </td>
            <td
              className={`${objectColors.G10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G10)}
              onMouseLeave={handleMouseLeave}
            >
              85s
            </td>
            <td
              className={`${objectColors.G11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G11)}
              onMouseLeave={handleMouseLeave}
            >
              84s
            </td>
            <td
              className={`${objectColors.G12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G12)}
              onMouseLeave={handleMouseLeave}
            >
              83s
            </td>
            <td
              className={`${objectColors.G13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.G13)}
              onMouseLeave={handleMouseLeave}
            >
              82s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.H1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H1)}
              onMouseLeave={handleMouseLeave}
            >
              A7o
            </td>
            <td
              className={`${objectColors.H2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H2)}
              onMouseLeave={handleMouseLeave}
            >
              K7o
            </td>
            <td
              className={`${objectColors.H3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H3)}
              onMouseLeave={handleMouseLeave}
            >
              Q7o
            </td>
            <td
              className={`${objectColors.H4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H4)}
              onMouseLeave={handleMouseLeave}
            >
              J7o
            </td>
            <td
              className={`${objectColors.H5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H5)}
              onMouseLeave={handleMouseLeave}
            >
              T7o
            </td>
            <td
              className={`${objectColors.H6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H6)}
              onMouseLeave={handleMouseLeave}
            >
              97o
            </td>
            <td
              className={`${objectColors.H7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H7)}
              onMouseLeave={handleMouseLeave}
            >
              87o
            </td>
            <td
              className={`${objectColors.H8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H8)}
              onMouseLeave={handleMouseLeave}
            >
              77
            </td>
            <td
              className={`${objectColors.H9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H9)}
              onMouseLeave={handleMouseLeave}
            >
              76s
            </td>
            <td
              className={`${objectColors.H10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H10)}
              onMouseLeave={handleMouseLeave}
            >
              75s
            </td>
            <td
              className={`${objectColors.H11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H11)}
              onMouseLeave={handleMouseLeave}
            >
              74s
            </td>
            <td
              className={`${objectColors.H12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H12)}
              onMouseLeave={handleMouseLeave}
            >
              73s
            </td>
            <td
              className={`${objectColors.H13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.H13)}
              onMouseLeave={handleMouseLeave}
            >
              72s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.I1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I1)}
              onMouseLeave={handleMouseLeave}
            >
              A6o
            </td>
            <td
              className={`${objectColors.I2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I2)}
              onMouseLeave={handleMouseLeave}
            >
              K6o
            </td>
            <td
              className={`${objectColors.I3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I3)}
              onMouseLeave={handleMouseLeave}
            >
              Q6o
            </td>
            <td
              className={`${objectColors.I4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I4)}
              onMouseLeave={handleMouseLeave}
            >
              J6o
            </td>
            <td
              className={`${objectColors.I5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I5)}
              onMouseLeave={handleMouseLeave}
            >
              T6o
            </td>
            <td
              className={`${objectColors.I6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I6)}
              onMouseLeave={handleMouseLeave}
            >
              96o
            </td>
            <td
              className={`${objectColors.I7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I7)}
              onMouseLeave={handleMouseLeave}
            >
              86o
            </td>
            <td
              className={`${objectColors.I8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I8)}
              onMouseLeave={handleMouseLeave}
            >
              76o
            </td>
            <td
              className={`${objectColors.I9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I9)}
              onMouseLeave={handleMouseLeave}
            >
              66
            </td>
            <td
              className={`${objectColors.I10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I10)}
              onMouseLeave={handleMouseLeave}
            >
              65s
            </td>
            <td
              className={`${objectColors.I11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I11)}
              onMouseLeave={handleMouseLeave}
            >
              64s
            </td>
            <td
              className={`${objectColors.I12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I12)}
              onMouseLeave={handleMouseLeave}
            >
              63s
            </td>
            <td
              className={`${objectColors.I13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.I13)}
              onMouseLeave={handleMouseLeave}
            >
              62s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.J1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J1)}
              onMouseLeave={handleMouseLeave}
            >
              A5o
            </td>
            <td
              className={`${objectColors.J2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J2)}
              onMouseLeave={handleMouseLeave}
            >
              K5o
            </td>
            <td
              className={`${objectColors.J3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J3)}
              onMouseLeave={handleMouseLeave}
            >
              Q5o
            </td>
            <td
              className={`${objectColors.J4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J4)}
              onMouseLeave={handleMouseLeave}
            >
              J5o
            </td>
            <td
              className={`${objectColors.J5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J5)}
              onMouseLeave={handleMouseLeave}
            >
              T5o
            </td>
            <td
              className={`${objectColors.J6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J6)}
              onMouseLeave={handleMouseLeave}
            >
              95o
            </td>
            <td
              className={`${objectColors.J7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J7)}
              onMouseLeave={handleMouseLeave}
            >
              85o
            </td>
            <td
              className={`${objectColors.J8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J8)}
              onMouseLeave={handleMouseLeave}
            >
              75o
            </td>
            <td
              className={`${objectColors.J9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J9)}
              onMouseLeave={handleMouseLeave}
            >
              65o
            </td>
            <td
              className={`${objectColors.J10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J10)}
              onMouseLeave={handleMouseLeave}
            >
              55
            </td>
            <td
              className={`${objectColors.J11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J11)}
              onMouseLeave={handleMouseLeave}
            >
              54s
            </td>
            <td
              className={`${objectColors.J12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J12)}
              onMouseLeave={handleMouseLeave}
            >
              53s
            </td>
            <td
              className={`${objectColors.J13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.J13)}
              onMouseLeave={handleMouseLeave}
            >
              52s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.K1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K1)}
              onMouseLeave={handleMouseLeave}
            >
              A4o
            </td>
            <td
              className={`${objectColors.K2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K2)}
              onMouseLeave={handleMouseLeave}
            >
              K4o
            </td>
            <td
              className={`${objectColors.K3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K3)}
              onMouseLeave={handleMouseLeave}
            >
              Q4o
            </td>
            <td
              className={`${objectColors.K4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K4)}
              onMouseLeave={handleMouseLeave}
            >
              J4o
            </td>
            <td
              className={`${objectColors.K5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K5)}
              onMouseLeave={handleMouseLeave}
            >
              T4o
            </td>
            <td
              className={`${objectColors.K6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K6)}
              onMouseLeave={handleMouseLeave}
            >
              94o
            </td>
            <td
              className={`${objectColors.K7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K7)}
              onMouseLeave={handleMouseLeave}
            >
              84o
            </td>
            <td
              className={`${objectColors.K8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K8)}
              onMouseLeave={handleMouseLeave}
            >
              74o
            </td>
            <td
              className={`${objectColors.K9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K9)}
              onMouseLeave={handleMouseLeave}
            >
              64o
            </td>
            <td
              className={`${objectColors.K10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K10)}
              onMouseLeave={handleMouseLeave}
            >
              54o
            </td>
            <td
              className={`${objectColors.K11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K11)}
              onMouseLeave={handleMouseLeave}
            >
              44
            </td>
            <td
              className={`${objectColors.K12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K12)}
              onMouseLeave={handleMouseLeave}
            >
              43s
            </td>
            <td
              className={`${objectColors.K13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.K3)}
              onMouseLeave={handleMouseLeave}
            >
              42s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.L1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L1)}
              onMouseLeave={handleMouseLeave}
            >
              A3o
            </td>
            <td
              className={`${objectColors.L2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L2)}
              onMouseLeave={handleMouseLeave}
            >
              K3o
            </td>
            <td
              className={`${objectColors.L3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L3)}
              onMouseLeave={handleMouseLeave}
            >
              Q3o
            </td>
            <td
              className={`${objectColors.L4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L4)}
              onMouseLeave={handleMouseLeave}
            >
              J3o
            </td>
            <td
              className={`${objectColors.L5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L5)}
              onMouseLeave={handleMouseLeave}
            >
              T3o
            </td>
            <td
              className={`${objectColors.L6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L6)}
              onMouseLeave={handleMouseLeave}
            >
              93o
            </td>
            <td
              className={`${objectColors.L7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L7)}
              onMouseLeave={handleMouseLeave}
            >
              83o
            </td>
            <td
              className={`${objectColors.L8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L8)}
              onMouseLeave={handleMouseLeave}
            >
              73o
            </td>
            <td
              className={`${objectColors.L9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L9)}
              onMouseLeave={handleMouseLeave}
            >
              63o
            </td>
            <td
              className={`${objectColors.L10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L10)}
              onMouseLeave={handleMouseLeave}
            >
              53o
            </td>
            <td
              className={`${objectColors.L11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L11)}
              onMouseLeave={handleMouseLeave}
            >
              43o
            </td>
            <td
              className={`${objectColors.L12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L12)}
              onMouseLeave={handleMouseLeave}
            >
              33
            </td>
            <td
              className={`${objectColors.L13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.L13)}
              onMouseLeave={handleMouseLeave}
            >
              32s
            </td>
          </tr>
          <tr>
            <td
              className={`${objectColors.M1 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M1)}
              onMouseLeave={handleMouseLeave}
            >
              A2o
            </td>
            <td
              className={`${objectColors.M2 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M2)}
              onMouseLeave={handleMouseLeave}
            >
              K2o
            </td>
            <td
              className={`${objectColors.M3 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M3)}
              onMouseLeave={handleMouseLeave}
            >
              Q2o
            </td>
            <td
              className={`${objectColors.M4 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M4)}
              onMouseLeave={handleMouseLeave}
            >
              J2o
            </td>
            <td
              className={`${objectColors.M5 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M5)}
              onMouseLeave={handleMouseLeave}
            >
              T2o
            </td>
            <td
              className={`${objectColors.M6 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M6)}
              onMouseLeave={handleMouseLeave}
            >
              92o
            </td>
            <td
              className={`${objectColors.M7 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M7)}
              onMouseLeave={handleMouseLeave}
            >
              82o
            </td>
            <td
              className={`${objectColors.M8 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M8)}
              onMouseLeave={handleMouseLeave}
            >
              72o
            </td>
            <td
              className={`${objectColors.M9 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M9)}
              onMouseLeave={handleMouseLeave}
            >
              62o
            </td>
            <td
              className={`${objectColors.M10 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M10)}
              onMouseLeave={handleMouseLeave}
            >
              52o
            </td>
            <td
              className={`${objectColors.M11 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M11)}
              onMouseLeave={handleMouseLeave}
            >
              42o
            </td>
            <td
              className={`${objectColors.M12 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M12)}
              onMouseLeave={handleMouseLeave}
            >
              32o
            </td>
            <td
              className={`${objectColors.M13 || styles.defaultStyle} ${
                styles.defaultCelula
              }`}
              onMouseEnter={() => handleMouseEnter(objectColors.M13)}
              onMouseLeave={handleMouseLeave}
            >
              22
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
