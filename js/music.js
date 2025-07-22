class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }

}


const musicList = [
    new Music("Dethrone", "Bad Omens", "1.jpeg", "1.mp3"),
    new Music("ARTIFICIAL SUICIDE", "Bad Omens", "2.jpeg", "2.mp3"),
    new Music("Stitch", "Wage War", "3.jpeg", "3.mp3"),
];