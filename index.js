const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID;

app.post('/enviar', async (req, res) => {
    const { userId } = req.body; // Solo necesitamos el ID del usuario
    
    console.log(`Intentando enviar notificación fija al usuario: ${userId}`);

    try {
        await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: {} // ENVIAMOS PARÁMETROS VACÍOS
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );
        console.log("¡Éxito! Notificación enviada correctamente.");
        res.status(200).send("OK");
    } catch (e) {
        console.error("Error de Roblox API:");
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
