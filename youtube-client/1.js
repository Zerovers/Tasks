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

		//Request video parametrs
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


	// console.log('video',JSON.parse(xhr.response));
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
	// console.log('statistics\n',JSON.parse(xhr.response));

	let allviewers = [];
	let item = JSON.parse(xhr.response);

	for(let i = 0; i < item.items.length; i += 1) {
		allviewers.push(item.items[i].statistics.viewCount);
	}

	return allviewers;

}

function create(c) {
			//Create elements in desctop
		for(let i = 0; i < c[1].length; i += 1) {
		let content = document.querySelector('.content');
		let div = element('div',{className: 'test'});
		let img = element('img',{src: c[1][i]});
		let name = element('p',{innerHTML: c[2][i], className: 'chanel'});
		let time = element('p',{innerHTML: c[3][i], className: 'time'});
		let viewer = element('p', {innerHTML: c[6][i], className: 'count'});
		let discription = element('div',{innerHTML: c[4][i], className: 'discription'});
		let title = element('div',{className: 'title'});
		let link = element('a',{innerHTML: c[5][i], href: 'https://www.youtube.com/watch?v='+c[0][i] });

		content.appendChild(div);
		div.appendChild(img);
		div.appendChild(name);
		div.appendChild(time);
		div.appendChild(viewer);
		div.appendChild(discription);
		div.appendChild(title);
		title.appendChild(link);
		
	}
}


let search = document.querySelector('.search');
search.addEventListener('change', e => {
let result = e.target.value;	
let a = videoRequest(result);
let b = statisticRequest(a);
a.push(b);

let divcontent = document.querySelector('.content');
let divtest = document.querySelector('.test');

if(divcontent.contains(divtest)) {
	divcontent.remove();
	let newcontent = element('div',{className: 'content'});
	let body = document.querySelector('.body');
	body.appendChild(newcontent);
	create(a);
	} else {
	create(a);
	}
});	

function element(name, obj) {
	let a = document.createElement(name);
	for(let key in obj) {
		a[key] = obj[key];
	}
	return a;
}

