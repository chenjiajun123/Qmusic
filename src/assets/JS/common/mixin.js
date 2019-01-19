import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playmode} from '../common/playMode'
import {shuffle} from '../common/util' 
export const playlistMixin = {
    computed: {
      ...mapGetters([
        'playlist'
      ])
    },
    mounted() {
      this.handlePlaylist(this.playlist)
      
    },
    activated() {
      this.handlePlaylist(this.playlist)
    },
    watch: {
      playlist(newVal) {
        this.handlePlaylist(newVal)
      }
    },
    methods: {
      handlePlaylist() {
        throw new Error('component must implement handlePlaylist method')
      }
    }
  }