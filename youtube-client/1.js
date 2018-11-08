	//Request video parametrs
function videoRequest(searchTerm) {
  let url = 'https://www.googleapis.com/youtube/v3/search?';
  let params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
		q: 'q='+searchTerm,
		type: 'type=video&',
		maxResults: 'maxResults=15&'
  };
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url+params.key+params.type+params.part+params.maxResults+params.q , false);
  xhr.send();
  if (xhr.status != 200) {
   	console.log(xhr); 
  } else {
   	console.log(xhr); 
	}

	let item = JSON.parse(xhr.response);
	let map = item.items.map(a => {
			let time = a.snippet.publishedAt;
			time = time.split('T');
			return {
				id: a.id.videoId,
				photo: a.snippet.thumbnails.medium.url,
				Name: a.snippet.channelTitle,
				time: time[0],
				discription: a.snippet.description,
				title: a.snippet.title,
			}
	});
	statisticRequest(map);
	console.log('map', map);
	// console.log('video',JSON.parse(xhr.response));
	return map;
}

function statisticRequest(video) {
  let url = 'https://www.googleapis.com/youtube/v3/videos?';
  let params = {
    part: 'part=snippet,statistics',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
		id: 'id='+video.map(e => e.id).join(',')+'&'
	};

	let xhr = new XMLHttpRequest();
  xhr.open('GET', url+params.key+params.id+params.part, false);
	xhr.send();
	
  if (xhr.status != 200) {
   	console.log(xhr); 
  } else {
   	console.log(xhr); 
	}
	//  console.log('statistics\n',JSON.parse(xhr.response));

	let item = JSON.parse(xhr.response);
	item.items.forEach((e,i) => 
	video[i].viewers = e.statistics.viewCount
	);
}
	// Event find content in input
let search = document.querySelector('.search');
search.addEventListener('change', e => {
	let currentPage = 0;
	let result = e.target.value;	
	let info = videoRequest(result);
	let	body = document.querySelector('.body');
	let butt = element('div', {className: 'button'});
	let left = element('div', {className: 'left'});
	let right = element('div', {className: 'right'});
	let pageCount = element('div', {innerHTML: currentPage+1,className: 'page-count'});
	butt.appendChild(left);
	butt.appendChild(pageCount);
	butt.appendChild(right);
	body.appendChild(butt);
	renderPage(info,currentPage);

	right.addEventListener('click', e => {
		// let unvisible =  document.querySelector('.visible');
		// unvisible.classList.remove('visible');
		matrix = document.querySelector('.matrix');
		child =  document.querySelector('.visible');
		matrix.removeChild(child)
		currentPage += 1;
		pageCount.innerHTML = currentPage+1;
		renderPage(info,currentPage);
	});	

	left.addEventListener('click', e => {
		matrix = document.querySelector('.matrix');
		child =  document.querySelector('.visible');
		matrix.removeChild(child)
		if(currentPage === 0) {
			currentPage += 1;
		}
		currentPage -= 1;
		pageCount.innerHTML = currentPage+1;
		renderPage(info,currentPage);
	});
});	

	//Create element
function element(name, obj) {
	let a = document.createElement(name);
	for(let key in obj) {
		a[key] = obj[key];
	}
	return a;
}

function renderPage(arr,page) {
	content = element('div', {className: 'content visible'})
	matrix = document.querySelector('.matrix');
	matrix.appendChild(content);
	content.classList.add(''+page);
	if(page>0) {
		for(let i = page*4; i < page*4+4; i += 1) {
			renderVideo(arr,i,content);
		}
	} else {
		for(let i = page*0; i < page*4+4; i += 1) {
			renderVideo(arr,i,content);
		}
	}
	
	
}

function renderVideo(data,count, content) {
	let div = element('div',{className: 'test'});
	let img = element('img',{src: data[count].photo});
	let name = element('p',{innerHTML: data[count].Name, className: 'chanel'});
	let time = element('p',{innerHTML: data[count].time, className: 'time'});
	let viewer = element('p', {innerHTML: data[count].viewers, className: 'count'});
	let discription = element('div',{innerHTML: data[count].discription, className: 'discription'});
	let title = element('div',{className: 'title'});
	let link = element('a',{innerHTML: data[count].title, href: 'https://www.youtube.com/watch?v='+data[count].id });
	// let content = document.querySelector('.visible');
	content.appendChild(div);
	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(time);
	div.appendChild(viewer);
	div.appendChild(discription);
	div.appendChild(title);
	title.appendChild(link);
}


