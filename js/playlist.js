export class Playlist {
  constructor() {
    this.songs = [];
    this.currentIndex = -1;
    this.autoplay = true; // Always on
    this.shuffle = true;  // Always on
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Remove the event listener from here since it's now handled in App.js
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
    if (this.songs.length === 0) return;
    // Always use shuffle behavior since shuffle is always on
    this.currentIndex = Math.floor(Math.random() * this.songs.length);
  }

  previous() {
    if (this.songs.length === 0) return;
    // Always use shuffle behavior since shuffle is always on
    this.currentIndex = Math.floor(Math.random() * this.songs.length);
  }

  setCurrentSong(songId) {
    const index = this.songs.findIndex(song => song.id === songId);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }
}