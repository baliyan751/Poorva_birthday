// Sequence control, typing, confetti, balloons, and audio control

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const startBtn = document.getElementById('startBtn');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bg-music');
    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('flap');
    const openLetterBtn = document.getElementById('openLetterBtn');
    const envelopeScene = document.getElementById('envelopeScene');
    const letterScene = document.getElementById('letterScene');
    const pages = Array.from(document.querySelectorAll('.page'));
    const nextBtns = Array.from(document.querySelectorAll('.nextBtn'));
    const replayBtn = document.getElementById('replay');
    const confettiCanvas = document.getElementById('confettiCanvas');

    // Elements for typing
    const type1 = document.getElementById('type1');
    const type2 = document.getElementById('type2');
    const type3 = document.getElementById('type3');
    const finalText = document.getElementById('finalText');

    // placeholder images - user should add images inside images/ and assets: bg1.jpg, bg2.jpg, bg3.jpg, cake.png, popper.png
    // set backgrounds from data-bg attributes
    pages.forEach(p => {
        const bg = p.dataset.bg;
        if (bg) {
            p.querySelector('.pageInner').style.backgroundImage = `linear-gradient(120deg, rgba(239, 228, 228, 0.45), rgba(243, 237, 237, 0.15)), url('bg1 c:\Users\HP\OneDrive\Pictures\Image 04_74f40498.jpg,bg2 c:\Users\HP\OneDrive\Pictures\Snapchat-458217630.jpg,bg3 c:\Users\HP\OneDrive\Pictures\Snapchat-991467807.jpg ,c:\Users\HP\OneDrive\Pictures\Snapchat-1124031030.jpg,c:\Users\HP\OneDrive\Desktop\HTML\birthday-greeting\Birthday_Chocolate_Dripping_cake.webp,c:\Users\HP\OneDrive\Desktop\HTML\birthday-greeting\images.jpg${bg}')`;
        }
    });

    // play/pause music
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => { });
            musicToggle.textContent = 'Pause Music';
        } else {
            bgMusic.pause();
            musicToggle.textContent = 'Play Music';
        }
    });

    startBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
        // show envelope scene
        envelopeScene.classList.remove('hidden');
        // small delay for entrance
        setTimeout(() => envelope.classList.add('fadeInUp'), 300);
    });

    // Envelope open -> show letter pages
    openLetterBtn.addEventListener('click', () => {
        envelope.classList.add('open');
        // after flap animation, show letter scene
        setTimeout(() => {
            envelopeScene.classList.add('hidden');
            letterScene.classList.remove('hidden');
            // reveal first page
            showPage('page1');
            startBalloons();
            animateCake('cake1');
            startTyping(type1, "Today is a very Special Day for a very Special Person. Want to know what is that special day and who is that special person, Then click enter", 40);
        }, 1100);
    });

    // next buttons between pages
    nextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const next = e.currentTarget.dataset.next;
            // special transitions
            if (next === 'page2') {
                transitionTo('page2', () => {
                    startTyping(type2, "Aaj meri bhot hi pyari,cute,sundar aur bouni bestfriend ka birthday hai,,Kabhi kabhi to sochne lag jaata hu ki agar uss din uncle ka mood acha na hota toh aaj meri life ka sabse acha aur sabse pyara hissa meri ek bhot hi achi aur gusaal dost is duniya me aur mere sath na hoti and woh ldki hai toh wese 5 futiya ,bolti bhot h aur gusse me chudail jesi lgti hai isliye mai apni uss pyari si dost ko pyar se choti chudail,pdhaku chudail,bak bak express,bouni,5 futiya,bhukkad dayan bulata hu... Want to know more about her and her name??? Then click enter", 55);
                    animateCake('cake2');
                });
            } else if (next === 'page3') {
                transitionTo('page3', () => {
                    startTyping(type3, "Ek choti si bacchii I mean bouni wese toh woh kuhdki shakal ko bekar btati hai lekin hai badi pyari si aur cute si bacchi ,pdhne me achi ,character uska itna accha hai ki usse acha character aur kisi ka nhi aur behaviour se kaafi achi hai aur haa bhukkad bhi h, thodi si gussel bhi hai gussa badi jaldi aata hai use lekin gusse me aur bhi jada pyari lagti hai, Poorva... Ye hai us 5 futiya bouni ka uske jesa pyara sa naam, jise mai pyar se Choti Chudail bolta hu!! Bas ek last baar aur click enter for your suprise Choti Chudail.", 55);
                    animateCake('cake3');
                });
            } else if (next === 'final') {
                transitionTo('final', () => {
                    // show final heading and confetti
                    triggerFinal();
                });
            }
        });
    });

    replayBtn.addEventListener('click', () => {
        // restart
        location.reload();
    });

    function showPage(id) {
        pages.forEach(p => p.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    function transitionTo(id, cb) {
        // smooth fade between active page and next
        const current = pages.find(p => p.classList.contains('active'));
        if (current) {
            current.classList.remove('active');
            // subtle transform -> fade
            current.style.opacity = 0;
            current.style.transform = 'translateY(-20px)';
        }
        setTimeout(() => {
            showPage(id);
            if (cb) cb();
        }, 450);
    }

    // typing effect: word-by-word but with letter pacing for better feel
    function startTyping(el, text, speed = 50) {
        el.textContent = '';
        let idx = 0;
        const words = text.split(' ');
        let build = '';
        function typeWord(i) {
            if (i >= words.length) return;
            const word = words[i];
            // type each letter of this word
            let j = 0;
            function letterTick() {
                if (j < word.length) {
                    build += word[j++];
                    el.textContent = build;
                    setTimeout(letterTick, speed * 0.12);
                } else {
                    // add space and next word
                    build += ' ';
                    el.textContent = build;
                    setTimeout(() => typeWord(i + 1), speed * 2);
                }
            }
            letterTick();
        }
        typeWord(0);
    }

    // simple balloon generator using CSS balloons
    function startBalloons() {
        const ids = ['balloons1', 'balloons2', 'balloons3'];
        ids.forEach((id, idx) => {
            const container = document.getElementById(id);
            if (!container) return;
            // generate a few balloons with different colors and offsets
            const colors = [
                ['#ff9aa2', '#ff6b81'],
                ['#ffd29f', '#ffb86b'],
                ['#c6f0ff', '#6dd3ff'],
                ['#c3ffc1', '#5ff07a']
            ];
            for (let i = 0; i < 8; i++) {
                const b = document.createElement('div');
                b.className = 'balloon';
                const col = colors[(i + idx) % colors.length];
                b.style.background = `radial-gradient(circle at 30% 20%, ${col[0]}, ${col[1]})`;
                b.style.left = (6 + i * 11) + '%';
                b.style.animationDelay = `${Math.random() * 4 + idx * 0.4}s`;
                b.style.width = `${40 + (i % 3) * 18}px`;
                b.style.height = `${60 + (i % 3) * 26}px`;
                b.style.opacity = 0.95 - (i * 0.05);
                container.appendChild(b);
            }
        });
    }

    function animateCake(id) {
        const cake = document.getElementById(id);
        if (!cake) return;
        cake.classList.remove('zoomIn');
        // force reflow to replay animation
        void cake.offsetWidth;
        cake.classList.add('zoomIn');
    }

    // confetti implementation (simple particle system)
    const confetti = (function () {
        const canvas = confettiCanvas;
        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight });
        const particles = [];
        function rand(min, max) { return Math.random() * (max - min) + min }
        function spawn(n = 80) {
            for (let i = 0; i < n; i++) {
                particles.push({
                    x: rand(0, W),
                    y: rand(-H, 0),
                    vx: rand(-6, 6),
                    vy: rand(2, 8),
                    r: rand(6, 12),
                    color: ['#ff5f8d', '#ffd400', '#6bffb8', '#6dd3ff'][Math.floor(Math.random() * 4)],
                    rot: rand(0, 360),
                    vr: rand(-8, 8),
                    life: rand(80, 160)
                });
            }
        }
        function update() {
            ctx.clearRect(0, 0, W, H);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.12; // gravity
                p.rot += p.vr;
                p.life--;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
                ctx.restore();
                if (p.y > H + 50 || p.x < -50 || p.x > W + 50 || p.life <= 0) particles.splice(i, 1);
            }
            requestAnimationFrame(update);
        }
        update();
        return { spawn };
    })();

    function triggerFinal() {
        showPage('final');
        // animate poppers
        document.querySelectorAll('.popper').forEach((p, i) => {
            setTimeout(() => { p.style.transform = 'translateY(0) rotate(' + (i ? 10 : -10) + 'deg)'; p.style.opacity = 1 }, 120 + i * 80);
        });
        // confetti burst and music
        confetti.spawn(160);
        // final typing text
        startTyping(finalText, "Wish you very very happy birthday Poorva Bouni urf Choti Chudail, My BFF… May Mahadev bless you with lots of happiness, love, and success in your life aur tu jiye hazaro saal , saal ke din ho hazar and hope so our friendship remains unbreakable through years with same level of trust aur haa enjoy your life's most beautiful day a lot .. Again wishing you a Very Happy Birthday Poorva!!", 38);
        // play music if available / user clicked earlier
        bgMusic.play().catch(() => { });
    }

});
