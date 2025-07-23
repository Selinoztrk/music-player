const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const repeat = document.querySelector("#repeat");
const shuffle = document.querySelector("#shuffle");
const audio = document.querySelector("#audio");


let isRepeat = false;
let isShuffle = false;
let muteState = "unmuted";


const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});


repeat.addEventListener("click", () => {
    isRepeat = !isRepeat;
    if (isRepeat) {
        isShuffle = false;
        shuffle.classList.remove("active");
    }
    repeat.classList.toggle("active", isRepeat);
});


shuffle.addEventListener("click", () => {
    isShuffle = !isShuffle;
    if (isShuffle) {
        isRepeat = false;
        repeat.classList.remove("active");
    }
    shuffle.classList.toggle("active", isShuffle);
});


const displayMusic = (music) => {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}


play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});


prev.addEventListener("click", () => { prevMusic(); });


next.addEventListener("click", () => { nextMusic(); });


const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


const pauseMusic = () => {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}


const playMusic = () => {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}


volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(muteState === "unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }
    else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});


const calculateTime = (totalSeconds) => {
    const minute = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const updatedSeconds = seconds < 10 ? `0${seconds}`: `${seconds}`;
    const result = `${minute}:${updatedSeconds}`;
    return result;
}


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});


audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});


progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});


audio.addEventListener("ended", () => {
    console.log("Şarkı bitti");
    if (isRepeat) {
        audio.currentTime = 0;
        playMusic();
        return;
    }

    if (isShuffle) {
        if (player.musicList.length > 1) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * player.musicList.length);
            } while (randomIndex === player.currentIndex);
            player.currentIndex = randomIndex;
        } else {
            player.currentIndex = 0;
        }

        let music = player.getMusic();
        displayMusic(music);
        playMusic();
        return;
    }

    if (player.currentIndex < player.musicList.length - 1) {
        nextMusic();
    } else {
        pauseMusic();
    }
});
