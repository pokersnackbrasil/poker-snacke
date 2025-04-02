import styles from "../globalStyles/Table.module.css";
type TableProps = {
 objectColors: { [key: string]: string };
};
export function Table ({objectColors}: TableProps) {

 return (
  // <div>
  //  <div>
  //   <div>
  //    <div>
  //     <div>
       <div>
         <table>
            <thead>
               <tr>
                  <td className={`${objectColors.A1||styles.defaultStyle} ${styles.defaultCelula}`}>AA</td>
                  <td className={`${objectColors.A2||styles.defaultStyle} ${styles.defaultCelula}`}>AKs</td>
                  <td className={`${objectColors.A3||styles.defaultStyle} ${styles.defaultCelula}`}>AQs</td>
                  <td className={`${objectColors.A4||styles.defaultStyle} ${styles.defaultCelula}`}>AJs</td>
                  <td className={`${objectColors.A5||styles.defaultStyle} ${styles.defaultCelula}`}>ATs</td>
                  <td className={`${objectColors.A6||styles.defaultStyle} ${styles.defaultCelula}`}>A9s</td>
                  <td className={`${objectColors.A7||styles.defaultStyle} ${styles.defaultCelula}`}>A8s</td>
                  <td className={`${objectColors.A8||styles.defaultStyle} ${styles.defaultCelula}`}>A7s</td>
                  <td className={`${objectColors.A9||styles.defaultStyle} ${styles.defaultCelula}`}>A6s</td>
                  <td className={`${objectColors.A10||styles.defaultStyle} ${styles.defaultCelula}`}>A5s</td>
                  <td className={`${objectColors.A11||styles.defaultStyle} ${styles.defaultCelula}`}>A4s</td>
                  <td className={`${objectColors.A12||styles.defaultStyle} ${styles.defaultCelula}`}>A3s</td>
                  <td className={`${objectColors.A13||styles.defaultStyle} ${styles.defaultCelula}`}>A2s</td>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td className={`${objectColors.B1||styles.defaultStyle} ${styles.defaultCelula}`}>AKo</td>
                  <td className={`${objectColors.B2||styles.defaultStyle} ${styles.defaultCelula}`}>KK</td>
                  <td className={`${objectColors.B3||styles.defaultStyle} ${styles.defaultCelula}`}>KQs</td>
                  <td className={`${objectColors.B4||styles.defaultStyle} ${styles.defaultCelula}`}>KJs</td>
                  <td className={`${objectColors.B5||styles.defaultStyle} ${styles.defaultCelula}`}>KTs</td>
                  <td className={`${objectColors.B6||styles.defaultStyle} ${styles.defaultCelula}`}>K9s</td>
                  <td className={`${objectColors.B7||styles.defaultStyle} ${styles.defaultCelula}`}>K8s</td>
                  <td className={`${objectColors.B8||styles.defaultStyle} ${styles.defaultCelula}`}>K7s</td>
                  <td className={`${objectColors.B9||styles.defaultStyle} ${styles.defaultCelula}`}>K6s</td>
                  <td className={`${objectColors.B10||styles.defaultStyle} ${styles.defaultCelula}`}>K5s</td>
                  <td className={`${objectColors.B11||styles.defaultStyle} ${styles.defaultCelula}`}>K4s</td>
                  <td className={`${objectColors.B12||styles.defaultStyle} ${styles.defaultCelula}`}>K3s</td>
                  <td className={`${objectColors.B13||styles.defaultStyle} ${styles.defaultCelula}`}>K2s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.C1||styles.defaultStyle} ${styles.defaultCelula}`}>AQo</td>
                  <td className={`${objectColors.C2||styles.defaultStyle} ${styles.defaultCelula}`}>KQo</td>
                  <td className={`${objectColors.C3||styles.defaultStyle} ${styles.defaultCelula}`}>QQ</td>
                  <td className={`${objectColors.C4||styles.defaultStyle} ${styles.defaultCelula}`}>QJs</td>
                  <td className={`${objectColors.C5||styles.defaultStyle} ${styles.defaultCelula}`}>QTs</td>
                  <td className={`${objectColors.C6||styles.defaultStyle} ${styles.defaultCelula}`}>Q9s</td>
                  <td className={`${objectColors.C7||styles.defaultStyle} ${styles.defaultCelula}`}>Q8s</td>
                  <td className={`${objectColors.C8||styles.defaultStyle} ${styles.defaultCelula}`}>Q7s</td>
                  <td className={`${objectColors.C9||styles.defaultStyle} ${styles.defaultCelula}`}>Q6s</td>
                  <td className={`${objectColors.C10||styles.defaultStyle} ${styles.defaultCelula}`}>Q5s</td>
                  <td className={`${objectColors.C11||styles.defaultStyle} ${styles.defaultCelula}`}>Q4s</td>
                  <td className={`${objectColors.C12||styles.defaultStyle} ${styles.defaultCelula}`}>Q3s</td>
                  <td className={`${objectColors.C13||styles.defaultStyle} ${styles.defaultCelula}`}>Q2s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.D1||styles.defaultStyle} ${styles.defaultCelula}`}>AJo</td>
                  <td className={`${objectColors.D2||styles.defaultStyle} ${styles.defaultCelula}`}>KJo</td>
                  <td className={`${objectColors.D3||styles.defaultStyle} ${styles.defaultCelula}`}>QJo</td>
                  <td className={`${objectColors.D4||styles.defaultStyle} ${styles.defaultCelula}`}>JJ</td>
                  <td className={`${objectColors.D5||styles.defaultStyle} ${styles.defaultCelula}`}>JTs</td>
                  <td className={`${objectColors.D6||styles.defaultStyle} ${styles.defaultCelula}`}>J9s</td>
                  <td className={`${objectColors.D7||styles.defaultStyle} ${styles.defaultCelula}`}>J8s</td>
                  <td className={`${objectColors.D8||styles.defaultStyle} ${styles.defaultCelula}`}>J7s</td>
                  <td className={`${objectColors.D9||styles.defaultStyle} ${styles.defaultCelula}`}>J6s</td>
                  <td className={`${objectColors.D10||styles.defaultStyle} ${styles.defaultCelula}`}>J5s</td>
                  <td className={`${objectColors.D11||styles.defaultStyle} ${styles.defaultCelula}`}>J4s</td>
                  <td className={`${objectColors.D12||styles.defaultStyle} ${styles.defaultCelula}`}>J3s</td>
                  <td className={`${objectColors.D13||styles.defaultStyle} ${styles.defaultCelula}`}>J2s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.E1||styles.defaultStyle} ${styles.defaultCelula}`}>ATo</td>
                  <td className={`${objectColors.E2||styles.defaultStyle} ${styles.defaultCelula}`}>KTo</td>
                  <td className={`${objectColors.E3||styles.defaultStyle} ${styles.defaultCelula}`}>QTo</td>
                  <td className={`${objectColors.E4||styles.defaultStyle} ${styles.defaultCelula}`}>JTo</td>
                  <td className={`${objectColors.E5||styles.defaultStyle} ${styles.defaultCelula}`}>TT</td>
                  <td className={`${objectColors.E6||styles.defaultStyle} ${styles.defaultCelula}`}>T9s</td>
                  <td className={`${objectColors.E7||styles.defaultStyle} ${styles.defaultCelula}`}>T8s</td>
                  <td className={`${objectColors.E8||styles.defaultStyle} ${styles.defaultCelula}`}>T7s</td>
                  <td className={`${objectColors.E9||styles.defaultStyle} ${styles.defaultCelula}`}>T6s</td>
                  <td className={`${objectColors.E10||styles.defaultStyle} ${styles.defaultCelula}`}>T5s</td>
                  <td className={`${objectColors.E11||styles.defaultStyle} ${styles.defaultCelula}`}>T4s</td>
                  <td className={`${objectColors.E12||styles.defaultStyle} ${styles.defaultCelula}`}>T3s</td>
                  <td className={`${objectColors.E13||styles.defaultStyle} ${styles.defaultCelula}`}>T2s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.F1||styles.defaultStyle} ${styles.defaultCelula}`}>A9o</td>
                  <td className={`${objectColors.F2||styles.defaultStyle} ${styles.defaultCelula}`}>K9o</td>
                  <td className={`${objectColors.F3||styles.defaultStyle} ${styles.defaultCelula}`}>Q9o</td>
                  <td className={`${objectColors.F4||styles.defaultStyle} ${styles.defaultCelula}`}>J9o</td>
                  <td className={`${objectColors.F5||styles.defaultStyle} ${styles.defaultCelula}`}>T9o</td>
                  <td className={`${objectColors.F6||styles.defaultStyle} ${styles.defaultCelula}`}>99</td>
                  <td className={`${objectColors.F7||styles.defaultStyle} ${styles.defaultCelula}`}>98s</td>
                  <td className={`${objectColors.F8||styles.defaultStyle} ${styles.defaultCelula}`}>97s</td>
                  <td className={`${objectColors.F9||styles.defaultStyle} ${styles.defaultCelula}`}>96s</td>
                  <td className={`${objectColors.F10||styles.defaultStyle} ${styles.defaultCelula}`}>95s</td>
                  <td className={`${objectColors.F11||styles.defaultStyle} ${styles.defaultCelula}`}>94s</td>
                  <td className={`${objectColors.F12||styles.defaultStyle} ${styles.defaultCelula}`}>93s</td>
                  <td className={`${objectColors.F13||styles.defaultStyle} ${styles.defaultCelula}`}>92s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.G1||styles.defaultStyle} ${styles.defaultCelula}`}>A8o</td>
                  <td className={`${objectColors.G2||styles.defaultStyle} ${styles.defaultCelula}`}>K8o</td>
                  <td className={`${objectColors.G3||styles.defaultStyle} ${styles.defaultCelula}`}>Q8o</td>
                  <td className={`${objectColors.G4||styles.defaultStyle} ${styles.defaultCelula}`}>J8o</td>
                  <td className={`${objectColors.G5||styles.defaultStyle} ${styles.defaultCelula}`}>T8o</td>
                  <td className={`${objectColors.G6||styles.defaultStyle} ${styles.defaultCelula}`}>98o</td>
                  <td className={`${objectColors.G7||styles.defaultStyle} ${styles.defaultCelula}`}>88</td>
                  <td className={`${objectColors.G8||styles.defaultStyle} ${styles.defaultCelula}`}>87s</td>
                  <td className={`${objectColors.G9||styles.defaultStyle} ${styles.defaultCelula}`}>86s</td>
                  <td className={`${objectColors.G10||styles.defaultStyle} ${styles.defaultCelula}`}>85s</td>
                  <td className={`${objectColors.G11||styles.defaultStyle} ${styles.defaultCelula}`}>84s</td>
                  <td className={`${objectColors.G12||styles.defaultStyle} ${styles.defaultCelula}`}>83s</td>
                  <td className={`${objectColors.G13||styles.defaultStyle} ${styles.defaultCelula}`}>82s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.H1||styles.defaultStyle} ${styles.defaultCelula}`}>A7o</td>
                  <td className={`${objectColors.H2||styles.defaultStyle} ${styles.defaultCelula}`}>K7o</td>
                  <td className={`${objectColors.H3||styles.defaultStyle} ${styles.defaultCelula}`}>Q7o</td>
                  <td className={`${objectColors.H4||styles.defaultStyle} ${styles.defaultCelula}`}>J7o</td>
                  <td className={`${objectColors.H5||styles.defaultStyle} ${styles.defaultCelula}`}>T7o</td>
                  <td className={`${objectColors.H6||styles.defaultStyle} ${styles.defaultCelula}`}>97o</td>
                  <td className={`${objectColors.H7||styles.defaultStyle} ${styles.defaultCelula}`}>87o</td>
                 <td className={`${objectColors.H8||styles.defaultStyle} ${styles.defaultCelula}`}>77</td>
                  <td className={`${objectColors.H9||styles.defaultStyle} ${styles.defaultCelula}`}>76s</td>
                  <td className={`${objectColors.H10||styles.defaultStyle} ${styles.defaultCelula}`}>75s</td>
                  <td className={`${objectColors.H11||styles.defaultStyle} ${styles.defaultCelula}`}>74s</td>
                  <td className={`${objectColors.H12||styles.defaultStyle} ${styles.defaultCelula}`}>73s</td>
                  <td className={`${objectColors.H13||styles.defaultStyle} ${styles.defaultCelula}`}>72s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.I1||styles.defaultStyle} ${styles.defaultCelula}`}>A6o</td>
                  <td className={`${objectColors.I2||styles.defaultStyle} ${styles.defaultCelula}`}>K6o</td>
                  <td className={`${objectColors.I3||styles.defaultStyle} ${styles.defaultCelula}`}>Q6o</td>
                  <td className={`${objectColors.I4||styles.defaultStyle} ${styles.defaultCelula}`}>J6o</td>
                  <td className={`${objectColors.I5||styles.defaultStyle} ${styles.defaultCelula}`}>T6o</td>
                  <td className={`${objectColors.I6||styles.defaultStyle} ${styles.defaultCelula}`}>96o</td>
                  <td className={`${objectColors.I7||styles.defaultStyle} ${styles.defaultCelula}`}>86o</td>
                  <td className={`${objectColors.I8||styles.defaultStyle} ${styles.defaultCelula}`}>76o</td>
                  <td className={`${objectColors.I9||styles.defaultStyle} ${styles.defaultCelula}`}>66</td>
                  <td className={`${objectColors.I10||styles.defaultStyle} ${styles.defaultCelula}`}>65s</td>
                  <td className={`${objectColors.I11||styles.defaultStyle} ${styles.defaultCelula}`}>64s</td>
                  <td className={`${objectColors.I12||styles.defaultStyle} ${styles.defaultCelula}`}>63s</td>
                  <td className={`${objectColors.I13||styles.defaultStyle} ${styles.defaultCelula}`}>62s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.J1||styles.defaultStyle} ${styles.defaultCelula}`}>A5o</td>
                  <td className={`${objectColors.J2||styles.defaultStyle} ${styles.defaultCelula}`}>K5o</td>
                  <td className={`${objectColors.J3||styles.defaultStyle} ${styles.defaultCelula}`}>Q5o</td>
                  <td className={`${objectColors.J4||styles.defaultStyle} ${styles.defaultCelula}`}>J5o</td>
                  <td className={`${objectColors.J5||styles.defaultStyle} ${styles.defaultCelula}`}>T5o</td>
                  <td className={`${objectColors.J6||styles.defaultStyle} ${styles.defaultCelula}`}>95o</td>
                  <td className={`${objectColors.J7||styles.defaultStyle} ${styles.defaultCelula}`}>85o</td>
                  <td className={`${objectColors.J8||styles.defaultStyle} ${styles.defaultCelula}`}>75o</td>
                  <td className={`${objectColors.J9||styles.defaultStyle} ${styles.defaultCelula}`}>65o</td>
                  <td className={`${objectColors.J10||styles.defaultStyle} ${styles.defaultCelula}`}>55</td>
                  <td className={`${objectColors.J11||styles.defaultStyle} ${styles.defaultCelula}`}>54s</td>
                  <td className={`${objectColors.J12||styles.defaultStyle} ${styles.defaultCelula}`}>53s</td>
                  <td className={`${objectColors.J13||styles.defaultStyle} ${styles.defaultCelula}`}>52s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.K1||styles.defaultStyle} ${styles.defaultCelula}`}>A4o</td>
                  <td className={`${objectColors.K2||styles.defaultStyle} ${styles.defaultCelula}`}>K4o</td>
                  <td className={`${objectColors.K3||styles.defaultStyle} ${styles.defaultCelula}`}>Q4o</td>
                  <td className={`${objectColors.K4||styles.defaultStyle} ${styles.defaultCelula}`}>J4o</td>
                  <td className={`${objectColors.K5||styles.defaultStyle} ${styles.defaultCelula}`}>T4o</td>
                  <td className={`${objectColors.K6||styles.defaultStyle} ${styles.defaultCelula}`}>94o</td>
                  <td className={`${objectColors.K7||styles.defaultStyle} ${styles.defaultCelula}`}>84o</td>
                  <td className={`${objectColors.K8||styles.defaultStyle} ${styles.defaultCelula}`}>74o</td>
                  <td className={`${objectColors.K9||styles.defaultStyle} ${styles.defaultCelula}`}>64o</td>
                  <td className={`${objectColors.K10||styles.defaultStyle} ${styles.defaultCelula}`}>54o</td>
                  <td className={`${objectColors.K11||styles.defaultStyle} ${styles.defaultCelula}`}>44</td>
                  <td className={`${objectColors.K12||styles.defaultStyle} ${styles.defaultCelula}`}>43s</td>
                  <td className={`${objectColors.K13||styles.defaultStyle} ${styles.defaultCelula}`}>42s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.L1||styles.defaultStyle} ${styles.defaultCelula}`}>A3o</td>
                  <td className={`${objectColors.L2||styles.defaultStyle} ${styles.defaultCelula}`}>K3o</td>
                  <td className={`${objectColors.L3||styles.defaultStyle} ${styles.defaultCelula}`}>Q3o</td>
                  <td className={`${objectColors.L4||styles.defaultStyle} ${styles.defaultCelula}`}>J3o</td>
                  <td className={`${objectColors.L5||styles.defaultStyle} ${styles.defaultCelula}`}>T3o</td>
                  <td className={`${objectColors.L6||styles.defaultStyle} ${styles.defaultCelula}`}>93o</td>
                  <td className={`${objectColors.L7||styles.defaultStyle} ${styles.defaultCelula}`}>83o</td>
                  <td className={`${objectColors.L8||styles.defaultStyle} ${styles.defaultCelula}`}>73o</td>
                  <td className={`${objectColors.L9||styles.defaultStyle} ${styles.defaultCelula}`}>63o</td>
                  <td className={`${objectColors.L10||styles.defaultStyle} ${styles.defaultCelula}`}>53o</td>
                  <td className={`${objectColors.L11||styles.defaultStyle} ${styles.defaultCelula}`}>43o</td>
                  <td className={`${objectColors.L12||styles.defaultStyle} ${styles.defaultCelula}`}>33</td>
                  <td className={`${objectColors.L13||styles.defaultStyle} ${styles.defaultCelula}`}>32s</td>
               </tr>
               <tr>
                  <td className={`${objectColors.M1||styles.defaultStyle} ${styles.defaultCelula}`}>A2o</td>
                  <td className={`${objectColors.M2||styles.defaultStyle} ${styles.defaultCelula}`}>K2o</td>
                  <td className={`${objectColors.M3||styles.defaultStyle} ${styles.defaultCelula}`}>Q2o</td>
                  <td className={`${objectColors.M4||styles.defaultStyle} ${styles.defaultCelula}`}>J2o</td>
                  <td className={`${objectColors.M5||styles.defaultStyle} ${styles.defaultCelula}`}>T2o</td>
                  <td className={`${objectColors.M6||styles.defaultStyle} ${styles.defaultCelula}`}>92o</td>
                  <td className={`${objectColors.M7||styles.defaultStyle} ${styles.defaultCelula}`}>82o</td>
                  <td className={`${objectColors.M8||styles.defaultStyle} ${styles.defaultCelula}`}>72o</td>
                  <td className={`${objectColors.M9||styles.defaultStyle} ${styles.defaultCelula}`}>62o</td>
                  <td className={`${objectColors.M10||styles.defaultStyle} ${styles.defaultCelula}`}>52o</td>
                  <td className={`${objectColors.M11||styles.defaultStyle} ${styles.defaultCelula}`}>42o</td>
                  <td className={`${objectColors.M12||styles.defaultStyle} ${styles.defaultCelula}`}>32o</td>
                  <td className={`${objectColors.M13||styles.defaultStyle} ${styles.defaultCelula}`}>22</td>
               </tr>
            </tbody>
         </table>
         </div>
  //       </div>
  //       <div class="col-12 col-md-3">
  //        <div class="card w-100 mt-1 mb-2">
  //           <div class="card-header text-center">
  //              Legendas
  //           </div>
  //           <ul class="list-group list-group-flush text-center">
  //              <li class="list-group-item  color-1">
  //                 <span class="fw-bold">2xFold</span>
  //                 <p class="m-0 form-text text-white">23% (300 combos)</p>
  //              </li>
  //              <li class="list-group-item color-2">
  //                 <span class="fw-bold">2x-Allinvs3b-CallAllin</span>
  //                 <p class="m-0 form-text text-white">9% (112 combos)</p>
  //              </li>
  //              <li class="list-group-item color-3">
  //                 <span class="fw-bold">2x-Call3b-FoldvsAllin</span>
  //                 <p class="m-0 form-text text-white">6% (76 combos)</p>
  //              </li>
  //              <li class="list-group-item color-4">
  //                 <span class="fw-bold text-muted">2X-Call3b-CallAllin</span>
  //                 <p class="m-0 form-text text-muted">2% (26 combos)</p>
  //              </li>
  //              <li class="list-group-item color-5">
  //                 <span class="fw-bold">Openshove</span>
  //                 <p class="m-0 form-text text-white">0% (0 combos)</p>
  //              </li>
  //           </ul>
  //        </div>
  //        <div class="pt-1 text-center">
  //           <p class="form-text text-muted">40% de mãos (514 combos)</p>
  //        </div>
  //       </div>
  //      </div>
  //     </div>
  //   </div>
  //  </div>
  // </div>
 )
}