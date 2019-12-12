                /* Переменные */
const container = document.querySelector('.container');
const songsContainer = container.querySelector('.songs-container');
const addButton = container.querySelector('.input__btn_add');
const resetButton = container.querySelector('.input__btn_reset');
const coverHeading = document.querySelector('.cover__heading');
const form = document.forms.add;

const playListTitles = [
    'Моя музыка',
    'Музыка друзей',
    'Подборка музыки'
];


                /* Функции */

// перерисовывает блок добавленных песен
function renderAdded() {
    const songs = songsContainer.querySelectorAll('.song');
    const noSongsElement = container.querySelector('.no-songs');


    if (songs.length === 0) {
        resetButton.setAttribute('disabled', true);
        resetButton.classList.add('input__btn_disabled');
        noSongsElement.classList.remove('no-songs_hidden');
    } else {
    resetButton.removeAttribute('disabled');
    resetButton.classList.remove('input__btn_disabled');
    noSongsElement.classList.add('no-songs_hidden');
    }
}

// создает элемент песни и возвращает его
function createSong(artistValue, songValue) {
    const trackContainer = document.createElement('div');
    const artistElement = document.createElement('h4');
    const titleElement = document.createElement('p');
    const songButtonElement = document.createElement('button');


    trackContainer.classList.add('song');
    artistElement.classList.add('song__artist');
    artistElement.textContent = artistValue;
    titleElement.classList.add('song__title');
    titleElement.textContent = songValue;
    songButtonElement.classList.add('song__like');


    trackContainer.appendChild(artistElement);
    trackContainer.appendChild(titleElement);
    trackContainer.appendChild(songButtonElement);


    return trackContainer;
}

// добавляет элемент песни
function addSong(event) {
    event.preventDefault();


    const artist = form.elements.artist;
    const song = form.elements.song;
    const trackContainer = createSong(artist.value, song.value);


    songsContainer.appendChild(trackContainer);
    form.reset();
    renderAdded();
    addButton.setAttribute('disabled', true);
    addButton.classList.add('input__btn_disabled');
}

// обработчик клика по кнопке 'Очистить плейлист'
function resetPlaylist() {
    songsContainer.innerHTML = '';
    renderAdded();
}

// обработчик двойного клика
function doubleClickHandler(event) {
    event.target.textContent = playListTitles[Math.floor(Math.random() * playListTitles.length)];


    document.querySelector('.cover__heading').removeEventListener('dblclick', doubleClickHandler);
}

// обработчик события input
function inputHandler() {
    const artist = event.currentTarget.elements.artist;
    const song = event.currentTarget.elements.song;


    if (artist.value.length === 0 || song.value.length === 0) {
      addButton.setAttribute('disabled', true);
      addButton.classList.add('input__btn_disabled');
    } else {
      addButton.removeAttribute('disabled');
      addButton.classList.remove('input__btn_disabled');
    }
}

function likeHandler(event) {
    if (event.target.classList.contains('song__like')) {
        event.target.classList.toggle('song__like_active');
    }
}

                /* Слушатели событий */

resetButton.addEventListener('click', resetPlaylist);
coverHeading.addEventListener('dblclick', doubleClickHandler);
document.forms.add.addEventListener('submit', addSong);
songsContainer.addEventListener('click', likeHandler);
form.addEventListener('input', inputHandler);
form.addEventListener('submit', addSong);

/* Вызов функций */

renderAdded();