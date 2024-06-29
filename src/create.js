import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
      <section id="create">
        <div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Add Solution</h2>
          <form class="create-form" @submit=${addItem}>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Solution Type"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="more-info"
              name="more-info"
              placeholder="more Info"
              rows="2"
              cols="10"
            ></textarea>
            <button type="submit">Add Solution</button>
          </form>
        </div>
      </section>
`

function addItem(e) {
    e.preventDefault()

    let type = document.getElementById('type').value
    let imageUrl = document.getElementById('image-url').value
    let description = document.getElementById('description').value
    let learnMore = document.getElementById('more-info').value


    if (type === '' || imageUrl === '' || description === '' || learnMore === '') {
        window.alert('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/solutions', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            type,
            imageUrl, 
            description, 
            learnMore         
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('main'))