import { renderVideo } from './renderElement';

function statisticRequest(video) {
  const url = 'https://www.googleapis.com/youtube/v3/videos?';
  const params = {
    part: 'part=statistics',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    id: `id= ${video.map(e => e.id).join(',')} &`,
  };
  const videos = video;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.key + params.id + params.part, false);
  xhr.send();
  const item = JSON.parse(xhr.response);
  item.items.forEach((e, i) => { videos[i].viewers = e.statistics.viewCount; });
}
function addVideo(a) {
  a.forEach((e) => { e.doomelement = renderVideo(e); });
}
export function makeVideoRequest(searchTerm) {
  const url = 'https://www.googleapis.com/youtube/v3/search?';
  const params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    q: `q= ${searchTerm}`,
    type: 'type=video&',
    maxResults: 'maxResults=15&',
  };
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.key + params.type + params.part + params.maxResults + params.q, false);
  xhr.send();
  const item = JSON.parse(xhr.response);
  const map = item.items.map((a) => {
    let time = a.snippet.publishedAt;
    time = time.split('T');
    return {
      id: a.id.videoId,
      photo: a.snippet.thumbnails.high.url,
      Name: a.snippet.channelTitle,
      time: time[0],
      discription: a.snippet.description,
      title: a.snippet.title,
      pageToken: item.nextPageToken,
    };
  });
  statisticRequest(map);
  addVideo(map);
  return map;
}
export function makeRequestPageToken(searchTerm, obj) {
  const url = 'https://www.googleapis.com/youtube/v3/search?';
  const params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
    q: `q= ${searchTerm}`,
    type: 'type=video&',
    maxResults: 'maxResults=15&',
    pageToken: `pageToken= ${obj[obj.length - 1].pageToken}$ &`,
  };
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + params.pageToken + params.key + params.type + params.part + params.maxResults + params.q, false);
  xhr.send();
  const item = JSON.parse(xhr.response);
  const map2 = item.items.map((a) => {
    let time = a.snippet.publishedAt;
    time = time.split('T');
    return {
      id: a.id.videoId,
      photo: a.snippet.thumbnails.medium.url,
      Name: a.snippet.channelTitle,
      time: time[0],
      discription: a.snippet.description,
      title: a.snippet.title,
      pageToken: item.nextPageToken,
    };
  });
  statisticRequest(map2);
  addVideo(map2);
  return map2;
}
