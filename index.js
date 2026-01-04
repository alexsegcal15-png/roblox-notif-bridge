const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = T5WzZaREpUKn1jhJRj5JeIjQPKthfeeIQ3EQfOMdDxBMKTdjZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUpTYjJKc2IzaEpiblJsY201aGJDSXNJbWx6Y3lJNklrTnNiM1ZrUVhWMGFHVnVkR2xqWVhScGIyNVRaWEoyYVdObElpd2lZbUZ6WlVGd2FVdGxlU0k2SWxRMVYzcGFZVkpGY0ZWTGJqRnFhRXBTYWpWS1pVbHFVVkJMZEdobVpXVkpVVE5GVVdaUFRXUkVlRUpOUzFSa2FpSXNJbTkzYm1WeVNXUWlPaUl5TnpZd056azBOVEExSWl3aVpYaHdJam94TnpZM05UVXpPVEk1TENKcFlYUWlPakUzTmpjMU5UQXpNamtzSW01aVppSTZNVGMyTnpVMU1ETXlPWDAubUtRN3dqYWJLNHQ2eTJiWjgxVERmSVlhLXVMd1hFaVZPMDdSdUVzYVJzOWUzNzdGRk1xakltRHNlREl5eXY2c0VvYXozbWttQ29vbWwxS2hTQjlNTDg4akpzNjJOb2JOa0RvdEhzLWlLTWVfaFdmUHVHRkZNNlJhalJYNjFoV3FiU3hUeC01Z2laaENxUFN6azI5UUtJZlRpemVzQWprdzVYTUdhTmdGN096MGZ3ODZPWWJXejBZTlNEeFFiTGEyclpQTWVSZW05S0tDMS0tMTJnWklLOE9WbEQ3V1dZRTl5YXJ6aHh3ZmxzUGFXSTRHbkRlZzNiTHlVVlNIeVlyNmlzQWFtclQ4OGJQNzJ3QkgtczNLRDlMZVllMmFVZTVKUFphUDhFZkRteEpRWDBqaWx3QVhaV0JqaU5UcmtMNlU1VTdBdnhXYURUbGFKdFB4UTE0Mmxn;
const NOTIF_ID = 3f326c7b-38d9-cd44-8061-93945a889622;

app.post('/enviar', async (req, res) => {
    const { userId } = req.body;
    
    console.log(`Enviando notificación fija al ID: ${userId}`);

    try {
        await axios.post(
            `https://apis.roblox.com/notifications/v1/user-notifications/${userId}`,
            {
                configurationId: NOTIF_ID,
                universeId: "9491928034", // <--- AGREGA ESTA LÍNEA CON TU ID
                parameters: {}
            },
// ... el resto igual
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
