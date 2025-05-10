document.addEventListener('DOMContentLoaded', function() {
    // Определяем текущую страницу
    const path = window.location.pathname.split('/').pop();
    let currentPage = 'index'; // значение по умолчанию
    
    if (path === 'history.html') {
        currentPage = 'history';
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/history-images.css';
        document.head.appendChild(link);
    }
    else if (path === 'contacts.html') currentPage = 'contacts';
    
    // Загружаем контент
    const content = pageContent[currentPage];
    const contentSection = document.getElementById('content');
    
    // Создаем HTML для контента
    let html = '';
    
    // Особый рендеринг для страницы истории
    if (currentPage === 'history') {
    html = content.sections.map(section => `
        <section class="history-section">
            <div class="history-text-block">
                <h3 class="history-subtitle">${section.title}</h3>
                <div class="history-text">${section.text}</div>
            </div>
            
            ${section.images && section.images.length > 0 ? `
            <div class="history-gallery">
                ${section.images.map(img => `
                    <div class="image-container">
                        <img src="images/${typeof img === 'object' ? img.src : img}" 
                             alt="${typeof img === 'object' ? img.alt : img.split('.')[0]}" 
                             class="img-history">
                        ${typeof img === 'object' && img.caption ? 
                          `<p class="image-caption">${img.caption}</p>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </section>
    `).join('');
}
    else {
        // Стандартный рендеринг для других страниц
        if (content.title) {
            html += `<h2 class="${currentPage}-title">${content.title}</h2>`;
        }
        html += `<div class="${currentPage}-text">${content.text}</div>`;
        
        if (content.images && content.images.length > 0) {
            const galleryClass = `${currentPage}-gallery`;
            const imageClass = `img-${currentPage}`;
            
            html += `<div class="${galleryClass}">`;
            content.images.forEach(img => {
                const imgData = typeof img === 'object' ? img : { src: img, alt: img.split('.')[0] };
                html += `<img src="images/${imgData.src}" alt="${imgData.alt}" class="${imageClass}">`;
            });
            html += '</div>';
        }
    }
    
    // Вставляем контент на страницу
    contentSection.innerHTML = html;
    
    // Обновляем активную ссылку в навигации
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === path || 
            (currentPage === 'index' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});