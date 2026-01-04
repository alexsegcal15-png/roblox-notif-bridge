const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID;

app.post('/enviar', async (req, res) => {
    const { userId, senderName } = req.body;
    
    // Log para confirmar recepción en Render
    console.log(`Enviando a Roblox -> User: ${userId}, Sender: ${senderName}`);

    try {
        const response = await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: { 
                    // Este nombre 'Sender' debe ser IDÉNTICO al que creaste en el Dashboard
                    Sender: String(senderName) 
                }
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );
        console.log("¡Éxito! Roblox aceptó la notificación.");
        res.status(200).send("OK");
    } catch (e) {
        // Si hay error, imprimimos el detalle exacto en los logs de Render
        console.error("Error detallado de Roblox API:");
        if (e.response) {
            console.error(JSON.stringify(e.response.data));
            res.status(500).json(e.response.data);
        } else {
            console.error(e.message);
            res.status(500).send(e.message);
        }
    }
});

app.listen(process.env.PORT || 3000);
