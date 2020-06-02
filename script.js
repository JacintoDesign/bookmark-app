const modal = document.getElementById('modal');
const modalShow = document.getElementById('showModal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmarkForm');
const websiteNameEl = document.getElementById('websiteName');
const websiteUrlEl = document.getElementById('websiteUrl');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks;

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Remove Modal, clicking outside of it
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  // Valid
  return true;
}

// Validate URL
function checkUrl(url) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    url = `http://${url}`;
  }
  return url;
}

// Build Bookmarks
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${checkUrl(url)}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
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
        url: 'http://jacinto.design',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
  // Get bookmarks array from localStorage
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks array
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove item from the array
      bookmarks.splice(i, 1);
    }
  }
  // Update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  const urlValue = websiteUrlEl.value;
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
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

// Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
modalShow.addEventListener('click', showModal);

// On Load, Fetch Bookmarks
fetchBookmarks();
