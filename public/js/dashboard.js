var blogPosts = document.querySelectorAll('.card');

// Listen for clicks on blog post
blogPosts.forEach((item) =>
  item.addEventListener('click', function (event) {
    // Check if the clicked element was a card
    if (event.currentTarget.classList.contains('card')) {
      // Get the ID of the clicked blog
      var clickedId = event.currentTarget.dataset.id;
      // Go to the page for updating the blog
      document.location.replace('/blog-update/' + clickedId);
    }
  })
);
