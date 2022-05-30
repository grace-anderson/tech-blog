const createPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value;
  const content = document.querySelector('#content-input').value;

  const response = await fetch('/api/blog/new', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create blog post. Remember to add your post content');
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', createPost);
