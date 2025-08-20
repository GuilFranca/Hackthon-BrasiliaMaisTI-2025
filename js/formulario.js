// const form = document.getElementById('formulario__sugestoes');

// const caminhoCompleto = window.location.pathname;
// // Extrai o nome do arquivo da URL
// const nomeDoArquivo = caminhoCompleto.substring(caminhoCompleto.lastIndexOf('/') + 1);

// let proximaPagina;
// let voltar;

// if (nomeDoArquivo.includes('1')) {
//     proximaPagina = 'formulário2';
//     voltar = 'index.html';
// }


// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = {};

//     const inputs = form.querySelectorAll('input');
    
//     inputs.forEach(input => {
//         // Verifica se o input tem um nome para evitar erros
//         if (input.name) {
//             formData[input.name] = input.value;
//         }
//     });

//     console.log(formData);
//     // Agora você pode acessar os valores assim:
//     console.log(formData.nomeExperimento);
//     console.log(formData.desafioResolve);
//     console.log(formData.descricaoExperimento);

//     window.location.href = 'formulario2.html'
// });

// const btnVoltar

const form = document.getElementById('formulario__sugestoes');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Coleta os dados do formulário em um objeto
    const formData = {};
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });

    // 2. Define o URL da API para onde os dados serão enviados
    // Substitua 'URL_DA_SUA_API_AQUI' pelo endereço real da IA
    // const urlDaApi = 'URL_DA_SUA_API_AQUI';

    // -------------------------------------------------------------------------------
        const userMessage = `
        Olá, preciso de uma análise para os dados do meu formulário.
        Nome do Experimento: ${formData.nomeExperimento || ''}
        Desafio a resolver: ${formData.desafioResolve || ''}
        Descrição do Experimento: ${formData.descricaoExperimento || ''}
    `;

    // CONEÇÃO COM API
        const watsonxOrchestrateApiUrl = 'https://api.us-south.watson-orchestrate.cloud.ibm.com/instances/16f482ef-aa37-428e-8a88-16e39fe87adc'; // Ex: 'https://api.orchestrate.watsonx.ibm.com/v1/sessions'
        const watsonxOrchestrateApiKey = 'ayoxmM7Yo7zKFgtbZRCZHdOVpK3kj--kwmRxeiyvXqv-';
        const instanceId = '3021954 - itz-watsonx-event-004';
    
    // 4. Configura a requisição para a API do watsonx Orchestrate
        const opcoes = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${watsonxOrchestrateApiKey}`, // Autenticação com a API Key
            'IBM-Instance-ID': instanceId // ID da sua instância
        },
        body: JSON.stringify({
            // O corpo da requisição precisa seguir o formato exigido pela API
            input: {
                text: userMessage // O texto que você quer que o agente analise
            }
        })
    };

    // 5. Executa a requisição usando o fetch
    fetch(watsonxOrchestrateApiUrl, opcoes)
        .then(response => {
            if (!response.ok) {
                // Se a resposta não for bem-sucedida, o erro pode estar nas credenciais
                return response.json().then(err => {
                    throw new Error(`Erro na API: ${response.status} - ${JSON.stringify(err)}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // 6. Lida com a resposta da IA
            console.log('Resposta completa da IA:', data);
            
            // A resposta da IA geralmente está dentro de `data.output.text`
            const respostaIA = data.output.text;
            console.log('Mensagem do Agente:', respostaIA);
            
            // Exemplo de como exibir a resposta para o usuário
            alert('A IA respondeu: ' + respostaIA);
            
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a IA:', error);
            alert('Ocorreu um erro ao processar sua solicitação.');
        });
});


    // -------------------------------------------------------------------------------

    // 3. Configura a requisição para enviar os dados
    // const opcoes = {
    //     method: 'POST', // O método mais usado para enviar dados
    //     headers: {
    //         'Content-Type': 'application/json' // Indica que o corpo da requisição é JSON
    //         // Se a API exigir, você precisará de uma chave de autenticação aqui, como 'Authorization: Bearer SEU_TOKEN'
    //     },
    //     body: JSON.stringify(formData) // Converte o objeto JavaScript em uma string JSON
    // };

    // 4. Executa a requisição usando o fetch
    fetch(urlDaApi, opcoes)
        .then(response => {
            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error('Erro na resposta da rede: ' + response.statusText);
            }
            return response.json(); // Converte a resposta JSON em um objeto JavaScript
        })
        .then(data => {
            // 5. Lida com a resposta da IA
            console.log('Resposta da IA:', data);
            // Aqui você pode mostrar a resposta da IA para o usuário na página
        })
        .catch(error => {
            // Lida com erros (ex: falha na conexão, URL errada)
            console.error('Erro ao enviar os dados:', error);
        });
//});

// const form = document.getElementById('formulario__sugestoes');

// // Declaração de variáveis
// let formData = {};
// let convercao;

// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     // 1. Coleta os dados em um objeto
//     const inputs = form.querySelectorAll('input');
//     inputs.forEach(input => {
//         if (input.name) {
//             formData[input.name] = input.value;
//         }
//     });

// });

// let formData = {};

// let convercao;

// // console.log(formularioEnvio);

// const form = document.getElementById('formulario__sugestoes');

// const inputs = document.querySelectorAll('input');

// form.addEventListener('submit', function(event) {

//     event.preventDefault();

//     inputs.forEach(input => {
        
//         if (input.name) {
//             formData[input.name] = input.value;
//         }

//     })

//     convercao = JSON.stringify(formData);

// });


// const form = document.getElementById('formulario__sugestoes');

// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = {};

//     const inputs = form.querySelectorAll('input');
    
//     inputs.forEach(input => {
//         // Verifica se o input tem um nome para evitar erros
//         if (input.name) {
//             formData[input.name] = input.value;
//         }
//     });

//     console.log(formData);
//     // Agora você pode acessar os valores assim:
//     console.log(formData.nomeExperimento);
//     console.log(formData.desafioResolve);
//     console.log(formData.descricaoExperimento);
// });