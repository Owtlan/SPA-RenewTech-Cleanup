import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { updateInfo } from '../app.js'
import { showHomePage } from '../app.js';

let loginTemplate = () => html`
   <section id="login">
        <div class="form">
          <img class="border" src="./images/border.png" alt="" />
          <h2>Login</h2>
          <form class="login-form" @submit=${onsubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`

function onsubmit(e) {
    e.preventDefault()

    let formData = new FormData(e.currentTarget)
    let email = formData.get('email')
    let password = formData.get('password')
    if (email === '' || password === '') {
        alert('fields are empty')
        return
    }

    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid email/password')
            }
            return res.json()
        })
        .then(data => {
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem('ownerId', data._id)
            updateInfo()
            showHomePage()
        })
        .catch(error => alert(error.message))
}
export const loginView = (ctx) =>
    render(loginTemplate(), document.querySelector('main'))