document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const grids = document.querySelectorAll('.ai-grid');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            grids.forEach(grid => {
                const cards = grid.querySelectorAll('.ai-card');
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    const tags = card.getAttribute('data-tags') || '';
                    if (text.includes(query) || tags.includes(query)) {
                        card.classList.remove('hidden');
                        if (!card.classList.contains('animate-in')) card.classList.add('animate-in');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('animate-in');
                    }
                });
            });
        });
    }

    // Animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.querySelectorAll('.ai-card').forEach((card, cardIndex) => {
                        setTimeout(() => { card.classList.add('animate-in'); }, cardIndex * 100);
                    });
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => { observer.observe(section); });
});
