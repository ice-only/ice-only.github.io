// 当整个网页文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // --- 功能一：导航栏平滑滚动 ---
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // 排除新加的弹窗按钮
        if (link.id !== 'open-modal-btn') {
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
        }
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

    // ======================================================================
    // ========== (新) 功能四：可关闭弹窗 (Modal) 功能 ==========
    // ======================================================================
    
    // 1. 获取所有需要的元素
    const openModalBtn = document.getElementById('open-modal-btn');
    const modalOverlay = document.getElementById('activities-modal-overlay');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const sidebarContent = document.querySelector('#weekly-activities-sidebar .sidebar-content');
    const modalContentArea = document.getElementById('modal-activities-content');

    // 2. 定义打开弹窗的函数
    function openModal() {
        // 复制侧边栏内容到弹窗
        // cloneNode(true) 表示深度复制，包含所有子元素
        const contentToClone = sidebarContent.cloneNode(true);
        // 清空弹窗旧内容
        modalContentArea.innerHTML = '';
        // 填入新内容
        modalContentArea.appendChild(contentToClone);
        
        // 显示弹窗
        modalOverlay.classList.add('visible');
    }

    // 3. 定义关闭弹窗的函数
    function closeModal() {
        modalOverlay.classList.remove('visible');
    }
    
    // 4. 绑定事件
    // 点击“查看活动”按钮，打开弹窗
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止链接的默认跳转行为
        openModal();
    });

    // 点击关闭按钮，关闭弹窗
    closeModalBtn.addEventListener('click', closeModal);
    
    // 点击弹窗外的灰色区域，关闭弹窗
    modalOverlay.addEventListener('click', function(e) {
        // 如果点击的目标是遮罩层本身，而不是弹窗内容
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // 按下 "Escape" 键，关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

});
