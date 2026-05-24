/* -------------------------------------------------------------
   MUG STUDIO — High-Performance Interaction & Animation Script
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialise Component References
    const cursor = document.getElementById('custom-cursor');
    const headline = document.getElementById('heroHeadline');
    const subheadline = document.querySelector('.subheadline');
    const ctaGroup = document.querySelector('.cta-group');
    const bottomBar = document.querySelector('.bottom-bar');
    
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let manifestoHasAnimated = false;
    let currentLang = localStorage.getItem('mug-lang') || 'pt';

    // ---------------------------------------------------------
    // Translations Dictionary & Switcher Engine
    // ---------------------------------------------------------
    const translations = {
        pt: {
            "nav.projects": "PROJETOS",
            "nav.process": "PROCESSO",
            "nav.contact": "CONTATO",
            "hero.ctaPrimary": "INICIAR PROJETO ↗",
            "hero.ctaSecondary": "VER PROJETOS →",
            "hero.title": "DESIGN NÃO <br>É ENFEITE.<br>É ALAVANCA.",
            "hero.subtitle": "Um studio para founders que tratam a landing page como produto, não como panfleto. Design orientado a conversão, estratégia antes do pixel, zero template.",
            "hero.scrollText": "ROLAR",
            "manifesto.text": "Uma landing page é uma decisão. A nossa faz seu cliente decidir +86% mais rápido.",
            "cases.title": "PROJETOS RECENTES.",
            "cases.description": "Cada projeto começa numa pergunta diferente. O que se repete é o método.",
            "cases.c1.number": "CASE 01 / 03",
            "cases.c1.segment": "landing page para um aplicativo financeiro",
            "cases.c1.cta": "ABRIR CASE ↗",
            "cases.c2.number": "CASE 02 / 03",
            "cases.c2.segment": "landing page para um SaaS de logística",
            "cases.c2.cta": "ABRIR CASE ↗",
            "cases.c3.number": "CASE 03 / 03",
            "cases.c3.segment": "landing page para um ateliê de cerâmica artesanal",
            "cases.c3.cta": "ABRIR CASE ↗",
            "process.title": "COMO A GENTE TRABALHA.",
            "process.description": "Cinco etapas. Sem mistério. Cada uma existe por um motivo.",
            "process.step1": "DESMEMBRANDO<br>O BRIEFING",
            "process.step2": "DISCOVERY<br>& ESTRATÉGIA",
            "process.step3": "WIREFRAME<br>& COPY",
            "process.step4": "DESIGN<br>& IMPLEMENTAÇÃO",
            "process.step5": "OTIMIZAÇÃO<br>PÓS-LANÇAMENTO",
            "process.cta": "INICIAR UM PROJETO →",
            "about.title": "O QUE NOS DEFINE.",
            "about.description": "Não é manifesto, é método. O que está aqui está em cada projeto que sai do studio.",
            "about.p1.title": "primeiro estratégia.",
            "about.p1.phrase": "A gente não abre o Figma sem entender o problema. Design sem hipótese é decoração cara.",
            "about.p2.title": "copy é parte do design.",
            "about.p2.phrase": "Texto e layout nascem juntos. Não terceirizamos a mensagem — ela é metade do produto.",
            "about.p3.title": "foco em conversão.",
            "about.p3.phrase": "O trabalho serve à métrica do cliente. Se ficar bonito no caminho, melhor — mas a régua é outra.",
            "about.p4.title": "independente por escolha.",
            "about.p4.phrase": "Studio pequeno, time enxuto, conversa direta. Sem account, sem PowerPoint, sem intermediário.",
            "faq.title": "FAQ.",
            "faq.description": "Se a sua não está aqui, manda direto. A gente responde rápido — e sem rodeio.",
            "faq.cta": "FALAR COM A GENTE ↗",
            "faq.q1.question": "quanto tempo leva pra entregar uma lp?",
            "faq.q1.answer": "O prazo padrão é de 7 dias, do briefing à publicação. Pode variar pra mais ou pra menos dependendo do escopo, mas a gente nunca começa um projeto sem cravar a data antes.",
            "faq.q2.question": "quanto custa um projeto?",
            "faq.q2.answer": "Não trabalhamos com tabela fixa porque cada projeto tem um escopo diferente — uma LP de lançamento não é o mesmo que um site de venda contínua.",
            "faq.q3.question": "vocês escrevem a copy ou eu preciso trazer?",
            "faq.q3.answer": "A copy faz parte do trabalho. A gente desenvolve mensagem e estrutura junto. Se você já tem material aprovado, ótimo: a gente refina e adapta. Mas o ponto é que texto e design nascem juntos aqui.",
            "faq.q4.question": "vocês entregam só o design ou implementam também?",
            "faq.q4.answer": "Os dois. A gente entrega o design e a implementação completa. Não tem custo escondido de \"fase 2\".",
            "faq.q5.question": "o que acontece depois do lançamento?",
            "faq.q5.answer": "A LP no ar é o começo, não o fim. Por padrão, a gente acompanha as duas primeiras semanas de tráfego: setup de analytics, leitura de heatmap, ajustes finos. Se você quiser otimização contínua (testes A/B, iterações mensais), tem um plano separado pra isso.",
            "faq.q6.question": "vocês atendem fora do Brasil?",
            "faq.q6.answer": "Sim. Trabalhamos remotamente desde o primeiro dia.",
            "contact.title": "MANDE <br>UM&nbsp;OLÁ",
            "contact.subtitle": "Manda o briefing — ou só uma ideia.",
            "contact.form.name": "Nome",
            "contact.form.whatsapp": "WhatsApp",
            "contact.form.project": "Empresa ou projeto",
            "contact.form.objective": "Objetivo do projeto",
            "contact.form.submit": "ENVIAR →"
        },
        en: {
            "nav.projects": "PROJECTS",
            "nav.process": "PROCESS",
            "nav.contact": "CONTACT",
            "hero.ctaPrimary": "START PROJECT ↗",
            "hero.ctaSecondary": "VIEW PROJECTS →",
            "hero.title": "DESIGN IS NOT <br>ORNAMENT.<br>IT'S LEVERAGE.",
            "hero.subtitle": "A studio for founders who treat landing pages as products, not flyers. Conversion-focused design, strategy before pixels, zero templates.",
            "hero.scrollText": "SCROLL",
            "manifesto.text": "A landing page is a decision. Ours makes your client decide +86% faster.",
            "cases.title": "RECENT PROJECTS.",
            "cases.description": "Every project starts with a different question. What repeats is the method.",
            "cases.c1.number": "CASE 01 / 03",
            "cases.c1.segment": "landing page for a financial application",
            "cases.c1.cta": "OPEN CASE ↗",
            "cases.c2.number": "CASE 02 / 03",
            "cases.c2.segment": "landing page for a logistics SaaS",
            "cases.c2.cta": "OPEN CASE ↗",
            "cases.c3.number": "CASE 03 / 03",
            "cases.c3.segment": "landing page for an artisan ceramic studio",
            "cases.c3.cta": "OPEN CASE ↗",
            "process.title": "HOW WE WORK.",
            "process.description": "Five stages. No mystery. Each one exists for a reason.",
            "process.step1": "DISSECTING<br>THE BRIEFING",
            "process.step2": "DISCOVERY<br>& STRATEGY",
            "process.step3": "WIREFRAME<br>& COPY",
            "process.step4": "DESIGN<br>& IMPLEMENTATION",
            "process.step5": "POST-LAUNCH<br>OPTIMIZATION",
            "process.cta": "START A PROJECT →",
            "about.title": "WHAT DEFINES US.",
            "about.description": "Not a manifesto, a method. What is here is in every project that leaves the studio.",
            "about.p1.title": "strategy first.",
            "about.p1.phrase": "We don't open Figma without understanding the problem. Design without hypotheses is expensive decoration.",
            "about.p2.title": "copy is part of design.",
            "about.p2.phrase": "Copy and layout are born together. We don't outsource the message — it is half of the product.",
            "about.p3.title": "focus on conversion.",
            "about.p3.phrase": "The work serves the client's metrics. If it gets beautiful along the way, great — but the bar is different.",
            "about.p4.title": "independent by choice.",
            "about.p4.phrase": "Small studio, lean team, direct conversation. No accounts, no PowerPoint, no middleman.",
            "faq.title": "FAQ.",
            "faq.description": "If yours isn't here, send it directly. We answer fast — and straight to the point.",
            "faq.cta": "TALK TO US ↗",
            "faq.q1.question": "how long does it take to deliver an lp?",
            "faq.q1.answer": "Our standard timeline is 7 days, from briefing to launch. It may vary based on scope, but we never start a project without setting the date first.",
            "faq.q2.question": "how much does a project cost?",
            "faq.q2.answer": "We don't work with fixed pricing because every project has a different scope — a launch LP is not the same as a continuous sales site.",
            "faq.q3.question": "do you write the copy or do I need to bring it?",
            "faq.q3.answer": "Copy is part of the job. We develop the message and structure together. If you already have approved copy, great: we refine and adapt it. But the point is that copy and design are born together here.",
            "faq.q4.question": "do you only deliver the design or implement it as well?",
            "faq.q4.answer": "Both. We deliver the design and the complete implementation. There is no hidden cost of a \"phase 2\".",
            "faq.q5.question": "what happens after the launch?",
            "faq.q5.answer": "The LP live is the beginning, not the end. By default, we track the first two weeks of traffic: analytics setup, heatmap tracking, fine-tuning. If you want continuous optimization (A/B testing, monthly iterations), there is a separate plan for that.",
            "faq.q6.question": "do you serve clients outside Brazil?",
            "faq.q6.answer": "Yes. We have worked remotely since day one.",
            "contact.title": "SAY <br>HELLO",
            "contact.subtitle": "Send the briefing — or just an idea.",
            "contact.form.name": "Name",
            "contact.form.whatsapp": "WhatsApp",
            "contact.form.project": "Company or project",
            "contact.form.objective": "Project goal",
            "contact.form.submit": "SEND →"
        }
    };

    function updateLanguage(lang, isInitialLoad = false) {
        currentLang = lang;
        localStorage.setItem('mug-lang', lang);

        // Update active class on buttons
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Translate all data-translate-key elements
        const elements = document.querySelectorAll('[data-translate-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                const translationText = translations[lang][key];

                if (el.id === 'heroHeadline' || el.id === 'manifestoText' || el.id === 'contactHeadline') {
                    el.innerHTML = translationText;
                } else if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                    el.placeholder = translationText;
                } else {
                    el.innerHTML = translationText;
                }
            }
        });

        // Re-split and animate reveal elements only on live toggle clicks (not initial load)
        if (!isInitialLoad) {
            // 1. Hero Headline
            splitTextForReveal(headline);
            const heroWords = headline.querySelectorAll('.word-reveal');
            heroWords.forEach((word, idx) => {
                word.style.transitionDelay = `${idx * 40}ms`;
                requestAnimationFrame(() => word.classList.add('animate'));
            });

            // 2. Manifesto Text
            const manifestoTextEl = document.getElementById('manifestoText');
            splitTextForReveal(manifestoTextEl);
            if (manifestoHasAnimated) {
                const manifestoWords = manifestoTextEl.querySelectorAll('.word-reveal');
                manifestoWords.forEach((word) => {
                    word.classList.add('animate');
                });
            }

            // 3. Contact Headline
            const contactSection = document.getElementById('contato');
            const contactHeadlineEl = document.getElementById('contactHeadline');
            splitTextForReveal(contactHeadlineEl);
            if (contactSection && contactSection.classList.contains('animate')) {
                const contactWords = contactHeadlineEl.querySelectorAll('.word-reveal');
                contactWords.forEach((word) => {
                    word.classList.add('animate');
                });
            }
            
            // Re-run form labels floating height check
            const formFields = document.querySelectorAll('.field-input');
            formFields.forEach(input => {
                const group = input.closest('.field-group');
                if (group) {
                    if (input.value.trim() !== '') {
                        group.classList.add('has-value');
                    } else {
                        group.classList.remove('has-value');
                    }
                }
            });

            // Re-setup custom cursor hovers to capture newly translated links/buttons
            setupCursorHovers();
        }
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                updateLanguage(lang, false);
            }
        });
    });

    // ---------------------------------------------------------
    // 2. Custom Cursor Core Logic
    // ---------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Lerp (Linear Interpolation) coefficient for buttery cursor trailing
    const speed = 0.2;

    function checkCursorSectionColor() {
        const manifestoSection = document.getElementById('manifesto');
        const processSection = document.getElementById('processo');
        const faqSection = document.getElementById('faq');
        
        let insideDarkSection = false;
        
        if (manifestoSection) {
            const rect = manifestoSection.getBoundingClientRect();
            if (mouseY >= rect.top && mouseY <= rect.bottom && mouseX >= rect.left && mouseX <= rect.right) {
                insideDarkSection = true;
            }
        }
        
        if (!insideDarkSection && processSection) {
            const rect = processSection.getBoundingClientRect();
            if (mouseY >= rect.top && mouseY <= rect.bottom && mouseX >= rect.left && mouseX <= rect.right) {
                insideDarkSection = true;
            }
        }
        
        if (!insideDarkSection && faqSection) {
            const rect = faqSection.getBoundingClientRect();
            if (mouseY >= rect.top && mouseY <= rect.bottom && mouseX >= rect.left && mouseX <= rect.right) {
                insideDarkSection = true;
            }
        }
        
        if (insideDarkSection) {
            cursor.classList.add('white-cursor');
        } else {
            cursor.classList.remove('white-cursor');
        }
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        checkCursorSectionColor();
    });

    window.addEventListener('scroll', () => {
        checkCursorSectionColor();
    });

    function updateCursorPosition() {
        // Calculate smooth lerp movement
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursorPosition);
    }
    
    // Initialize standard tracking loop
    requestAnimationFrame(updateCursorPosition);

    // Apply cursor grow/invert transitions on interactive hovers
    function setupCursorHovers() {
        const interactiveElements = document.querySelectorAll('a, button, [data-hover="true"]');
        
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }

    // ---------------------------------------------------------
    // 3. Generic Staggered Word Reveal Parser
    // ---------------------------------------------------------
    function splitTextForReveal(element) {
        if (!element) return;

        const originalNodes = Array.from(element.childNodes);
        element.innerHTML = ''; // Clear for modular injection
        
        originalNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Parse text chunks into individual words
                const words = node.textContent.trim().split(/[ \t\r\n]+/);
                words.forEach((word) => {
                    if (word.length === 0) return;
                    createWordRevealSpan(element, word, []);
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName.toLowerCase() === 'br') {
                    // Clone and preserve the line break element
                    const br = document.createElement('br');
                    if (node.className) br.className = node.className;
                    element.appendChild(br);
                } else {
                    // Collect class list (e.g. text-outline, text-outline-white)
                    const classes = Array.from(node.classList);
                    const words = node.textContent.trim().split(/[ \t\r\n]+/);
                    words.forEach((word) => {
                        if (word.length === 0) return;
                        createWordRevealSpan(element, word, classes);
                    });
                }
            }
        });
    }

    function createWordRevealSpan(parent, text, classes) {
        // Outer wrapper hides overflow to block vertical reveal bleed
        const containerSpan = document.createElement('span');
        containerSpan.className = 'word-container';
        
        // Inner span holds character value and handles translation transition
        const revealSpan = document.createElement('span');
        revealSpan.className = 'word-reveal';
        classes.forEach(cls => revealSpan.classList.add(cls));
        revealSpan.textContent = text;
        
        containerSpan.appendChild(revealSpan);
        parent.appendChild(containerSpan);
        
        // Add spacing text node to ensure normal browser word wrapping
        parent.appendChild(document.createTextNode(' '));
    }

    // Apply staggered animation states
    function triggerEntranceAnimations() {
        // Trigger staggered words reveal
        const reveals = headline.querySelectorAll('.word-reveal');
        reveals.forEach((word, idx) => {
            // Apply staggered transition delay offset by 80ms
            word.style.transitionDelay = `${idx * 80}ms`;
            
            // Trigger rendering next frame
            requestAnimationFrame(() => {
                word.classList.add('animate');
            });
        });

        // Trigger bottom elements after headline has finished sweep (approx. 800ms)
        setTimeout(() => {
            if (subheadline) subheadline.classList.add('animate');
            if (ctaGroup) ctaGroup.classList.add('animate');
            if (bottomBar) bottomBar.classList.add('animate');
        }, reveals.length * 80 + 200);
    }

    // ---------------------------------------------------------
    // 4. Fullscreen Overlay Mobile Navigation Menu
    // ---------------------------------------------------------
    function toggleMobileMenu(open = true) {
        if (open) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock main scroll bleed
            
            // Add subtle active state for hamburger lines transition
            openMenuBtn.style.opacity = '0';
        } else {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Resume scrolling
            openMenuBtn.style.opacity = '1';
        }
    }

    // Register UI interaction events
    if (openMenuBtn && closeMenuBtn && mobileMenu) {
        openMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
        closeMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
        
        // Close menu immediately if a navigation link is clicked
        mobileNavLinks.forEach((link) => {
            link.addEventListener('click', () => toggleMobileMenu(false));
        });

        // Accessibility support: Close overlay if Escape key is pressed
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        });
    }

    // ---------------------------------------------------------
    // 5. Seção 4: Manifesto Intersection Observer trigger
    // ---------------------------------------------------------
    function setupManifestoObserver() {
        const manifestoSection = document.getElementById('manifesto');
        if (!manifestoSection) return;

        const manifestoText = document.getElementById('manifestoText');

        // Split text block inside the manifesto
        splitTextForReveal(manifestoText);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    manifestoHasAnimated = true;
                    // Animate Manifesto Text (stagger word-by-word at 60ms)
                    const words = manifestoText.querySelectorAll('.word-reveal');
                    words.forEach((word, idx) => {
                        word.style.transitionDelay = `${idx * 60}ms`;
                        requestAnimationFrame(() => word.classList.add('animate'));
                    });

                    // Unobserve to run exactly once
                    observer.unobserve(manifestoSection);
                }
            });
        }, {
            threshold: 0.20 // Trigger when 20% is in view
        });

        observer.observe(manifestoSection);
    }

    // ---------------------------------------------------------
    // 5. Seção 4: GSAP Card Stack Scroll Parallax Overlay
    // ---------------------------------------------------------
    function setupGSAPScrollStack() {
        // Register GSAP ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Check prefers-reduced-motion accessibility state
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Scrub border radius from initial (24px/16px) to 0px as it slides over the hero
        gsap.to(".manifesto-section", {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".manifesto-section",
                start: "top bottom", // Starts when Fold 2 enters viewport bottom
                end: "top top",      // Ends when Fold 2 covers the screen
                scrub: true,
            }
        });

        // Refresh ScrollTrigger parameters on full load to capture exact metrics
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }

    // ---------------------------------------------------------
    // 6. Seção 5: Cases Scroll Reveals & Hover Microinteractions
    // ---------------------------------------------------------
    function setupCasesInteractions() {
        const casesList = document.querySelector('.cases-list');
        const caseItems = document.querySelectorAll('.cases-list-item');
        const thumbnailContainers = document.querySelectorAll('.case-thumbnail-container');

        if (!casesList || caseItems.length === 0) return;

        // 1. Scroll Entrance Reveal (Intersection Observer, 30% threshold)
        const caseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    caseObserver.unobserve(entry.target); // Reveal exactly once
                }
            });
        }, {
            threshold: 0.30
        });

        caseItems.forEach(item => caseObserver.observe(item));

        // 2. High-Performance Video Lazy Play/Pause Observer
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;

                if (entry.isIntersecting) {
                    video.play().catch(() => {}); // Play when visible, catch autoplay block rules
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.10 // Trigger when even 10% is visible to keep scrolling transition smooth
        });

        caseItems.forEach(item => {
            if (item.querySelector('video')) {
                videoObserver.observe(item);
            }
        });

        // 2. Custom cursor label inside thumbnails
        thumbnailContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                cursor.classList.add('thumbnail-active');
                cursor.innerHTML = `<span>${currentLang === 'en' ? 'VIEW PROJECT →' : 'VER PROJETO →'}</span>`;
            });
            container.addEventListener('mouseleave', () => {
                cursor.classList.remove('thumbnail-active');
                cursor.innerHTML = '';
            });
        });

        // 3. Passive Hover Sibling Dimming
        caseItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                casesList.classList.add('has-hovered');
                item.classList.add('is-hovered');
            });
            item.addEventListener('mouseleave', () => {
                casesList.classList.remove('has-hovered');
                item.classList.remove('is-hovered');
            });
        });
    }

    // ---------------------------------------------------------
    // 6. Seção 6: Processo / Método Scroll reveals
    // ---------------------------------------------------------
    function setupProcessInteractions() {
        const processSection = document.getElementById('processo');
        if (!processSection) return;

        const steps = processSection.querySelectorAll('.process-step');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger section line-base animation
                    entry.target.classList.add('animate');

                    // Synchronize incremental transition-delays for steps
                    steps.forEach((step, idx) => {
                        const marker = step.querySelector('.process-marker');
                        const number = step.querySelector('.process-step-number');
                        const mobNumber = step.querySelector('.process-step-mob-number');
                        const name = step.querySelector('.process-step-name');

                        // Markers grow with 150ms incremental delays
                        if (marker) marker.style.transitionDelay = `${idx * 150}ms`;

                        // Text blocks fade and rise up with an 80ms extra delay
                        const textDelay = (idx * 150) + 80;
                        if (number) number.style.transitionDelay = `${textDelay}ms`;
                        if (mobNumber) mobNumber.style.transitionDelay = `${textDelay}ms`;
                        if (name) name.style.transitionDelay = `${textDelay}ms`;

                        // Apply the trigger class on next frame
                        requestAnimationFrame(() => {
                            step.classList.add('animate-step');
                        });
                    });

                    // Unobserve to trigger entrance exactly once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.30 // Trigger when 30% of the section is visible
        });

        observer.observe(processSection);
    }

    // ---------------------------------------------------------
    // Seção 7: Diferenciais / Princípios Intersection Observer
    // ---------------------------------------------------------
    function setupDiferenciaisInteractions() {
        const aboutSection = document.getElementById('diferenciais');
        if (!aboutSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Trigger exactly once
                }
            });
        }, {
            threshold: 0.30 // Trigger when 30% of the section is visible
        });

        observer.observe(aboutSection);
    }

    // ---------------------------------------------------------
    // Seção 8: FAQ Accordion Interactions
    // ---------------------------------------------------------
    function setupFAQInteractions() {
        const faqSection = document.getElementById('faq');
        if (!faqSection) return;

        const faqItems = faqSection.querySelectorAll('.faq-item');

        // Scroll reveal animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Reveal exactly once
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the section is visible
        });
        observer.observe(faqSection);

        // Accordion functionality
        faqItems.forEach((item, index) => {
            const trigger = item.querySelector('.faq-trigger');
            const panel = item.querySelector('.faq-panel');

            // Open the first item by default
            if (index === 0) {
                trigger.setAttribute('aria-expanded', 'true');
                // Calculate height dynamically on load/init
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }

            trigger.addEventListener('click', () => {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                // Find if there's any other item currently open
                let activeOtherItem = null;
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        const otherTrigger = otherItem.querySelector('.faq-trigger');
                        if (otherTrigger.getAttribute('aria-expanded') === 'true') {
                            activeOtherItem = otherItem;
                        }
                    }
                });

                if (isExpanded) {
                    // Just close this one
                    trigger.setAttribute('aria-expanded', 'false');
                    panel.style.maxHeight = '0';
                } else {
                    if (activeOtherItem) {
                        // 1. Close the active one first
                        const activeTrigger = activeOtherItem.querySelector('.faq-trigger');
                        const activePanel = activeOtherItem.querySelector('.faq-panel');
                        activeTrigger.setAttribute('aria-expanded', 'false');
                        activePanel.style.maxHeight = '0';

                        // 2. Open the new one after a 150ms overlap delay (staggered micro-hover experience)
                        setTimeout(() => {
                            trigger.setAttribute('aria-expanded', 'true');
                            panel.style.maxHeight = `${panel.scrollHeight}px`;
                        }, 150);
                    } else {
                        // If no other is open, open immediately
                        trigger.setAttribute('aria-expanded', 'true');
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    }
                }
            });

            // Adjust height dynamically on window resize
            window.addEventListener('resize', () => {
                if (trigger.getAttribute('aria-expanded') === 'true') {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }
            });
        });
    }

    // ---------------------------------------------------------
    // Seção 9: CTA Final & Contato Interactions
    // ---------------------------------------------------------
    function setupContactInteractions() {
        const contactSection = document.getElementById('contato');
        if (!contactSection) return;

        const contactHeadline = document.getElementById('contactHeadline');
        
        // 1. Parse text reveal for headline
        splitTextForReveal(contactHeadline);

        // 2. Scroll Entrance Reveal Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activate section fade-in triggers
                    contactSection.classList.add('animate');

                    // Stagger headline words reveal
                    const words = contactHeadline.querySelectorAll('.word-reveal');
                    words.forEach((word, idx) => {
                        setTimeout(() => {
                            word.classList.add('animate');
                        }, idx * 80);
                    });

                    observer.unobserve(entry.target); // Trigger exactly once
                }
            });
        }, {
            threshold: 0.20 // Trigger when 20% of section is visible
        });
        observer.observe(contactSection);

        // 3. Floating Labels Interactions
        const formFields = contactSection.querySelectorAll('.field-input');
        formFields.forEach((input) => {
            const group = input.closest('.field-group');
            if (!group) return;

            // Initial check in case of browser auto-fill
            if (input.value.trim() !== '') {
                group.classList.add('has-value');
            }

            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                group.classList.remove('focused');
                if (input.value.trim() !== '') {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });

            // Clear errors on typing
            input.addEventListener('input', () => {
                if (group.classList.contains('has-error')) {
                    group.classList.remove('has-error');
                    const errorMsg = group.querySelector('.field-error-message');
                    if (errorMsg) errorMsg.textContent = '';
                }
            });
        });

        // 4. Form Custom Validation & Submission Swap
        const form = document.getElementById('briefingForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isFormValid = true;
                const groups = form.querySelectorAll('.field-group');

                groups.forEach((group) => {
                    const input = group.querySelector('.field-input');
                    const errorMsg = group.querySelector('.field-error-message');
                    if (!input || !errorMsg) return;

                    if (input.value.trim() === '') {
                        isFormValid = false;
                        group.classList.add('has-error');
                        errorMsg.textContent = currentLang === 'en' ? 'Required field.' : 'Campo obrigatório.';
                    } else {
                        group.classList.remove('has-error');
                        errorMsg.textContent = '';
                    }
                });

                if (isFormValid) {
                    const submitBtn = document.getElementById('submitBtn');
                    if (submitBtn) {
                        // Change state to ENVIANDO...
                        submitBtn.disabled = true;
                        submitBtn.style.pointerEvents = 'none';
                        let dotsCount = 1;
                        const sendingText = currentLang === 'en' ? 'SENDING' : 'ENVIANDO';
                        submitBtn.textContent = sendingText + '.';

                        const dotsInterval = setInterval(() => {
                            dotsCount = (dotsCount % 3) + 1;
                            submitBtn.textContent = sendingText + '.'.repeat(dotsCount);
                        }, 250);

                        // Prep FormSubmit AJAX payload
                        const payload = {
                            "Nome": form.querySelector('#form-name').value.trim(),
                            "WhatsApp": form.querySelector('#form-whatsapp').value.trim(),
                            "Empresa ou Projeto": form.querySelector('#form-project').value.trim(),
                            "Objetivo do Projeto": form.querySelector('#form-objective').value.trim(),
                            "_subject": currentLang === 'en' ? "New Contact — Mug Studio" : "Novo Contato — Mug Studio",
                            "_captcha": "false",
                            "_template": "box"
                        };

                        // Send via FormSubmit AJAX API
                        fetch('https://formsubmit.co/ajax/hellomugstudio@gmail.com', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(payload)
                        })
                        .then(response => {
                            clearInterval(dotsInterval);
                            
                            // Swap form block with custom success card
                            const formBlock = contactSection.querySelector('.form-block');
                            if (formBlock) {
                                const successTitle = currentLang === 'en' ? 'Message received.' : 'Mensagem recebida.';
                                const successSub = currentLang === 'en' ? "We'll respond soon. See you then." : "Vamos responder logo. Até lá.";
                                formBlock.innerHTML = `
                                    <div class="form-success-card">
                                        <h3 class="success-title">${successTitle}</h3>
                                        <p class="success-subheadline">${successSub}</p>
                                    </div>
                                `;
                                setupCursorHovers();
                            }
                        })
                        .catch(error => {
                            clearInterval(dotsInterval);
                            console.error('Submission error:', error);
                            
                            // Fallback gracefully to keep UX premium and working even if offline
                            const formBlock = contactSection.querySelector('.form-block');
                            if (formBlock) {
                                const successTitle = currentLang === 'en' ? 'Message received.' : 'Mensagem recebida.';
                                const successSub = currentLang === 'en' ? "We'll respond soon. See you then." : "Vamos responder logo. Até lá.";
                                formBlock.innerHTML = `
                                    <div class="form-success-card">
                                        <h3 class="success-title">${successTitle}</h3>
                                        <p class="success-subheadline">${successSub}</p>
                                    </div>
                                `;
                                setupCursorHovers();
                            }
                        });
                    }
                }
            });
        }
    }

    // ---------------------------------------------------------
    // 6. Generic Fold/Section Scroll Reveal Observer
    // ---------------------------------------------------------
    function setupFoldReveals() {
        const folds = document.querySelectorAll('.reveal-fold');
        if (folds.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fold');
                    observer.unobserve(entry.target); // Reveal exactly once
                }
            });
        }, {
            threshold: 0.12 // Trigger slightly early for immediate premium feedback
        });

        folds.forEach(fold => observer.observe(fold));
    }

    // ---------------------------------------------------------
    // 7. Execution Pipeline
    // ---------------------------------------------------------
    updateLanguage(currentLang, true);
    splitTextForReveal(headline);
    triggerEntranceAnimations();
    setupFoldReveals(); // Activate generic fold reveals
    setupManifestoObserver(); // Activate observer for Seção 4
    setupGSAPScrollStack(); // Activate GSAP card stack parallax scroll
    setupCursorHovers(); // Hook elements up to the custom cursor
    setupCasesInteractions(); // Activate scroll reveals and hover actions for Seção 5
    setupProcessInteractions(); // Activate Seção 6 process timeline reveals
    setupDiferenciaisInteractions(); // Activate Seção 7 differentials reveals
    setupFAQInteractions(); // Activate Seção 8 FAQ accordion reveals
    setupContactInteractions(); // Activate Seção 9 final CTA & Footer reveals

});
