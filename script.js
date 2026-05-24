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
                cursor.innerHTML = '<span>VER PROJETO →</span>';
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
                        errorMsg.textContent = 'Campo obrigatório.';
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
                        submitBtn.textContent = 'ENVIANDO.';

                        const dotsInterval = setInterval(() => {
                            dotsCount = (dotsCount % 3) + 1;
                            submitBtn.textContent = 'ENVIANDO' + '.'.repeat(dotsCount);
                        }, 250);

                        // Prep FormSubmit AJAX payload
                        const payload = {
                            "Nome": form.querySelector('#form-name').value.trim(),
                            "WhatsApp": form.querySelector('#form-whatsapp').value.trim(),
                            "Empresa ou Projeto": form.querySelector('#form-project').value.trim(),
                            "Objetivo do Projeto": form.querySelector('#form-objective').value.trim(),
                            "_subject": "Novo Contato — Mug Studio",
                            "_captcha": "false",
                            "_template": "box"
                        };

                        // Send via FormSubmit AJAX API
                        fetch('https://formsubmit.co/ajax/marinanassergui@gmail.com', {
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
                                formBlock.innerHTML = `
                                    <div class="form-success-card">
                                        <h3 class="success-title">Mensagem recebida.</h3>
                                        <p class="success-subheadline">Vamos responder logo. Até lá.</p>
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
                                formBlock.innerHTML = `
                                    <div class="form-success-card">
                                        <h3 class="success-title">Mensagem recebida.</h3>
                                        <p class="success-subheadline">Vamos responder logo. Até lá.</p>
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
