// --- 1. 라이트/다크 모드 로직 (공통) ---
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const modeText = document.getElementById('mode-text');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark' && toggleSwitch) {
        toggleSwitch.checked = true;
        if(modeText) modeText.innerText = "Dark";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if(modeText) modeText.innerText = "Dark";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if(modeText) modeText.innerText = "Light";
    }
}
if(toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);


// --- 2. 페이지 로드 후 실행될 기능들 ---
document.addEventListener('DOMContentLoaded', () => {

    // A. GLightbox 초기화 (라이브러리가 로드되었을 때만 실행)
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            zoomable: true,
            preload: true
        });
        // 전역에서 접근 가능하도록 설정 (필터링 시 필요)
        window.lightbox = lightbox;
    }

    // B. INFO 페이지 전용 슬라이더 (Swiper가 로드되었고 요소가 있을 때만)
    if (typeof Swiper !== 'undefined' && document.querySelector('.infoSwiper')) {
        new Swiper(".infoSwiper", {
            loop: true,
            speed: 1000,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }

    // C. 갤러리 초기 필터링 실행
    if (document.getElementsByClassName("gallery-item").length > 0) {
        filterSelection('all');
    }
});


// --- 3. 갤러리 필터링 함수 (전역 유지) ---
function filterSelection(c, btn) {
    const x = document.getElementsByClassName("gallery-item");
    const category = c === "all" ? "" : c;
    
    for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("show");
        if (x[i].className.indexOf(category) > -1) {
            x[i].classList.add("show");
        }
    }
    
    if (btn) {
        const btns = document.getElementsByClassName("filter-btn");
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("active");
        }
        btn.classList.add("active");
    }

    // 필터링 후 라이트박스 갱신 (에러 방지 처리)
    if (window.lightbox) {
        window.lightbox.reload();
    }
}