document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos principais do HTML
    const playButtons = document.querySelectorAll('.play-button');
    const adModal = document.getElementById('ad-modal');
    const gameModal = document.getElementById('game-modal');
    const adTimerEl = document.getElementById('ad-timer');
    const gameIframe = document.getElementById('game-iframe');
    const closeGameButton = document.getElementById('close-game-button');

    // Variáveis de controle
    let gameToLoad = null; 
    let countdownInterval = null; 

    // 2. Evento de Clique nos Botões de Jogo
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            gameToLoad = button.getAttribute('data-game-url');
            showAd();
        });
    });

    // 3. Função para Mostrar o Anúncio e Iniciar o Contador
    function showAd() {
        adModal.style.display = 'block';
        
        let timeLeft = 5; // Tempo do anúncio (5 segundos)
        adTimerEl.textContent = timeLeft;

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            timeLeft--;
            adTimerEl.textContent = timeLeft;
            
            // Quando o tempo termina
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                hideAdAndLoadGame();
            }
        }, 1000); 
    }

    // 4. Função para Esconder o Anúncio e Carregar o Jogo
    function hideAdAndLoadGame() {
        adModal.style.display = 'none';
        
        if (gameToLoad) {
            loadGame(gameToLoad);
        }
    }

    // 5. Função para Carregar o Jogo no Iframe
    function loadGame(gameUrl) {
        gameIframe.src = gameUrl;
        gameModal.style.display = 'block';
    }

    // 6. Fechar o Jogo (Botão "X")
    closeGameButton.addEventListener('click', () => {
        gameModal.style.display = 'none';
        gameIframe.src = '';
        gameToLoad = null;
    });
});
