let buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {
  if(!(e.target.classList.contains('clicked')) && e.target.classList.contains('b')) {
    document.querySelector('.visible').classList.remove('visible');
    document.querySelector('.visible2').classList.remove('visible2');
    document.querySelector('.clicked').classList.remove('clicked');
    e.target.classList.toggle('clicked')
    let id = e.target.dataset.image;
    document.querySelector('.slide'+id).classList.toggle('visible');
    document.querySelector('.slide1'+id).classList.toggle('visible2');
  }
})

// let buttons = $('.buttons');
// buttons.on('click', (e) => {
//   if(!(e.target.classList.contains('clicked')) && e.target.classList.contains('b')) {
//     $('.visible').removeClass('visible');
//     $('.visible2').removeClass('visible2');
//     $('.clicked').removeClass('clicked');
//     e.target.classList.toggle('clicked')
//     let id = e.target.dataset.image;
//     $('.slide'+id).toggleClass('visible');
//     $('.slide1'+id).toggleClass('visible2');
//   }
// })



