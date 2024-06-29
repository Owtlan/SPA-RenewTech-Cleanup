import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
      <section id="edit">
        <div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Edit Solution</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Solution Type"
              .value=${album.type}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${album.imageUrl}
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            >${album.description}</textarea>
            <textarea
              id="more-info"
              name="more-info"
              placeholder="more Info"
              rows="2"
              cols="10"
            >${album.learnMore}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/solutions/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/solutions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                let type = document.getElementById('type').value
                let imageUrl = document.getElementById('image-url').value
                let description = document.getElementById('description').value
                let learnMore = document.getElementById('more-info').value
            


                if (type === '' || imageUrl === '' || description === '' || learnMore === '') {
                    window.alert('you need to fill all fields')
                    return
                }


                const editedAlbum = {
                    type,
                    imageUrl,
                    description,
                    learnMore
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('main'))
        })
}