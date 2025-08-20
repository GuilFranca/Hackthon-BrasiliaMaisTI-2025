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
    const urlDaApi = 'URL_DA_SUA_API_AQUI';

    // 3. Configura a requisição para enviar os dados
    const opcoes = {
        method: 'POST', // O método mais usado para enviar dados
        headers: {
            'Content-Type': 'application/json' // Indica que o corpo da requisição é JSON
            // Se a API exigir, você precisará de uma chave de autenticação aqui, como 'Authorization: Bearer SEU_TOKEN'
        },
        body: JSON.stringify(formData) // Converte o objeto JavaScript em uma string JSON
    };

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
});

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