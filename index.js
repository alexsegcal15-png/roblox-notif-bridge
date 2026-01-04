const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// RECUERDA: Las claves SIEMPRE entre comillas simples ''
const API_KEY = 'T5WzZaREpUKn1jhJRj5JeCW8csRsC5Az0pF+75Fjicl7cTIyZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUpTYjJKc2IzaEpiblJsY201aGJDSXNJbWx6Y3lJNklrTnNiM1ZrUVhWMGFHVnVkR2xqWVhScGIyNVRaWEoyYVdObElpd2lZbUZ6WlVGd2FVdGxlU0k2SWxRMVYzcGFZVkpGY0ZWTGJqRnFhRXBTYWpWS1pVTlhPR056VW5ORE5VRjZNSEJHS3pjMVJtcHBZMnczWTFSSmVTSXNJbTkzYm1WeVNXUWlPaUl5TnpZd056azBOVEExSWl3aVpYaHdJam94TnpZM05UVTBORFl3TENKcFlYUWlPakUzTmpjMU5UQTROakFzSW01aVppSTZNVGMyTnpVMU1EZzJNSDAuZVFsMUY0aHk3cC1CdVB4WjFHREw5cjFrN21ER3ZsMFh2UjZEMklEM3BLY2VoLW5uVURjbmZWRERGRlJINkN1YlBrVFp4eU1KRlRQZEtWSkh4Z2pfN0h0MElld1hLUzJkNkVCbnFWZjF3U3ZkVjV3UV9hN3dFM2RDRVJfXzRLckwtMTJZTVlIdTdMMXZ4T1ZYdmJUMVRzN2tyWWN1eGJGSWR0Q0RySWVZYnZHSlVoMnN3YWRzbERPX3hRVzB0eTFCUm1ZREtqRXZhZzlPNVAxUFhNeG41OGpnd2h3ZDZpVGhfRGxNYV9kNTFaWjhTRnZFZy0xblQzM1ZvbEdNclhOZ3ZlMloyOExKY2p6R21MUnZzbEl4TE1ZR0xvQThrR2N6U1ZXcGxoMXc4cHk0NWFscGFrMWxpdzk1c1cwVm9STHdWVmV5NEJlb19aZDRBMzFJbUl4dTdR'; 
const NOTIF_ID = '3f326c7b-38d9-cd44-8061-93945a889622';
const UNIVERSE_ID = 9491928034; // Asegúrate de que sea el Universe ID (ID de Experiencia)

app.post('/enviar', async (req, res) => {
    const { userId } = req.body; // Aquí recibimos el ID que envía Roblox Studio
    
    if (!userId) {
        return res.status(400).send("Falta el userId en la petición");
    }

    console.log(`Intentando enviar notificación al usuario: ${userId}`);

    try {
        // La URL debe llevar el userId al final
        const url = `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`;

        const response = await axios.post(
            url,
            {
                configurationId: NOTIF_ID,
                universeId: UNIVERSE_ID,
                parameters: {} // Aquí irían variables si tu mensaje las tuviera (ej: {jugador: "Nico"})
            },
            { 
                headers: { 
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
        );

        console.log("¡Éxito! Roblox ha aceptado la notificación.");
        res.status(200).send("Notificación enviada correctamente");

    } catch (e) {
        console.error("Error al conectar con la API de Roblox:");
        // Esto nos dirá exactamente qué permiso falta si vuelve a fallar
        console.error(e.response ? JSON.stringify(e.response.data) : e.message);
        res.status(500).json(e.response ? e.response.data : { error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor puente escuchando en el puerto ${PORT}`);
});
