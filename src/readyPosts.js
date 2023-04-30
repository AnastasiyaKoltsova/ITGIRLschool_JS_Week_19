const container = document.querySelector('.posts-container');

const getPostMarkup = (post) => {
    return `
    <article>
        <h2>Заголовок: ${post.title}</h2>
        <p>Статья: ${post.body}</p>
    </article>
    `;
}

const addPostsToContainer = (posts) => {
    posts.forEach(post => {
        const postMarkup = getPostMarkup(post);
        container.innerHTML += postMarkup;
    });
}

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => addPostsToContainer(posts))
    .catch(error => console.error(error));