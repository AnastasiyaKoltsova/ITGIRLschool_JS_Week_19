const container = document.querySelector('.posts-container');
const btn = document.querySelector('.btn-newpost');

const createPost = (posts) => {
    posts.forEach(post => {
        const postMarkup = getPostMarkup(post);

        container.insertAdjacentHTML('beforeend', postMarkup);
    });
}

const getPostMarkup = (post) => {
    return `
    <article>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    </article>
    `;
}

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => addPostsToContainer(posts))
    .catch(error => console.error(error));

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

        container.insertAdjacentHTML('beforeend', postMarkup);
    })
    .catch(error => console.log(error));
}

btn.addEventListener('click', createNewPost);


// const getPostMarkup = (post) => {
//     return `
//     <article>
//         <h2>Заголовок: ${post.title}</h2>
//         <p>Статья: ${post.body}</p>
//     </article>
//     `;
// }

// const addPostsToContainer = (posts) => {
//     posts.forEach(post => {
//         const postMarkup = getPostMarkup(post);
//         container.innerHTML += postMarkup;
//     });
// }

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(posts => addPostsToContainer(posts))
//     .catch(error => console.error(error));