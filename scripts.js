function checkSymbol(event) {
    // Отримуємо код натиснутої клавіші
    var kc = event.keyCode || event.which;

    // Перевіряємо, чи це десяткова цифра (коди від 48 до 57)
    if (kc < 48 || kc > 57) {
        event.preventDefault(); // Скасовуємо введення символу
        return false;
    }

    return true;
}



let activeContextMenu = null;

function showCustomContextMenu(event) {
    event.preventDefault();

    if (activeContextMenu) {
        closeContextMenu();
    }

    const contextMenu = document.createElement('div');
    contextMenu.className = 'custom-context-menu';

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    contextMenu.style.position = 'fixed';
    contextMenu.style.left = `${mouseX}px`;
    contextMenu.style.top = `${mouseY}px`;

    const menuItems = [
        { label: '- Скопіювати вміст документа -', action: copyDocumentContent },
        { label: '- Закрити вікно -', action: confirmAndCloseWindow },
        { label: '- Збільшити шрифт -', action: increaseFontSize },
        { label: '- Зменшити шрифт -', action: decreaseFontSize },
        { label: '- Попередній шрифт -', action: resetFontSize },
        { label: '- Змінити колір фону -', action: changeBackgroundColor }  
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.textContent = item.label;
        menuItem.addEventListener('click', () => {
            item.action();
            closeContextMenu();
        });
        contextMenu.appendChild(menuItem);
    });

    document.body.appendChild(contextMenu);

    activeContextMenu = contextMenu;

    document.addEventListener('click', closeContextMenu);
}

function closeContextMenu() {
    if (activeContextMenu) {
        activeContextMenu.remove();
        activeContextMenu = null;
    }
    document.removeEventListener('click', closeContextMenu);
}

function copyDocumentContent() {
    const range = document.createRange();
    range.selectNode(document.body);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function confirmAndCloseWindow() {
    if (confirm("Ви дійсно хочете закрити вкладку?")) {
        const newWindow = window.open('about:blank', '_self');
        newWindow.close();
    }
}

function increaseFontSize() {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
        const currentSize = window.getComputedStyle(element).fontSize;
        const newSize = parseFloat(currentSize) + 1;
        element.style.fontSize = `${newSize}px`;
    });
}

function decreaseFontSize() {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
        const currentSize = window.getComputedStyle(element).fontSize;
        const newSize = Math.max(parseFloat(currentSize) - 1, 10);
        element.style.fontSize = `${newSize}px`;
    });
}

function resetFontSize() {
    const elements = document.querySelectorAll('body, body *');
    elements.forEach(element => {
        element.style.fontSize = '';
    });
}

function changeBackgroundColor() {
    const colors = ['rgb(50, 167, 37)', 'rgb(162, 15, 195)', 'rgb(218, 158, 7)', 'rgb(186, 16, 16)', 'rgb(186, 16, 132)'];
    const currentColor = window.getComputedStyle(document.body).backgroundColor;
    const currentIndex = colors.indexOf(currentColor);
    const newColor = colors[(currentIndex + 1) % colors.length];
    document.body.style.backgroundColor = newColor;
}

document.addEventListener('contextmenu', showCustomContextMenu);