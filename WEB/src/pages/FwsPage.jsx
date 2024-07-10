import FwsFibraComponent from "../components/FwsFibraComponent";
import { getRegioniAnni, cantieriFwaAnno } from "../services/apiService";
import fwa from "../assets/image/fwa.png";

export default function FwaPage() {
  return (
    <FwsFibraComponent
      initialOptions={{
        regione: 'Lombardia',
        anno: 2022,
        stato: ['in esecuzione', 'in programmazione', 'terminato'],
      }}
      fetchOptionsApi={getRegioniAnni}
      fetchDatiApi={cantieriFwaAnno}
      immagineSrc={fwa}
      formLeft={true}
    />
  );
}


