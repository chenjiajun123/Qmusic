import {playMode} from '../assets/JS/common/playMode.js'
import {loadSearch, loadPlay, loadFavorite} from '../assets/JS/common/cache'
const state={
  playing: false, // 是播放状态
  fullScreen: false, // 播放页面的展开收起
  playlist: [], // 当前播放列表
  sequenceList: [], // 顺序的列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  vkey: "", // 请求歌曲播放源时的key
  favoriteList: loadFavorite(), // 收藏歌曲
  playHistory: loadPlay() // 播放历史
}
export default state