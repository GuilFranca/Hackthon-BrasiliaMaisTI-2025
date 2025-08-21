document.addEventListener('DOMContentLoaded', () => {
    // Seletores para corresponderem às classes do HTML
    const pages = document.querySelectorAll('.page');
    const nextBtns = document.querySelectorAll('.next__btn');
    const prevBtns = document.querySelectorAll('.prev__btn');
    const form = document.getElementById('multi_page_form');
    let currentPageIndex = 0;

    // A URL da API, conforme o segundo código
    const urlDaApi = 'http://localhost:3000/api/analisar';

    // Função para mostrar a página atual e esconder as outras
    function showPage(index) {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
    }

    // Navegação para a próxima página
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentPage = pages[currentPageIndex];
            const inputs = currentPage.querySelectorAll('input[required]');
            let allValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    allValid = false;
                    input.reportValidity(); // Mostra a mensagem de erro no navegador
                }
            });

            // Só avança se a validação passar
            if (allValid) {
                if (currentPageIndex < pages.length - 1) {
                    currentPageIndex++;
                    showPage(currentPageIndex);
                    atualizandoEtapa();
                }
            }
        });
    });

    // Navegação para a página anterior
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPageIndex--;
            showPage(currentPageIndex);
            atualizandoEtapa();
        });
    });

    // Submissão do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Coleta todos os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Lógica de envio para a API (copiada do segundo código, mas usando async/await)
        try {
            const response = await fetch(urlDaApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData: data }) // A API espera um objeto 'formData' dentro do corpo
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Resposta da IA:', result);
                alert('A IA respondeu: ' + result.output.text);
            } else {
                const errorData = await response.json();
                // Aumentamos o detalhe do erro
                throw new Error(`Erro do servidor: ${response.status} - ${errorData.error}`);
            }

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Ocorreu um erro ao processar sua solicitação: ' + error.message);
        }
    });

    function atualizandoEtapa() {
        let cardEtapas = document.querySelectorAll('.card__etapa');
        cardEtapas.forEach(cardEtapa => {
            cardEtapa.textContent = `Etapa ${currentPageIndex + 1} de ${pages.length}`;
        });
    }

    // Inicializa a primeira página
    showPage(currentPageIndex);
});

// document.addEventListener('DOMContentLoaded', () => {
//     // CORRIGIDO: Seletores para corresponderem às classes do HTML
//     const pages = document.querySelectorAll('.page');
//     const nextBtns = document.querySelectorAll('.next__btn');
//     const prevBtns = document.querySelectorAll('.prev__btn');
//     const form = document.getElementById('multi_page_form');
//     let currentPageIndex = 0;

//     // Função para mostrar a página atual e esconder as outras
//     function showPage(index) {
//         pages.forEach((page, i) => {
//             page.classList.toggle('active', i === index);
//         });
//     }

//     // Navegação para a próxima página
//     nextBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             const currentPage = pages[currentPageIndex];
//             const inputs = currentPage.querySelectorAll('input[required]');
//             let allValid = true;

//             inputs.forEach(input => {
//                 if (!input.checkValidity()) {
//                     allValid = false;
//                     input.reportValidity(); // Mostra a mensagem de erro no navegador
//                 }
//             });

//             // CORRIGIDO: Só avança se a validação passar
//             if (allValid) {
//                 currentPageIndex++;
//                 showPage(currentPageIndex);
//                 atualizandoEtapa();
//             }

//         });
//     });

//     // Navegação para a página anterior
//     prevBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             currentPageIndex--;
//             showPage(currentPageIndex);
//             atualizandoEtapa();
//         });
//     });

//     // Submissão do formulário
//     form.addEventListener('submit', (e) => {
//         e.preventDefault(); // Impede o envio padrão

//         // Coleta todos os dados do formulário
//         const formData = new FormData(form);
//         const data = Object.fromEntries(formData.entries());

//         console.log('Dados do formulário enviados:', data);
//         alert('Formulário enviado com sucesso! (Verifique o console para os dados)');

//         // Código para enviar para o servidor aqui (não alterado)
//     });

//     function atualizandoEtapa() {
//         let cardEtapas = document.querySelectorAll('.card__etapa');
//         cardEtapas.forEach( cardEtapa => {
//             cardEtapa.textContent = `Etapa ${currentPageIndex} de 5`;
//         });
//     }

// });