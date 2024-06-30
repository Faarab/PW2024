import pandas as pd

df = pd.read_csv('data/stato_lavori_id.csv', sep=';', encoding='UTF-8')

print(df.head())

df['Piano fibra (anno)'] = df['Piano fibra (anno)'].fillna(0)
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].fillna(0)

df['Piano fibra (anno)'] = df['Piano fibra (anno)'].astype('int64')
df['Piano FWA (anno)'] = df['Piano FWA (anno)'].astype('int64')


str_prog = 'in programmazione|in progettazione' 
str_esec = 'in esecuzione' 
str_term = 'terminato|lavori chiusi|in collaudo' 


# # Series-> una lista o una colonna di un DataFrame. Ogni elemento in una Series ha un'etichetta associata, chiamata indice. 



def lavoriAperti(mostra_fibra=True, mostra_fwa=True, regioni=None):
    result = []

    if mostra_fibra:
        fibra_cablata = df[df['Stato Fibra'].str.contains(str_esec, na=False)]
        if regioni:
            fibra_cablata = fibra_cablata[fibra_cablata['Regione'].isin(regioni)]
        fibra_cablata_counts = fibra_cablata['Regione'].value_counts().reset_index()
        fibra_cablata_counts.columns = ['regione', 'conteggio']
        fibra_cablata_counts['tipo'] = 'fibra'
        result.extend(fibra_cablata_counts.to_dict(orient='records'))

    if mostra_fwa:
        fwa = df[df['Stato FWA'].str.contains(str_esec, na=False)]
        if regioni:
            fwa = fwa[fwa['Regione'].isin(regioni)]
        fwa_counts = fwa['Regione'].value_counts().reset_index()
        fwa_counts.columns = ['regione', 'conteggio']
        fwa_counts['tipo'] = 'fwa'
        result.extend(fwa_counts.to_dict(orient='records'))

    return result
def lavoriInProgrammazione(mostra_fibra=True, mostra_fwa=True, regioni=None):
    result = []

    if mostra_fibra:
        fibra_cablata = df[df['Stato Fibra'].str.contains(str_prog, na=False)]
        if regioni:
            fibra_cablata = fibra_cablata[fibra_cablata['Regione'].isin(regioni)]
        fibra_cablata_counts = fibra_cablata['Regione'].value_counts().reset_index()
        fibra_cablata_counts.columns = ['regione', 'conteggio']
        fibra_cablata_counts['tipo'] = 'fibra'
        result.extend(fibra_cablata_counts.to_dict(orient='records'))

    if mostra_fwa:
        fwa = df[df['Stato FWA'].str.contains(str_prog, na=False)]
        if regioni:
            fwa = fwa[fwa['Regione'].isin(regioni)]
        fwa_counts = fwa['Regione'].value_counts().reset_index()
        fwa_counts.columns = ['regione', 'conteggio']
        fwa_counts['tipo'] = 'fwa'
        result.extend(fwa_counts.to_dict(orient='records'))

    return result
def lavoriChiusiCollaudati(mostra_fibra=True, mostra_fwa=True, regioni=None):
    result = []

    if mostra_fibra:
        fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]
        if regioni:
            fibra_cablata = fibra_cablata[fibra_cablata['Regione'].isin(regioni)]
        fibra_cablata_counts = fibra_cablata['Regione'].value_counts().reset_index()
        fibra_cablata_counts.columns = ['regione', 'conteggio']
        fibra_cablata_counts['tipo'] = 'fibra'
        result.extend(fibra_cablata_counts.to_dict(orient='records'))

    if mostra_fwa:
        fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]
        if regioni:
            fwa = fwa[fwa['Regione'].isin(regioni)]
        fwa_counts = fwa['Regione'].value_counts().reset_index()
        fwa_counts.columns = ['regione', 'conteggio']
        fwa_counts['tipo'] = 'fwa'
        result.extend(fwa_counts.to_dict(orient='records'))

    return result

def get_unique_values():
    unique_values = {
        'regioni': df['Regione'].unique().tolist(),
        'anni': df['Piano fibra (anno)'].unique().tolist(),
        #'stati': df['Stato Fibra'].unique().tolist()
    }
    return unique_values




def cantieriFibraAnno(regione='Lombardia', anno=2023, stato='in esecuzione'):
    df_filtered = df.copy()

    if regione:
        df_filtered = df_filtered[df_filtered['Regione'] == regione]
    if anno:
        df_filtered = df_filtered[df_filtered['Piano fibra (anno)'] == anno]
    if stato:
       
        if isinstance(stato, list):
            
            patterns = {
                "terminato": 'terminato|lavori chiusi|in collaudo',
                "in esecuzione": 'in esecuzione',
                "in programmazione": 'in programmazione|in progettazione'
            }
       
            stato_counts = {}
            for opt in stato:
                pattern = patterns.get(opt)
                if pattern:
                    stato_counts[opt] = df_filtered[df_filtered['Stato Fibra'].str.contains(pattern, na=False)].groupby('Provincia').size()
                else:
                    stato_counts[opt] = pd.Series([]) 

            province_counts = pd.DataFrame(stato_counts).fillna(0).astype(int).reset_index()

        else:
         
            patterns = {
                "terminato": 'terminato|lavori chiusi|in collaudo',
                "in esecuzione": 'in esecuzione',
                "in programmazione": 'in programmazione|in progettazione'
            }
            pattern = patterns.get(stato)
            if pattern:
                df_filtered = df_filtered[df_filtered['Stato Fibra'].str.contains(pattern, na=False)]

                
                province_counts = df_filtered['Provincia'].value_counts().reset_index()
                province_counts.columns = ['provincia', 'cantieri']  
            else:
                province_counts = pd.DataFrame(columns=['provincia', 'cantieri'])  

    else:
        
        province_counts = df_filtered['Provincia'].value_counts().reset_index()
        province_counts.columns = ['provincia', 'cantieri'] 

   
    result = province_counts.to_dict(orient='records')

    return result

def delete_record(id):
  
    if id in df['id'].values:
        df = df[df['id'] != id]
        df.to_csv('data/stato_lavori_id.csv', sep=';', index=False, encoding='UTF-8')
        return {'message': 'Record eliminato con successo.'}, 200
    else:
        return {'message': 'Record non trovato.'}, 404
    
def update_record_in_df(id, new_values):
   
    if id in df['id'].values:
        
        idRecordDaAggiornare = df.index[df['id'] == id].tolist()[0]
        colonneAggiornabili = ['Stato Fibra', 'Stato FWA', 'Piano fibra (anno)', 'Piano FWA (anno)']

        # Aggiorna i valori del record solo per le colonne specificate
        for key, value in new_values.items():
            if key in colonneAggiornabili:
                df.at[idRecordDaAggiornare, key] = value
                
        df.to_csv('data/stato_lavori_id.csv', sep=';', index=False, encoding='UTF-8')
        return {'message': 'Record aggiornato con successo.'}, 200
    else:
        return {'message': 'Record non trovato.'}, 404

def getAll():
 
    selected_columns = ['id','Regione', 'Provincia', 'Citta', 'Stato Fibra', 'Stato FWA', 'Piano fibra (anno)', 'Piano FWA (anno)']
    dfUp = pd.read_csv('data/stato_lavori_id.csv', sep=';', encoding='UTF-8') 
    df_selected = dfUp[selected_columns]
    num_records = len(df_selected) // 4

    df_half = df_selected.iloc[:num_records]
    res = df_half.to_json(orient='records', force_ascii=False)
    return res


