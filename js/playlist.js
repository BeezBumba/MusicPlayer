export class Playlist {
  constructor() {
    this.songs = [];
    this.currentIndex = -1;
    this.autoplay = false;
    this.shuffle = false;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('songEnded', () => {
      if (this.autoplay) {
        this.next();
        document.dispatchEvent(new CustomEvent('playSong', {
          detail: this.currentSong
        }));
      }
    });
  }

  addSongs(files) {
    const newSongs = files.map(file => ({
      file,
      name: file.name,
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    this.songs.push(...newSongs);
    
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    }
  }

  get currentSong() {
    return this.songs[this.currentIndex];
  }

  next() {
    if (this.shuffle) {
      this.currentIndex = Math.floor(Math.random() * this.songs.length);
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    }
  }

  previous() {
    if (this.shuffle) {
      this.currentIndex = Math.floor(Math.random() * this.songs.length);
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    }
  }

  setCurrentSong(songId) {
    const index = this.songs.findIndex(song => song.id === songId);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }

  toggleAutoplay() {
    this.autoplay = !this.autoplay;
    return this.autoplay;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
    return this.shuffle;
  }
}
