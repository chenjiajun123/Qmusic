export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?fromtag=38&guid=5931742855&vkey=${vkey}`
  })
}
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
export function songUrl(vkey, mid) {
  var url = `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${mid}.m4a?vkey=${vkey}&guid=1472133172&uin=0&fromtag=66`
  //  `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400004IsqcS2BilGv.m4a?guid=5802445895&vkey=&uin=0&fromtag=38
  return url
}
