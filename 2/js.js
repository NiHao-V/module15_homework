const button = document.querySelector('.button');

button.addEventListener('click', function() {
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    const message = `Размеры экрана: ${screenWidth} x ${screenHeight}`;
    alert(message);
});
