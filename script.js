              /* Классы */


class Song {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }

    createSong() {
        const trackContainer = document.createElement('div');
        const artistElement = document.createElement('h4');
        const titleElement = document.createElement('p');
        const songButtonElement = document.createElement('button');

        trackContainer.classList.add('song');
        artistElement.classList.add('song__artist');
        artistElement.textContent = this.artist;
        titleElement.classList.add('song__title');
        titleElement.textContent = this.title;
        songButtonElement.classList.add('song__like');

        trackContainer.appendChild(artistElement);
        trackContainer.appendChild(titleElement);
        trackContainer.appendChild(songButtonElement);

        this.songElement = trackContainer;

        return trackContainer;
    }

    setEventListeners() {
        this
        .songElement
        .querySelector('.song__like')
        .addEventListener('click', this.like);
    }

    like(event) {
        event.target.classList.toggle('song__like_active');
    }
}

class Playlist {
    constructor(container) {
        this.container = container;
        this.songs = [];
    }

    render() {
        const noSongsElement = document.querySelector('.no-songs');

        if (this.songs.length === 0) {
            resetButton.setAttribute('disabled', true);
            resetButton.classList.add('input__btn_disabled');
            noSongsElement.classList.remove('no-songs_hidden');
        } else {
            resetButton.removeAttribute('disabled');
            resetButton.classList.remove('input__btn_disabled');
            noSongsElement.classList.add('no-songs_hidden');
        }
    }

    addSong(songElement) {
        // добавляем объект песни в пустой массив
        this.songs.push(songElement);
        // добавялем элемент в контейнер
        this.container.appendChild(songElement);
        // вызываем метод для обновления блока
        this.render();
    }

    reset() {
        this.songs = [];
        this.container.innerHTML = '';
        this.render();
    }
}


/* Переменные */
const addButton = document.querySelector('.input__btn_add');
const resetButton = document.querySelector('.input__btn_reset');
const coverHeading = document.querySelector('.cover__heading');
const form = document.forms.add;
const playListTitles = [
    'Моя музыка',
    'Музыка друзей',
    'Подборка музыки'
];

const playlist = new Playlist(document.querySelector('.songs-container'));

playlist.render();



                /* Функции */

// обработчик двойного клика
function doubleClickHandler(event) {
    event.target.textContent = playListTitles[Math.floor(Math.random() * playListTitles.length)];

    document.querySelector('.cover__heading').removeEventListener('dblclick', doubleClickHandler);
}

// обработчик события input
function inputHandler() {
    const artist = event.currentTarget.elements.artist;
    const title = event.currentTarget.elements.title;

    if (artist.value.length === 0 || title.value.length === 0) {
      addButton.setAttribute('disabled', true);
      addButton.classList.add('input__btn_disabled');
    } else {
      addButton.removeAttribute('disabled');
      addButton.classList.remove('input__btn_disabled');
    }
}

                /* Слушатели событий */


coverHeading.addEventListener('dblclick', doubleClickHandler);
form.addEventListener('input', inputHandler);

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = form.elements.title;
    const artist = form.elements.artist;
    const song = new Song(title.value, artist.value);

    playlist.addSong(song.createSong());
    song.setEventListeners();
    form.reset();
    inputHandler();
});

resetButton.addEventListener('click', function () {
    playlist.reset();
    playlist.render();
});