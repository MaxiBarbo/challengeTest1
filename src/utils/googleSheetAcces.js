const { google } = require('googleapis');

async function accessGoogleSheet(spreadsheetId, apiKey, range, fila, columna) {

        const sheets = google.sheets({ version: 'v4' });
    
        try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            key: apiKey,
            range,
        });
    
        const values = response.data.values;
            // Utiliza map para procesar y guardar todos los valores
        const processedValues = values.map(row => {
            // Aquí puedes realizar cualquier procesamiento adicional en cada fila
            return row.map(cell => {
            // Ejemplo: Convertir las celdas en números si son cadenas
            return cell;
            });
        });
        // 1er valor ingresado corresponde a las filas y el 2do valor corresponde a las columnas
        // console.log('Valores obtenidos:', processedValues[fila][columna]);
        return processedValues[fila][columna];
        
        } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        return null;
        }
    }
    
module.exports = accessGoogleSheet;
