import rawObjectsColors from "../../componentes/globalStyles/styles.json";
import { PageContainer } from "../../componentes/PageContainer";
import { filtrarBlinds } from "../../utils/filter";
import { modalidades } from "../../utils/modalidades";
export function Home_1() {
  const botoes = modalidades["Sping & Go vs Fish"]
  const arquivo = filtrarBlinds(rawObjectsColors,botoes)
  return (
    <>
      <PageContainer json={arquivo}/>
    </>
  )
}