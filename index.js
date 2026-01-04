const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.ROBLOX_API_KEY;
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID;

app.post('/enviar', async (req, res) => {
    const { userId, senderName } = req.body;
    
    // Forzamos que senderName sea un String limpio
    const nombreLimpio = String(senderName || "Alguien");

    try {
        await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: { 
                    // Este nombre 'Sender' debe ser IGUAL al que pusiste en el Dashboard
                    Sender: nombreLimpio 
                }
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );
        res.status(200).send("OK");
    } catch (e) {
        console.error("Error detallado:", e.response ? JSON.stringify(e.response.data) : e.message);
        res.status(500).json(e.response ? e.response.data : { error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
