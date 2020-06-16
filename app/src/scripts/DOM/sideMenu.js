function openNav() {
  document.getElementById('myNav').style.width = '45%';
}

document.getElementById('menu-btn').addEventListener('click', openNav);

function closeNav() {
  document.getElementById('myNav').style.width = '0%';
}

document.getElementById('closebtn').addEventListener('click', closeNav);

// window.addEventListener('resize', () => {
//   if (window.innerWidth < 800) {
//     console.log('Here');
//     window.resizeTo(800, window.innerHeight);
//   }
// });

// [...document.getElementsByClassName('accordion')].forEach((item) =>
//   item.addEventListener('click', function () {
//     this.classList.toggle('active');
//     console.log(this.classList);
//     const panel = this.nextElementSibling;
//     console.log(panel);
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = `${panel.scrollHeight} px`;
//     }
//   })
// );
