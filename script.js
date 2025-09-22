// 当整个网页文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // --- 功能一：导航栏平滑滚动 ---
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 功能二：获取并显示“一言” ---
    const hitokoto = document.getElementById('hitokoto_text');
    if (hitokoto) {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                hitokoto.innerHTML = `“${data.hitokoto}”`;
            })
            .catch(console.error);
    }

    // --- 功能三：滚动时元素淡入动画 ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });

});
