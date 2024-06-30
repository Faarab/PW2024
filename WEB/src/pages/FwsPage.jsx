import FwsFibraComponent from "../components/FwsFibraComponent";
import { getRegioniAnni, cantieriFibraAnno } from "../services/apiService";
import fwa from "../assets/image/fwa.png";

export default function FwaPage() {
  return (
    <FwsFibraComponent
      initialOptions={{
        regione: 'Lombardia',
        anno: 2023,
        stato: ['in esecuzione', 'in programmazione', 'terminato'],
      }}
      fetchOptionsApi={getRegioniAnni}
      fetchDatiApi={cantieriFibraAnno}
      immagineSrc={fwa}
      formLeft={true}
    />
  );
}


