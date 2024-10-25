document.addEventListener('DOMContentLoaded', () => {
    setInterval(createSnowflake, 200);
});

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    const animationDuration = Math.random() * 5 + 5 + 's';
    snowflake.style.animationDuration = animationDuration;
    snowflake.style.opacity = Math.random();

    snowflake.style.animation = `fall ${parseInt(animationDuration)}s linear forwards`;

    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, parseInt(animationDuration) * 1000);
}