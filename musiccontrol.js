document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const toggleButton = document.getElementById('toggleButton');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    let isPlaying = false;

    toggleButton.addEventListener('click', function () {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => {
                console.error('Play failed:', error);
            });
        }

        isPlaying = !isPlaying;
        toggleButton.classList.toggle('active');
        playIcon.style.display = isPlaying ? 'none' : 'inline';
        pauseIcon.style.display = isPlaying ? 'inline' : 'none';
    });

    audio.addEventListener('pause', function () {
        isPlaying = false;
    });
});
