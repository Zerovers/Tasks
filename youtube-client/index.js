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
    part: 'part=statistics',
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
	console.log(item);
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
		removePage();
	}
	if(document.querySelector('.target')) {
			body = document.querySelector('.body');
			let allbutton = document.querySelectorAll('.target');
			for(let i = 0; i < allbutton.length; i += 1) {
				body.removeChild(allbutton[i]);
			}
	}
	renderButton('button1',currentPage);
	renderButton('button2',currentPage)
	renderButton('button3',currentPage)
	renderButton('button4',currentPage)
	renderPage(info,currentPage);
	
	right = document.querySelectorAll('.right');		
	right.forEach( el => el.addEventListener('click', e => {
		removePage();
		if(e.target == right[3]) {
			currentPage += 3;
		} if(e.target == right[2]) {
			currentPage += 2;
		} if(e.target == right[1]) {
			currentPage += 2;
		} else {
			currentPage += 1;
		}
		pageCount1 = document.querySelector('.button1-count');
		pageCount2 = document.querySelector('.button2-count');
		pageCount3 = document.querySelector('.button3-count');
		pageCount4 = document.querySelector('.button4-count');
		pageCount1.innerHTML = currentPage+1;
		pageCount2.innerHTML = Math.ceil((currentPage+1)/2);
		pageCount3.innerHTML = Math.ceil((currentPage+1)/3);
		pageCount4.innerHTML = Math.ceil((currentPage+1)/4);
		if(info.length - currentPage < 6) {
			info2 = videoRequest2(result,info);
			info = info.concat(info2);
		}
		console.log(pageCount1.innerHTML,pageCount2.innerHTML,pageCount3.innerHTML,pageCount4.innerHTML)
		renderPage(info,currentPage);
	}));	

	const left = document.querySelectorAll('.left');
	left.forEach( el => el.addEventListener('click', e => {
		removePage();
		if(e.target == left[3]) {
			currentPage -= 3;
		} if(e.target == left[2]) {
			currentPage -= 2;
		} if(e.target == left[1]) {
			currentPage -= 2;
		} else {
			currentPage -= 1;
		}	
		if(currentPage < 0) {
			currentPage = 0;
		}	
		pageCount1 = document.querySelector('.button1-count');
		pageCount2 = document.querySelector('.button2-count');
		pageCount3 = document.querySelector('.button3-count');
		pageCount4 = document.querySelector('.button4-count');
		pageCount1.innerHTML = currentPage+1;
		pageCount2.innerHTML = Math.ceil((currentPage+1)/2);
		pageCount3.innerHTML = Math.ceil((currentPage+1)/3);
		pageCount4.innerHTML = Math.ceil((currentPage+1)/4);
		renderPage(info,currentPage);
	}));


	document.onmousedown = e => {
		if (e.target !== document.querySelector('.search')) {
			let down = e.pageX;
			console.log(down);
			document.onmousemove = e => {
				if (e.which != 1) {   // check on right click
					return;
				}
				if (down + 150 < e.pageX) {
					console.log(e.pageX);
					let content4 = getComputedStyle(document.querySelector('.content4')).display;
					let content3 = getComputedStyle(document.querySelector('.content3')).display;
					let content2 = getComputedStyle(document.querySelector('.content2')).display;
					document.querySelector('.content1.visible').classList.add('transition');
					document.querySelector('.content2.visible').classList.add('transition');
					document.querySelector('.content3.visible').classList.add('transition');
					document.querySelector('.content4.visible').classList.add('transition');
					// removePage();
					setTimeout(removePage,1000);
					if (content4 == 'flex') {
						currentPage += 3;
					} if (content3 == 'flex') {
						currentPage += 2;
					} if (content2 == 'flex') {
						currentPage += 2;
					} else {
						currentPage += 1;
					}
					pageCount1 = document.querySelector('.button1-count');
					pageCount2 = document.querySelector('.button2-count');
					pageCount3 = document.querySelector('.button3-count');
					pageCount4 = document.querySelector('.button4-count');
					pageCount1.innerHTML = currentPage + 1;
					pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
					pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
					pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
					console.log(pageCount1.innerHTML, pageCount2.innerHTML, pageCount3.innerHTML, pageCount4.innerHTML);
					if (info.length - currentPage < 6) {
						info2 = videoRequest2(result, info);
						info = info.concat(info2);
					}
					// renderPage(info, currentPage);
					setTimeout(renderPage,1000,info,currentPage);
					document.onmousemove = null;
				}
				if (down - 150 > e.pageX) {
					let content4 = getComputedStyle(document.querySelector('.content4')).display;
					let content3 = getComputedStyle(document.querySelector('.content3')).display;
					let content2 = getComputedStyle(document.querySelector('.content2')).display;
					document.querySelector('.content1.visible').classList.add('transition');
					document.querySelector('.content2.visible').classList.add('transition');
					document.querySelector('.content3.visible').classList.add('transition');
					document.querySelector('.content4.visible').classList.add('transition');
					setTimeout(removePage,1000);
					if (content4 == 'flex') {
						currentPage -= 3;
					} if (content3 == 'flex') {
						currentPage -= 2;
					} if (content2 == 'flex') {
						currentPage -= 2;
					} else {
						currentPage -= 1;
					}
					if (currentPage < 1) {
						currentPage = 0;
					}
					pageCount1 = document.querySelector('.button1-count');
					pageCount2 = document.querySelector('.button2-count');
					pageCount3 = document.querySelector('.button3-count');
					pageCount4 = document.querySelector('.button4-count');
					pageCount1.innerHTML = currentPage + 1;
					pageCount2.innerHTML = Math.ceil((currentPage + 1) / 2);
					pageCount3.innerHTML = Math.ceil((currentPage + 1) / 3);
					pageCount4.innerHTML = Math.ceil((currentPage + 1) / 4);
					setTimeout(renderPage,1000,info,currentPage);
					document.onmousemove = null;
				}
			};
			document.ondragstart = () => {
				return false;
			};
			function getCoords(elem) {
				let box = elem.getBoundingClientRect();
				return {
					left: box.left + pageXOffset
				};
			}
		}
	}

});	

