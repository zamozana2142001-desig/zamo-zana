function openCard() {
    const splash = document.getElementById('splash-screen');
    const content = document.getElementById('invitation-content');

    // نیشاندانی ناوەڕۆکەکە پێش داخستنی ئەنیمەیشن، بۆ ئەوەی لەژێر دەروازەکەدا دیار بێت
    content.classList.remove('hidden');

    // ئەنیمەیشنی کردنەوەی دەروازە (دوو لاپەڕەی سپلاشەکە لادەدرێن)
    splash.classList.add('opening');

    // لابردنی سپلاش لە DOM دوای تەواوبوونی ئەنیمەیشنەکە
setTimeout(() => {
        splash.style.display = 'none'; // ئەمە زیاد بکە بۆ ئەوەی ڕێگری لە بینین نەکات
        splash.classList.add('hidden');
        revealSections();
    }, 850);
}

// دیارکردنی بەشەکان بە جوانی کاتێک دەگاتە بەرچاو (scroll reveal)
function revealSections() {
    const items = document.querySelectorAll('.reveal');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('in-view'), i * 90);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
}

// ژماردنەوەی ڕۆژەکانی ماوە بۆ ئاهەنگەکە
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const weddingDate = new Date('2026-07-17T19:00:00');

    function update() {
        const now = new Date();
        const diffMs = weddingDate - now;

        if (diffMs <= 0) {
            countdownEl.textContent = 'ئاهەنگەکە دەستی پێکردووە!';
            return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        countdownEl.textContent = `${days} ڕۆژ ماوە بۆ ئاهەنگەکە`;
    }

    update();
    setInterval(update, 1000 * 60 * 60);
}

document.addEventListener('DOMContentLoaded', startCountdown);