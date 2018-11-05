function videoRequest(searchTerm) {
  let url = 'https://www.googleapis.com/youtube/v3/search?';
  let params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
		q: 'q='+searchTerm,
		type: 'type=video&',
		maxResults: 'maxResults=4&'
  };
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url+params.key+params.type+params.part+params.maxResults+params.q , false);
  xhr.send();
  if (xhr.status != 200) {
   	console.log(xhr); 
  } else {
   	console.log(xhr); 
	}

	let allid = [];
	let allphoto = [];
	let allName = [];
	let alltime = [];
	let alldiscription = [];
	let alltitle = [];
	let item = JSON.parse(xhr.response);

		for(let i = 0; i < item.items.length; i += 1) {
			allid.push(item.items[i].id.videoId);
		}
		for(let i = 0; i < item.items.length; i += 1) {
			allphoto.push(item.items[i].snippet.thumbnails.medium.url);
		}
		for(let i = 0; i < item.items.length; i += 1) {
			allName.push(item.items[i].snippet.channelTitle);
		}
		for(let i = 0; i < item.items.length; i += 1) {
			let time = item.items[i].snippet.publishedAt;
			time = time.split('T');
			alltime.push(time[0]);
		}
		for(let i = 0; i < item.items.length; i += 1) {
			alldiscription.push(item.items[i].snippet.description);
		}
		for(let i = 0; i < item.items.length; i += 1) {
			alltitle.push(item.items[i].snippet.title);
		}


	console.log('video',JSON.parse(xhr.response));
	console.log([allid,allphoto,allName,alltime,alldiscription,alltitle]);
	return [allid,allphoto,allName,alltime,alldiscription,alltitle];
}

function statisticRequest(video) {
  let url = 'https://www.googleapis.com/youtube/v3/videos?';
  let params = {
    part: 'part=snippet,statistics',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
		id: 'id='+video[0].join(',')+'&'
	};

	let xhr = new XMLHttpRequest();
  xhr.open('GET', url+params.key+params.id+params.part, false);
	xhr.send();
	
  if (xhr.status != 200) {
   	console.log(xhr); 
  } else {
   	console.log(xhr); 
	}
	console.log('statistics\n',JSON.parse(xhr.response));

	let allviewers = [];
	let item = JSON.parse(xhr.response);

	for(let i = 0; i < item.items.length; i += 1) {
		allviewers.push(item.items[i].statistics.viewCount);
	}
	console.log(allviewers);
	return allviewers;

}

function create(c) {

		for(let i = 0; i < c[1].length; i += 1) {
		let content = document.querySelector('.content');
		let div = document.createElement('div');
		let img = document.createElement('img');
		let name = document.createElement('p');
		let time = document.createElement('p');
		let viewer = document.createElement('p')
		let discription = document.createElement('div');
		let title = document.createElement('div');
		let link = document.createElement('a');

		div.className = 'test';
		img.src = c[1][i];
		name.innerHTML = c[2][i];
		time.innerHTML = c[3][i];
		viewer.innerHTML = c[6][i];
		discription.innerHTML = c[4][i];
		discription.className = 'discription';
		link.innerHTML = c[5][i];
		link.href = 'https://www.youtube.com/watch?v='+c[0][i];
		title.className = 'title';

		content.appendChild(div);
		div.appendChild(img);
		div.appendChild(name);
		div.appendChild(time);
		div.appendChild(viewer);
		div.appendChild(discription);
		title.appendChild(link);
		div.appendChild(title);
	}
}


let search = document.querySelector('.search');
search.addEventListener('change', e => {
let result = e.target.value;	
let a = videoRequest(result);
let b = statisticRequest(a);
a.push(b);
console.log(result);
console.log(a);

let divcontent = document.querySelector('.content');
let divtest = document.querySelector('.test');

if(divcontent.contains(divtest)) {
	divcontent.remove();
	let newcontent = document.createElement('div');
	let body = document.querySelector('.body');
	newcontent.className = 'content';
	body.appendChild(newcontent);
	create(a);
	} else {
	create(a);
	}
});	