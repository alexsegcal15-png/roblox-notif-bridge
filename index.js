const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Estos datos los configuraremos en Render para que no se vean en GitHub
const API_KEY = process.env.ROBLOX_API_KEY; 
const NOTIF_ID = process.env.ROBLOX_NOTIF_ID; 

app.post('/enviar', async (req, res) => {
    const { userId, senderName } = req.body;
    
    try {
        await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                parameters: { 
                    Sender: senderName // Asegúrate que en Roblox pusiste {Sender}
                }
            },
            { headers: { 'x-api-key': API_KEY } }
        );
        res.status(200).send("Enviado");
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
        res.status(500).send("Error");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Puente funcionando");
});
