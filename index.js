const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID;

app.post('/enviar', async (req, res) => {
    const { userId } = req.body;
    
    console.log(`Enviando notificación fija al ID: ${userId}`);

    try {
        await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: {} // Enviamos esto vacío para evitar el Error 0
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );
        console.log("¡Éxito! Notificación aceptada por Roblox.");
        res.status(200).send("OK");
    } catch (e) {
        console.error("Error en la API de Roblox:");
        console.error(e.response ? JSON.stringify(e.response.data) : e.message);
        res.status(500).json(e.response ? e.response.data : { error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
