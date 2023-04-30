const container = document.querySelector('.posts-container');
const btn = document.querySelector('.btn-newpost');
let posts = [];

const getPostMarkup = (post) => {
    return `
    <article>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    </article>
    `;
}

const addExistingPostsToContainer = (posts) => {
    posts.forEach(post => {
        const postMarkup = getPostMarkup(post);
        container.insertAdjacentHTML('afterbegin', postMarkup);
    });
}

const createNewPost = () => {
    const title = document.querySelector('.input-header').value;
    const body = document.querySelector('.input-post').value;
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
    .then(response => {
        if (response.status !== 201) {
            return Promise.reject();
        }
        return response.json();
    })
    .then(data => {
        const postMarkup = getPostMarkup(data);
        container.insertAdjacentHTML('afterbegin', postMarkup);
        posts.unshift(data);
        localStorage.setItem('posts', JSON.stringify(posts));
    })
    .catch(error => console.log(error));
}
btn.addEventListener('click', createNewPost);

document.addEventListener('DOMContentLoaded', () => {
    const existingPosts = JSON.parse(localStorage.getItem('posts'));
    if (existingPosts) {
        posts = existingPosts;
        addExistingPostsToContainer(posts);
    }
});

// localStorage.clear();