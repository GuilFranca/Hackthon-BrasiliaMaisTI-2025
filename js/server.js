// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dados de autenticação e API
const watsonxOrchestrateApiKey = 'SUA_CHAVE_DA_API_AQUI'; 
// CORRIGIDO: Adicionando o endpoint completo /v1/sessions
const watsonxOrchestrateApiUrl = 'https://api.us-south.watsonx-orchestrate.cloud.ibm.com/v1/sessions';
const instanceId = '3021954-itz-watsonx-event-004'; 

app.post('/api/analisar', async (req, res) => {
    try {
        const { formData } = req.body;
        const userMessage = `
            Olá, preciso de uma análise para os dados do meu formulário.
            Nome do Experimento: ${formData.nomeExperimento || ''}
            Desafio a resolver: ${formData.desafioResolve || ''}
            Descrição do Experimento: ${formData.descricaoExperimento || ''}
        `;

        const respostaDaIBM = await axios.post(watsonxOrchestrateApiUrl, {
            input: {
                text: userMessage
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${watsonxOrchestrateApiKey}`,
                'IBM-Instance-ID': instanceId
            }
        });

        res.json(respostaDaIBM.data);

    } catch (error) {
        console.error('Erro no servidor de proxy:', error.response?.data || error.message);
        res.status(500).json({ error: 'Erro ao se comunicar com a API da IBM Cloud.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});