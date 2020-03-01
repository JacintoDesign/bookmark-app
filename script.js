const modal = document.getElementById('modal');
const show = document.getElementById('show');
const close = document.getElementById('close-modal');

const bookmarkForm = document.getElementById('bookmarkForm');
const websiteNameEl = document.getElementById('websiteName');
const websiteUrlEl = document.getElementById('websiteUrl');

const bookmarksContainer = document.getElementById('bookmarks-container');
const deleteIcon = document.getElementById('delete-bookmark');

let bookmarks;

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);
deleteIcon.addEventListener('click', deleteBookmark);
close.addEventListener('click', () => modal.classList.remove('show-modal'));
show.addEventListener('click', showModal);

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Remove Modal clicking outside of it
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);

function storeBookmark(e) {
  // Prevent form from submitting
  e.preventDefault();

  let nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  let bookmark = {
    name: nameValue,
    url: urlValue
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Add bookmark to the array of bookmarks
  bookmarks.push(bookmark);
  // Set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Get bookmarks array from localStorage
  fetchBookmarks();
  // Erase inputs to be ready for next bookmark entry
  bookmarkForm.reset();
  // Focus on first input field in modal
  websiteNameEl.focus();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks') !== null) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Jacinto Design',
        url: 'http://jacinto.design'
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Build items
  bookmarksContainer.innerHTML = '';
  for(let i = 0; i < bookmarks.length; i++){
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksContainer.innerHTML += `
    <div class="item">
    <i class="fas fa-times delete-icon" id="delete-bookmark" title="Delete Bookmark" onclick="deleteBookmark('${url}')"></i>
    <div class="name">
        <img src="https://s2.googleusercontent.com/s2/favicons?domain=${url}" alt="Favicon">
        <a href="${checkUrl(url)}" rel="no-opener" target="_blank">${name}</a>    
    </div>                        
    </div>
    `
  }
}

function checkUrl(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}  

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks array from localStorage
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks array
  for(let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // Remove item from the array
      bookmarks.splice(i, 1);
    }
  }
  // Update bookmarks array in localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Update bookmarks array in DOM
  fetchBookmarks();
}

// Validate Form
function validate(nameValue, urlValue){
  if(!nameValue || !urlValue){
    alert('Please submit values for both fields.');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!urlValue.match(regex)){
    alert('Please provide a valid web address.');
    return false;
  }

  return true;
}

// On startup, Fetch bookmarks
fetchBookmarks();