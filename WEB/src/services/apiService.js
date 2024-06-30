import axios from 'axios';

const baseUrl = "http://127.0.0.1:5000/api";

export async function lavoriChiusiCollaudati(mostraFibra, mostraFwa, regioni) {
  try {
    const response = await axios.post(`${baseUrl}/lavoriChiusiCollaudati`, {
      mostra_fibra: mostraFibra,
      mostra_fwa: mostraFwa,
      regioni: regioni
    });
    
    return response.data;
    
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }

}
export async function lavoriAperti(mostraFibra, mostraFwa, regioni) {
  try {
    const response = await axios.post(`${baseUrl}/lavoriAperti`, {
      mostra_fibra: mostraFibra,
      mostra_fwa: mostraFwa,
      regioni: regioni
    });
    
    return response.data;
    
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }

}
export async function lavoriInProgrammazione(mostraFibra, mostraFwa, regioni) {
  try {
    const response = await axios.post(`${baseUrl}/lavoriInProgrammazione`, {
      mostra_fibra: mostraFibra,
      mostra_fwa: mostraFwa,
      regioni: regioni
    });
    
    return response.data;
    
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }

}
export async function cantieriFibraAnno(regione, anno, stato) {
  try {
    const response = await axios.post(`${baseUrl}/cantieriFibraAnno`, {
      regione : regione,
      anno :anno,
      stato : stato
    });
    console.log("Parametri ricevuti:", regione, stato, anno);
    return response.data;
    
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }

}

export async function getRegioniAnni(){
  try {
      const response = await axios.get(`${baseUrl}/regioniAnni`);
      return response.data;
  } catch (error) {
      console.error("There was an error fetching the regions!", error);
      throw error;
  }
}
export async function getAll(){
  try {
      const response = await axios.get(`${baseUrl}/getAll`);
      return response.data;
  } catch (error) {
      console.error("There was an error fetching the regions!", error);
      throw error;
  }
}
export async function Delete(id){
  try {
      const response = await axios.delete(`${baseUrl}/delete/${id}`);
      return response.data;
  } catch (error) {
      console.error("There was an error fetching the regions!", error);
      throw error;
  }
}
export async function Update(id, new_values) {
  try {
    const response = await axios.put(`${baseUrl}/update/${id}`, new_values);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the record!', error);
    throw error;
  }
}
