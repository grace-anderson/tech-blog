const createNewPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input').value;
    const contents = document.querySelector('#content-input').value;

    const response = await fetch('/api/blog/new', {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create blog post');
    }
};

document
    .querySelector('#new-blog-post-form')
    .addEventListener('submit', createNewPostFormHandler);
