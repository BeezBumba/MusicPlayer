import { Player } from './player.js';
import { Playlist } from './playlist.js';
import { UI } from './ui.js';

class App {
  constructor() {
    this.player = new Player();
    this.playlist = new Playlist();
    this.ui = new UI(this.handleUIEvents.bind(this));
    
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // File upload handling
    document.getElementById('file-upload').addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.playlist.addSongs(files);
      this.ui.updatePlaylist(this.playlist.songs);
    });
  }

  handleUIEvents(event, data) {
    switch(event) {
      case 'play':
        this.player.togglePlay();
        break;
      case 'next':
        this.playlist.next();
        this.player.loadAndPlay(this.playlist.currentSong);
        break;
      case 'prev':
        this.playlist.previous();
        this.player.loadAndPlay(this.playlist.currentSong);
        break;
      case 'selectSong':
        this.playlist.setCurrentSong(data);
        this.player.loadAndPlay(this.playlist.currentSong);
        break;
      case 'seekTo':
        this.player.seekTo(data);
        break;
      case 'setVolume':
        this.player.setVolume(data);
        break;
    }
  }
}

// Initialize the app
new App();