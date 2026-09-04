
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.quick-links-toggle');
    const quickLinksList = document.querySelector('.quick-links-list');

    toggleBtn.addEventListener('click', () => {
        quickLinksList.classList.toggle('show');
    });
});
