// 当整个网页文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // --- 功能一：导航栏平滑滚动 ---
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认的瞬间跳转行为
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // 核心：平滑滚动
                    block: 'start' // 滚动到目标区域的顶部
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
                hitokoto.innerHTML = `“${data.hitokoto}”`; // 使用innerHTML来解析<i>等标签
            })
            .catch(console.error);
    }

    // --- 功能三：滚动时元素淡入动画 ---
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.isIntersecting 是一个布尔值，表示目标元素是否进入视口
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：一旦动画触发后，就停止观察该元素，以提升性能
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 元素进入视口10%时触发动画
    });

    // 观察所有带 .card 类的元素
    cards.forEach(card => {
        observer.observe(card);
    });

});
