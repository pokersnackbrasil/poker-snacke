import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import { PageContainer } from "../../componentes/PageContainer";
import { filtrarBlinds } from "../../utils/filter";
export function Home_1() {
  const botoes = [
    "3W BTN",
    "3W SB X BB",
    "3W SB X BTN ALL-IN",
    "3W SB X BTN LIMP",
    "3W SB X BTN MR",
    "3W BB X BTN 3X",
    "3W BB X BTN ALL-IN",
    "3W BB X BTN LIMP",
    "3W BB X BTN MR",
    "3W BB X SB ALL-IN",
    "3W BB X LIMP 2P",
    "3W BB X MR 2P",
    "3W BB X SB LIMP",
    "3W BB X SB MR",
    "HU X SB",
    "HU * BB VS LIMP",
    "HU * SB VS MR",
    "HU * BB VS ALL-IN",
    "HU * BB VS 3X"
  ]
  const arquivo = filtrarBlinds(rawObjectsColors,botoes)
  return (
    <>
      <PageContainer json={arquivo}/>
    </>
  )
}