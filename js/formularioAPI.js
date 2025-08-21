// formulario.js
const urlDaApi = 'http://localhost:3000/api/analisar';
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

    const opcoes = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
    };

    fetch(urlDaApi, opcoes)
        .then(response => {
            // Verifica se a resposta foi bem-sucedida
            if (response.ok) {
                // Se sim, retorna o JSON dos dados de sucesso
                return response.json(); 
            } else {
                // Se não, retorna o JSON do erro para que o .catch possa ler a mensagem
                return response.json().then(errorData => {
                    // Aumentamos o detalhe do erro
                    throw new Error(`Erro do servidor: ${response.status} - ${errorData.error}`);
                });
            }
        })
        .then(data => {
            console.log('Resposta da IA:', data);
            alert('A IA respondeu: ' + data.output.text);
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
            // Agora a mensagem de erro será mais detalhada
            alert('Ocorreu um erro ao processar sua solicitação: ' + error.message);
        });
});