const closeIcon = document.getElementById('close-modal');
const deleteIcon = document.getElementById('delete-bookmark');
const modal = document.getElementById('modal');
const show = document.getElementById('show');



deleteIcon.addEventListener('click', deleteBookmark);

// Dismiss Modal
closeIcon.addEventListener('click', () => modal.classList.remove('show-modal'));

// Show Modal 
show.addEventListener('click', () => modal.classList.add('show-modal'));

// Remove Modal clicking outside of it
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);


function deleteBookmark() {
    console.log('delete bookmark');
}