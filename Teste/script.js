document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const form = document.getElementById('multi-page-form');
    let currentPageIndex = 0;

    // Função para mostrar a página atual e esconder as outras
    function showPage(index) {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
    }

    // Navegação para a próxima página
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Opcional: Adicione validação aqui antes de avançar
            const currentPage = pages[currentPageIndex];
            const inputs = currentPage.querySelectorAll('input[required]');
            let allValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    allValid = false;
                    input.reportValidity(); // Mostra a mensagem de erro do navegador
                }
            });

            if (allValid) {
                currentPageIndex++;
                showPage(currentPageIndex);
            }
        });
    });

    // Navegação para a página anterior
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPageIndex--;
            showPage(currentPageIndex);
        });
    });

    // Submissão do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão

        // Coleta todos os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('Dados do formulário enviados:', data);
        alert('Formulário enviado com sucesso! (Verifique o console para os dados)');

        // Aqui você pode enviar os dados para o servidor usando fetch() ou XMLHttpRequest
        // Exemplo:
        // fetch('sua-api-endpoint.com/submit', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(result => console.log('Sucesso:', result))
        // .catch(error => console.error('Erro:', error));
    });
});