function renderElement(name, obj) {
	let a = document.createElement(name);
	for(let key in obj) {
		a[key] = obj[key];
	}
	return a;
}

function renderPage(arr,page) {
	content4 = renderElement('div', {className: 'content4 visible'})
	matrix = document.querySelector('.matrix');
	matrix.appendChild(content4);
	content3 = renderElement('div', {className: 'content3 visible'})
	matrix.appendChild(content3);
	content2 = renderElement('div', {className: 'content2 visible'})
	matrix.appendChild(content2);
	content1 = renderElement('div', {className: 'content1 visible'})
	matrix.appendChild(content1);
	if (page > 3) {
		for (let i = page ; i < page + 4; i += 1) {
			let element = (arr[i].doomelement).cloneNode(true);
			content4.appendChild(element);
		}
	} else {
		for (let i = page * 0; i < page*0 + 4; i += 1) {
			let element = (arr[i].doomelement).cloneNode(true);
			content4.appendChild(element);
		}
	}
	if (page > 2) {
		for (let i = page; i < page + 3; i += 1) {
			content3.appendChild((arr[i].doomelement).cloneNode(true));
		}
	} else {
		for (let i = page * 0; i < page * 0 + 3; i += 1) {
			let element = (arr[i].doomelement).cloneNode(true);
			content3.appendChild(element);
		}
	}
	if (page > 1) {
		for (let i = page; i < page + 2; i += 1) {
			content2.appendChild((arr[i].doomelement).cloneNode(true));
		}
	} else {
		for (let i = page * 0; i < page * 0 + 2; i += 1) {
			let element = (arr[i].doomelement).cloneNode(true);
			content2.appendChild(element);
		}
	}
	if (page > 0) {
		for (let i = page; i < page + 1; i += 1) {
			content1.appendChild((arr[i].doomelement).cloneNode(true));
		}
	} else {
		for (let i = page * 0; i < page * 1 + 1; i += 1) {
			let element = (arr[i].doomelement).cloneNode(true);
			content1.appendChild(element);
		}
	}

}

function renderVideo(data) {
	let div = renderElement('div',{className: 'test'});
	let img = renderElement('img',{src: data.photo});
	let name = renderElement('p',{innerHTML: data.Name, className: 'chanel'});
	let time = renderElement('p',{innerHTML: data.time, className: 'time'});
	let viewer = renderElement('p', {innerHTML: data.viewers, className: 'count'});
	let discription = renderElement('div',{innerHTML: data.discription, className: 'discription'});
	let title = renderElement('div',{className: 'title'});
	let link = renderElement('a',{innerHTML: data.title, href: 'https://www.youtube.com/watch?v='+data.id });
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

function removePage() {
	body = document.querySelector('.body');
	matrix = document.querySelector('.matrix');
	child4 =  document.querySelector('.content4');
	child3 =  document.querySelector('.content3');
	child2 =  document.querySelector('.content2');
	child1 =  document.querySelector('.content1');
	matrix.removeChild(child4)
	matrix.removeChild(child3)
	matrix.removeChild(child2)
	matrix.removeChild(child1)

}

function renderButton(name,count,id) {
	let	body = document.querySelector('.body');
	let butt = renderElement('div', {className: name + ' target'});
	let left = renderElement('i', {className: 'left fas fa-caret-left'});
	let right = renderElement('i', {className: 'right fas fa-caret-right'});
	let pageCount = renderElement('div', {innerHTML: count+1, className: name+'-count'});
	butt.appendChild(left);
	butt.appendChild(pageCount);
	butt.appendChild(right);
	body.appendChild(butt);
}

function eventRight(result,info,currentPage,e) {
	removePage();
	if(e.target == right[3]) {
		currentPage += 4;
	} if(e.target == right[2]) {
		currentPage += 3;
	} if(e.target == right[1]) {
		currentPage += 2;
	} else {
		currentPage += 1;
	}
	pageCount1 = document.querySelector('.button1-count');
	pageCount2 = document.querySelector('.button2-count');
	pageCount3 = document.querySelector('.button3-count');
	pageCount4 = document.querySelector('.button4-count');
	pageCount1.innerHTML = currentPage+1;
	pageCount2.innerHTML = Math.ceil((currentPage+1)/2);
	pageCount3.innerHTML = Math.ceil((currentPage+1)/3);
	pageCount4.innerHTML = Math.ceil((currentPage+1)/4);	
	if(info.length - currentPage < 6) {
		info2 = videoRequest2(result,info);
		info = info.concat(info2);
	}
	renderPage(info,currentPage);
}





