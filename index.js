const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID;

app.post('/enviar', async (req, res) => {
    const { userId, senderName } = req.body;
    
    // Log para ver qué está recibiendo el servidor
    console.log(`Intentando enviar notif a: ${userId} de parte de: ${senderName}`);

    try {
        const response = await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: { 
                    Sender: senderName // <--- REVISA QUE EN ROBLOX PUSISTE {Sender}
                }
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );
        res.status(200).send("Notificación enviada a Roblox");
    } catch (e) {
        // Esto imprimirá el error real en los "Logs" de Render
        if (e.response) {
            console.error("Error de Roblox API:", e.response.data);
            res.status(500).json(e.response.data);
        } else {
            console.error("Error de conexión:", e.message);
            res.status(500).send(e.message);
        }
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Puente activo y esperando peticiones");
});
