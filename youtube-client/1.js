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
	console.log(item);
	let map = item.items.map(a => {
			let time = a.snippet.publishedAt;
			time = time.split('T');
			return {
				id: a.id.videoId,
				photo: a.snippet.thumbnails.high.url,
				Name: a.snippet.channelTitle,
				time: time[0],
				discription: a.snippet.description,
				title: a.snippet.title,
				pageToken: item.nextPageToken
			}
	});
	statisticRequest(map);
	addvideo(map);
	return map;
}

function videoRequest2(searchTerm, obj) {
  let url = 'https://www.googleapis.com/youtube/v3/search?';
  let params = {
    part: 'part=snippet&',
    key: 'key=AIzaSyD3cMxUk1qFHsOty7ISsuUcTkx84yfs4Vs&',
		q: 'q='+searchTerm,
		type: 'type=video&',
		maxResults: 'maxResults=15&',
		pageToken: 'pageToken='+obj[obj.length-1].pageToken+'&'
  };
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url+params.pageToken+params.key+params.type+params.part+params.maxResults+params.q , false);
  xhr.send();
  if (xhr.status != 200) {
   	console.log(xhr); 
  } else {
   	console.log(xhr); 
	}
	let item = JSON.parse(xhr.response);
	let map2 = item.items.map(a => {
			let time = a.snippet.publishedAt;
			time = time.split('T');
			return {
				id: a.id.videoId,
				photo: a.snippet.thumbnails.medium.url,
				Name: a.snippet.channelTitle,
				time: time[0],
				discription: a.snippet.description,
				title: a.snippet.title,
				pageToken: item.nextPageToken
			}
	});
	statisticRequest(map2);
	addvideo(map2);
	return map2;
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
	if(document.querySelector('.visible')) {
		matrix = document.querySelector('.matrix');
		child =  document.querySelector('.visible');
		matrix.removeChild(child)
	}
	if(document.querySelector('.button')) {
		let	body = document.querySelector('.body');
			body.removeChild(document.querySelector('.button'));
	}
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
	// Event click right button
	right.addEventListener('click', e => {
		matrix = document.querySelector('.matrix');
		child =  document.querySelector('.visible');
		matrix.removeChild(child)
		currentPage += 1;
		pageCount.innerHTML = currentPage+1;
		if(info.length - currentPage*4 < 8) {
			info2 = videoRequest2(result,info);
			info = info.concat(info2);
		} 
		console.log(info);
		renderPage(info,currentPage);
	});	

	// Event click left button
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

	matrix.onmousedown = function (e) {
		let coords = getCoords(matrix);
		let shiftX = e.pageX - coords.left;
		let down = e.pageX;
		body = document.querySelector('.body');
		let bodycoords = getCoords(body);
		document.onmousemove = function(e) {
			
			if (e.which != 1) { // check on right click
				return; 
			}
			let newcoords = e.pageX - shiftX - bodycoords.left;
			let right = body.offsetWidth - matrix.offsetWidth;
			if(newcoords > right ) {
				newcoords = right;
			}
			matrix.style.left = newcoords + 'px';
			if(newcoords >= 150 ) {
				matrix = document.querySelector('.matrix');
				child =  document.querySelector('.visible');
			  matrix.removeChild(child)
				currentPage += 1;
				pageCount.innerHTML = currentPage+1;
				if(info.length - currentPage*4 < 8) {
					info2 = videoRequest2(result,info);
						info = info.concat(info2);
					} 
				renderPage(info,currentPage);
				matrix.style.left = 0;
				content = document.querySelector('.content');
				document.onmousemove = null;
				matrix.onmouseup = null;
			}			
			if(newcoords <= -150) {
				matrix = document.querySelector('.matrix');
				child =  document.querySelector('.visible');
				matrix.removeChild(child)
				if(currentPage === 0) {
					currentPage += 1;
				}
				currentPage -= 1;
				pageCount.innerHTML = currentPage+1;
				renderPage(info,currentPage);
				matrix.style.left = 0;
				document.onmousemove = null;
				matrix.onmouseup = null;		
			}
		};
		matrix.ondragstart = function() {
			return false;
		};
		function getCoords(elem) {   
			let box = elem.getBoundingClientRect();
			return {
				left: box.left + pageXOffset
			};
		}	
	}

});	

function element(name, obj) {
	let a = document.createElement(name);
	for(let key in obj) {
		a[key] = obj[key];
	}
	return a;
}

function renderPage(arr,page) {
	console.log(arr);
	let info2;
	content = element('div', {className: 'content visible'})
	matrix = document.querySelector('.matrix');
	matrix.appendChild(content);
	content.classList.add(''+page);
	if(page>0) {
			for(let i = page*4; i < page*4+4; i += 1) {
			content.appendChild(arr[i].doomelement);
		}
	} else {
		for(let i = page*0; i < page*4+4; i += 1) {
			content.appendChild(arr[i].doomelement);
		}
	}
}

function renderVideo(data) {
	let div = element('div',{className: 'test'});
	let img = element('img',{src: data.photo});
	let name = element('p',{innerHTML: data.Name, className: 'chanel'});
	let time = element('p',{innerHTML: data.time, className: 'time'});
	let viewer = element('p', {innerHTML: data.viewers, className: 'count'});
	let discription = element('div',{innerHTML: data.discription, className: 'discription'});
	let title = element('div',{className: 'title'});
	let link = element('a',{innerHTML: data.title, href: 'https://www.youtube.com/watch?v='+data.id });
	div.appendChild(img);
	div.appendChild(name);
	div.appendChild(time);
	div.appendChild(viewer);
	div.appendChild(discription);
	div.appendChild(title);
	title.appendChild(link);
	return div;
}

function addvideo(a) {
	a.forEach(e => {
		e.doomelement = renderVideo(e)
	})
};



