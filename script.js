document.addEventListener('DOMContentLoaded', () => {
    const typewriterInput = document.getElementById('typewriterInput');
    const paperCanvas = document.getElementById('paperCanvas');
    const ctx = paperCanvas.getContext('2d');
    
    const cmToPx = 37.795;
    paperCanvas.width = 15 * cmToPx;  // 15 cm in pixels
    paperCanvas.height = window.innerHeight;

    const paperWidth = paperCanvas.width;
    const paperHeight = 0.4 * cmToPx;  // 0.4 cm in pixels
    const startY = 1.6 * cmToPx;  // 1.6 cm from the top
    const lineHeight = paperHeight;  // Altezza della riga in pixels

    let lines = ['']; // Inizializziamo con una riga vuota

    // Funzione per riprodurre il suono dei tasti
    const playKeySound = () => {
        const audio = new Audio('key_press_sound.mp3'); // Assicurati di avere un file MP3 per il suono
        audio.play();
    };

    // Funzione per disegnare il foglio
    const drawPaper = () => {
        ctx.clearRect(0, 0, paperCanvas.width, paperCanvas.height);
        let yOffset = startY;
        lines.forEach((line) => {
            if (yOffset <= paperCanvas.height) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, yOffset, paperWidth, paperHeight); // Righe bianche
                ctx.fillStyle = 'black';
                ctx.font = '18px Courier New';
                ctx.textBaseline = 'middle';
                ctx.fillText(line, 0.1 * cmToPx, yOffset + paperHeight / 2); // Margine sinistro invariato
            }
            yOffset -= lineHeight;
        });
    };

    // Funzione per gestire l'input dell'utente
    const handleInput = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            lines.unshift(''); // Inserisce una nuova riga sopra
            if (lines.length * lineHeight > paperCanvas.height - startY) {
                lines.pop(); // Rimuove l'ultima riga se supera l'altezza del canvas
            }
            drawPaper();
        } else if (event.key.length === 1) { // Aggiungi solo caratteri visibili
            if (lines[0].length < paperWidth / 10) { // Limita la lunghezza della riga
                lines[0] += event.key;
                drawPaper();
            }
        }
        playKeySound();
    };

    // Aggiungi l'evento di input per il textarea
    typewriterInput.addEventListener('keydown', handleInput);

    // Ridimensiona il canvas al ridimensionamento della finestra
    window.addEventListener('resize', () => {
        paperCanvas.height = window.innerHeight;
        drawPaper();
    });

    // Disegna la carta iniziale
    drawPaper();
});
