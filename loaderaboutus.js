var loaderContainer = document.querySelector('.loader-container');

function showLoader() {
    loaderContainer.classList.remove('hidden');
}

function hideLoader() {
    loaderContainer.classList.add('hidden');
}


showLoader();
setTimeout(function() {
    hideLoader();
}, 3000);
