// ============================
// Seleção de elementos do DOM
// ============================
const ctaBtn = document.getElementById('actionBtn');          // Botão "Faça a Sua Parte"
const modal = document.getElementById('modal');               // Container do modal de agradecimento
const closeModalBtn = document.getElementById('closeModalBtn'); // Botão que fecha o modal
const backToTop = document.getElementById('backToTop');       // Botão para voltar ao topo
const countNumber = document.getElementById('count-number');  // Elemento que mostra o contador de toneladas
const sections = document.querySelectorAll('section');       // Todas as seções do site
const mainContent = document.getElementById('page-main');     // Conteúdo principal
const pageHeader = document.getElementById('page-header');    // Cabeçalho da página


// ============================
// Função: Contador animado
// ============================
// Mostra um número crescendo de 0 até o valor definido (ex.: toneladas de plástico)
function animateCount(target, duration = 3000) {
    let start = 0; // Começa do zero
    // Incremento calculado para que a animação dure o tempo especificado
    const increment = Math.ceil(target / (duration / 16));

    function update() {
        start += increment;                           // Incrementa o número
        if (start > target) start = target;           // Garante que não ultrapasse o valor final
        countNumber.textContent = start.toLocaleString('pt-BR'); // Exibe com formatação brasileira
        if (start < target) requestAnimationFrame(update); // Continua a animação até chegar ao alvo
    }

    update(); // Inicia a animação
}

// Chamada da função para exibir, por exemplo, 11 milhões de toneladas
animateCount(11000000);


// ============================
// Função: Exibir seções ao rolar a página
// ============================
// Adiciona a classe 'visible' quando a seção entra na área visível da tela
function revealSections() {
    const triggerBottom = window.innerHeight * 0.85; // Ponto de disparo (85% da altura da janela)

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top; // Posição do topo da seção
        if (top < triggerBottom) section.classList.add('visible'); // Torna a seção visível
    });
}

// Ativa a função no scroll e também na carga inicial da página
window.addEventListener('scroll', revealSections);
revealSections();


// ============================
// Funções: Abrir e Fechar Modal
// ============================

// Abrir modal
function openModal() {
    modal.classList.add('active');                  // Exibe o modal
    mainContent.setAttribute('aria-hidden', 'true'); // Esconde conteúdo principal de leitores de tela
    pageHeader.setAttribute('aria-hidden', 'true');  // Esconde o cabeçalho para acessibilidade
    modal.querySelector('.modal').focus();           // Foca no modal para navegação por teclado
    document.body.style.overflow = 'hidden';         // Impede rolagem da página ao abrir modal
}

// Fechar modal
function closeModal() {
    modal.classList.remove('active');                // Oculta o modal
    mainContent.removeAttribute('aria-hidden');      // Restaura acessibilidade ao conteúdo
    pageHeader.removeAttribute('aria-hidden');       // Restaura acessibilidade ao cabeçalho
    ctaBtn.focus();                                   // Devolve o foco para o botão que abriu o modal
    document.body.style.overflow = '';               // Restaura a rolagem da página
}

// Eventos de clique para abrir e fechar modal
ctaBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);


// ============================
// Fechar modal com tecla ESC
// ============================
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});


// ============================
// Trap Focus (manter foco no modal)
// ============================
// Impede que a navegação por Tab saia do modal quando ele está aberto
modal.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
        // Seleciona todos os elementos que podem receber foco
        const focusable = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];                   // Primeiro elemento focável
        const last = focusable[focusable.length - 1]; // Último elemento focável

        if (e.shiftKey) {
            // Se Shift+Tab, vai para o anterior
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus(); // Volta para o último
            }
        } else {
            // Se apenas Tab, vai para o próximo
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus(); // Volta para o primeiro
            }
        }
    }
});


// ============================
// Botão "Voltar ao topo"
// ============================

// Mostra ou esconde o botão baseado na rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight / 2)
        backToTop.classList.add('visible');    // Mostra botão quando passa da metade da tela
    else
        backToTop.classList.remove('visible'); // Esconde quando está no topo
});

// Evento de clique para voltar ao topo suavemente
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  // Rolagem suave até o topo
    document.querySelector('header h1').focus();     // Move foco para o título principal (acessibilidade)
});
