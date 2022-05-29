const createNewCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-input').value;
    // Get the blog post ID from the end of the URL
    const postId = window.location.href.split("/").pop();
    const response = await fetch('/api/blog/new-comment', {
        method: 'POST',
        body: JSON.stringify({
            blog_post_id: postId,
            comment: comment
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // Reload the page to show the new comment
        document.location.replace('/blog-comments/' + postId);
    } else {
        alert('Failed to create blog post');
    }
};

document
    .querySelector('#new-comment-form')
    .addEventListener('submit', createNewCommentFormHandler);
