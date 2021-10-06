
// App es una instancia de Node.js y solo funciona en el lado del servidor
const app: any = {}

// Ejemplo de request al servidor: /api/conagua
app.get('/api/conagua', async (req: any, res: any) => {
    // axios es una libreria externa para hacer request
    const axios = require('axios').default;
    const zlib = require('zlib');
    try {
        const result =  await axios.request({
            method: 'GET',
            url: 'https://smn.conagua.gob.mx/webservices/?method=1',
            responseType: 'arraybuffer' // es importante un Buffer para descomprimir el contenido del archivo .gz
        });

        // zlib se encarga de descomprimir el archivo
        zlib.gunzip(Buffer.from(result.data), function (err: any, output: any) {
            if (err) {
                // Si la descompresion falla retorna un arreglo vacio
                res.json([]);

            } else {
                // Primero obtiene el contenido del archivo en string
                // Despues convierte el string a JSON para ser retornado
                // Por defecto el webservice devuelve un archivo JSON comprimido en un archivo .gz
                res.json(JSON.parse(output.toString()));
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json('fallo');
    }
    
});