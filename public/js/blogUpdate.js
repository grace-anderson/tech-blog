const updatePostFormHandler = async (event) => {
    event.preventDefault();

    // Get the blog post ID from the end of the URL
    const postId = window.location.href.split("/").pop();

    const title = document.querySelector('#title-input').value;
    const contents = document.querySelector('#content-input').value;

    const response = await fetch('/api/blog/' + postId, {
        method: 'PUT',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update blog post');
    }
};

document
    .querySelector('#blog-update-form')
    .addEventListener('submit', updatePostFormHandler);

const deletePostHandler = async (event) => {
    event.preventDefault();

    // Get the blog post ID from the end of the URL
    const postId = window.location.href.split("/").pop();

    const response = await fetch('/api/blog/' + postId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog post');
    }
};

document
    .querySelector('#delete-button')
    .addEventListener('click', deletePostHandler);
