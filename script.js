const closeIcon = document.getElementById('close-modal');
const deleteIcon = document.getElementById('delete-bookmark');
const modal = document.getElementById('modal');
const show = document.getElementById('show');
const bookmarkForm = document.getElementById('bookmarkForm');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Dismiss Modal
closeIcon.addEventListener('click', () => modal.classList.remove('show-modal'));

// Show Modal 
show.addEventListener('click', () => modal.classList.add('show-modal'));

// Remove Modal clicking outside of it
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);

deleteIcon.addEventListener('click', deleteBookmark);

bookmarkForm.addEventListener('submit', storeBookmark);

function storeBookmark(e) {
    // Prevent form from submitting
    e.preventDefault();

    let nameValue = document.getElementById('websiteName').value;
    let urlValue = document.getElementById('websiteUrl').value;

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

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Erase form to get next item
    bookmarkForm.reset();

    // Get bookmarks from local storage
    fetchBookmarks();

    modal.classList.remove('show-modal');
}

// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
  
    // Build output
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
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(let i =0;i < bookmarks.length;i++){
      if(bookmarks[i].url == url){
        // Remove from array
        bookmarks.splice(i, 1);
      }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
    // Re-fetch bookmarks
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


// On startup Fetch bookmarks
fetchBookmarks();