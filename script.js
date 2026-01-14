// --- VARIABLES ---
const player = document.getElementById('player');
const playerImg = player.querySelector('img');
const blob = document.getElementById('transition-blob');
const menuScreen = document.getElementById('menu-screen');
const aboutWindow = document.getElementById('about-window');
const contactWindow = document.getElementById('contact-window');
const pastworkWindow = document.getElementById('pastwork-window');

let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
const speed = 8;
let isMenuOpen = false;

const keys = {
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    w: false, a: false, s: false, d: false
};

// --- KEYBOARD LISTENERS ---
window.addEventListener('keydown', (e) => {
    // Escape key to close windows
    if (e.key === 'Escape') {
        closeAbout();
        closeContact();
        closePastWork();
        return;
    }
    
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key] = true;
        playerImg.classList.add('walking');
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key] = false;
        const anyKeyPressed = Object.values(keys).some(k => k);
        if (!anyKeyPressed) {
            playerImg.classList.remove('walking');
        }
    }
});

// --- GAME LOOP ---
function gameLoop() {
    if (isMenuOpen) return; 

    if (keys.ArrowUp || keys.w) posY -= speed;
    if (keys.ArrowDown || keys.s) posY += speed;
    
    if (keys.ArrowLeft || keys.a) {
        posX -= speed;
        player.style.transform = `translate(-50%, -50%) scaleX(-1)`; 
    }
    if (keys.ArrowRight || keys.d) {
        posX += speed;
        player.style.transform = `translate(-50%, -50%) scaleX(1)`; 
    }

    posX = Math.max(50, Math.min(window.innerWidth - 50, posX));
    posY = Math.max(50, Math.min(window.innerHeight - 50, posY));

    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// --- MENU FUNCTIONS ---
function openMenu() {
    isMenuOpen = true;
    blob.classList.add('active');      
    menuScreen.classList.add('visible'); 
}
function closeMenu() {
    // Close everything
    aboutWindow.classList.remove('open');
    contactWindow.classList.remove('open');
    pastworkWindow.classList.remove('open');
    
    isMenuOpen = false;
    blob.classList.remove('active');
    menuScreen.classList.remove('visible');
    
    requestAnimationFrame(gameLoop);
}

// --- WINDOW LOGIC ---
function openAbout() {
    contactWindow.classList.remove('open'); // Switch if other is open
    aboutWindow.classList.add('open');
}

function closeAbout() {
    aboutWindow.classList.remove('open');
}

function openContact() {
    aboutWindow.classList.remove('open'); // Switch if other is open
    contactWindow.classList.add('open');
}
function closeContact() {
    contactWindow.classList.remove('open');
}

function openPastWork() {
    aboutWindow.classList.remove('open');
    contactWindow.classList.remove('open');
    pastworkWindow.classList.add('open');
}

function closePastWork() {
    pastworkWindow.classList.remove('open');
}