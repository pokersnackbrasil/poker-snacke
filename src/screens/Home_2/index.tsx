import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import { PageContainer } from "../../componentes/PageContainer";
import { filtrarBlinds } from "../../utils/filter";
export function Home_2() {
  const botoes = [
    "3W BTN X REG",
    "3W SB X BB REG",
    "3W SB X BTN ALL-IN REG",
    "3W SB X BTN MR - REG",
    "3W BB X BTN MR REG",
    "3W BB X MR 2P REG",
    "3W BB X SB LIMP REG",
    "HU X SB VS REG",
    "HU * BB VS LIMP REG",
    "HU * BB VS MR REG"
  ]
  const arquivo = filtrarBlinds(rawObjectsColors,botoes)
  return (
    <>
      <PageContainer json={arquivo}/>
    </>
  )
}