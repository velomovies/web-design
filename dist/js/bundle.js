'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var filter = document.querySelector('.filter');
var filterText = document.querySelector('h2');
var filterButton = document.querySelector('#filterbutton');
var showAllButton = document.querySelector('#showallbutton');
var filterGallery = document.querySelector('.gallery');

var scrollPosition = window.scrollY;
var firstTime = true;

function activeFilter() {
  firstTime = false;
  filter.classList.add('active');
  filter.removeEventListener('click', activeFilter);
  setTimeout(function () {
    window.addEventListener('scroll', checkScrollPositionSecond);
  }, 1000);
}

function deactiveFilter() {
  firstTime = false;
  filter.classList.remove('active');
  setTimeout(function () {
    window.addEventListener('scroll', checkScrollPositionSecond);
    filter.addEventListener('click', activeFilter);
  }, 500);
}

function checkScrollPositionSecond() {
  window.removeEventListener('scroll', checkScrollPositionSecond);
  deactiveFilter();
}

function filterPhotos() {
  filterGallery.classList.add('filtered');
  deactiveFilter();
}

function showAllPhotos() {
  filterGallery.classList.remove('filtered');
  deactiveFilter();
}

function checkScrollPosition() {
  scrollPosition = window.scrollY;

  if (scrollPosition > 4000 && firstTime) {
    window.removeEventListener('scroll', checkScrollPosition);
    activeFilter();
  }
}

filter.addEventListener('click', activeFilter);
filterButton.addEventListener('click', filterPhotos);
showAllButton.addEventListener('click', showAllPhotos);

window.addEventListener('scroll', checkScrollPosition);
var gallery = document.querySelector('.gallery');
var overlay = document.querySelector('.overlay');
var overlayImage = overlay.querySelector('img');
var overlayClose = overlay.querySelector('.close');

var i = 600;

function generateHTML(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      h = _ref2[0],
      v = _ref2[1];

  i++;

  return '\n        <div class="item h' + h + ' v' + v + '">\n          <img src="https://picsum.photos/600/500?image=' + i + '" onerror="this.onerror=null;this.src=\'images/' + randomNumber(12) + '.jpg\'">\n          <div class="item__overlay">\n            <h2>Title of the photo</h2>\n            <button>View \u2192</button>\n          </div>\n        </div>\n      ';
}

function randomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function handleClick(e) {
  var src = e.currentTarget.querySelector('img').src;
  overlayImage.src = src;
  overlay.classList.add('open');
}

function close() {
  overlay.classList.remove('open');
}

var digits = Array.from({ length: 100 }, function () {
  return [randomNumber(4), randomNumber(4)];
}).concat([[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]);

var html = digits.map(generateHTML).join('');
gallery.innerHTML = html;

var items = document.querySelectorAll('.item');

items.forEach(function (item) {
  return item.addEventListener('click', handleClick);
});

overlayClose.addEventListener('click', close);