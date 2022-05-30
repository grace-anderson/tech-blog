var blogPosts = document.querySelectorAll('.card');

// Listen for clicks on post card
blogPosts.forEach(item => item.addEventListener('click', function (event) {
  if (event.currentTarget.classList.contains('card')) {
    // get post id from clicked card
    var clickedId = event.currentTarget.dataset.id;
    // Go to the comments for the blog
    document.location.replace('/blog-comments/' + clickedId);
  }
}));