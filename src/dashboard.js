import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
        <!-- Dashboard page -->
      <h2>Solutions</h2>
      <section id="solutions">
        <!-- Display a div with information about every post (if any)-->
          ${catalog.length > 0 ? catalog.map(c => html`
        <div class="solution">
          <img src="${c.imageUrl}" alt="example1" />
          <div class="solution-info">
            <h3 class="type">${c.type}</h3>
            <p class="description">
             ${c.description}
            </p>
            <a class="details-btn" href="/details/${c._id}">Learn More</a>
          </div>
           `) : html`
           <!-- Display an h2 if there are no posts -->
           <h2 id="no-solution">No Solutions Added.</h2>
             `}
        </div>
      </section>

     `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/solutions?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('main')))