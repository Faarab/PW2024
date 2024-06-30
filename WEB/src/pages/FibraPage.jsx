import FwsFibraComponent from "../components/FwsFibraComponent";
import { getRegioniAnni, cantieriFibraAnno } from "../services/apiService";
import check from "../assets/image/check.png";

function FibraPage() {
  return (
    <FwsFibraComponent
      initialOptions={{
        regione: 'Lombardia',
        anno: 2023,
        stato: ['in esecuzione', 'in programmazione', 'terminato'],
      }}
      fetchOptionsApi={getRegioniAnni}
      fetchDatiApi={cantieriFibraAnno}
      immagineSrc={check}
      formLeft={true}
    />
  );
}

export default FibraPage;
