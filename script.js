document.addEventListener('DOMContentLoaded', function() {

    // --- 功能一：导航栏平滑滚动 ---
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
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

    // --- 功能四：可关闭弹窗 (Modal) 功能 ---
    const openModalBtn = document.getElementById('open-modal-btn');
    const modalOverlay = document.getElementById('activities-modal-overlay');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const sidebarContent = document.querySelector('#weekly-activities-sidebar .sidebar-content');
    const modalContentArea = document.getElementById('modal-activities-content');

    function openModal() {
        if (sidebarContent && modalContentArea) {
            const contentToClone = sidebarContent.cloneNode(true);
            modalContentArea.innerHTML = '';
            modalContentArea.appendChild(contentToClone);
            modalOverlay.classList.add('visible');
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('visible');
        }
    }
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('visible')) {
            closeModal();
        }
    });

    // ======================================================================
    // ========== 功能五：侧边栏伸缩功能 (这是关键代码！) ==========
    // ======================================================================
    const sidebar = document.getElementById('weekly-activities-sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');

    if (sidebar && toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            // 核心功能：切换 'collapsed' CSS 类
            sidebar.classList.toggle('collapsed');
        });
    }

});
