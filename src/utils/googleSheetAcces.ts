import { google, sheets_v4 } from 'googleapis';

async function accessGoogleSheet( spreadsheetId: string, apiKey: string, range: string, fila: number, columna: number ): Promise<string | null> {
    
    const sheets = google.sheets({ version: 'v4' });

    try {
        const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        key: apiKey,
        range,
        });

        const values = response.data.values as string[][];
        // Utiliza map para procesar y guardar todos los valores
        const processedValues = values.map(row => {
        // Aquí puedes realizar cualquier procesamiento adicional en cada fila
        return row.map(cell => {
            // Ejemplo: Convertir las celdas en números si son cadenas
            return cell;
        });
        });
        // 1er valor ingresado corresponde a las filas y el 2do valor corresponde a las columnas
        console.log('Valores obtenidos:', processedValues);
        return processedValues[fila]?.[columna] ?? null;

    } catch (error: any) {
        console.error('Error al obtener los datos:', error.message);
        return null;
    }
}

export default accessGoogleSheet;
