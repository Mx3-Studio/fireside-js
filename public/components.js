
function appendChat(chat, container) {
  console.log(container);
  const chatContainer = document.getElementById(container);
  const template = document.getElementById('chat');
  const clone = document.importNode(template.content, true);
  const li = clone.querySelector('li');
  const avatar = clone.querySelector('.avatar');
  const name = clone.querySelector('.name');
  const message = clone.querySelector('.message');
  const chatImage = clone.querySelector('.chat-image');

  name.innerText = chat.displayName;
  avatar.setAttribute('src', chat.photoURL);
  message.innerText = chat.content;

  if (chat.chatImageURL) {
    chatImage.setAttribute('src', chat.chatImageURL);
  } else {
    chatImage.remove();
  }

  chatContainer.appendChild(li);
}

function displayUserInfo(user) {
  const userContainer = document.getElementById('userContainer');
  userContainer.innerHTML = '';
  if (user) {
    const template = document.getElementById('loggedIn');
    const clone = document.importNode(template.content, true);
    const div = clone.querySelector('div');
    const img = clone.querySelector('img');
    const name = clone.querySelector('.name');
    const uid = clone.querySelector('.uid');
    
    name.innerText = user.displayName;
    img.setAttribute('src', user.photoURL);
    uid.innerText = user.uid;
    
    userContainer.appendChild(div);
  } else {
    const template = document.getElementById('noUser');
    const clone = document.importNode(template.content, true);
    const div = clone.querySelector('div');
    userContainer.appendChild(div);
  }
}

function handleDisable(user) {
  const form = document.getElementById('chatForm');
  if (!form) { return; }
  const input = form.querySelector('input');
  input.disabled = !!!user;
  input.placeholder = user ? 'Message' : 'Login to start chatting';
  const buttons = form.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = !!!user;
  });
}

(() => {
  'use strict';

  class Header extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const header = document.createElement('header');
      header.innerHTML = `
        <div>
          <img src="images/fireside.svg" alt="fireside logo: three flames">
          Fireside
        </div>
        <nav>
          <ul>
            <li><a href="./">Home</a></li>
            <li><a href="./profile.html">Profile</a></li>
            <li><a href="./search.html">Search</a></li>
          </ul>
        </nav>
      `;


      // Styles
      const style = document.createElement('style');
      style.textContent = `        
        header {
          padding: 1rem;
          box-sizing: border-box;
          align-items: center;
          display: flex;
          justify-content: space-between;
          background: #eee8e8;
          position: sticky;
          top:0;
        }
        
        header > div img {
          width: 2rem;
          vertical-align: -25%;
        }
        
        nav ul {
          margin: 0;
        }
        
        nav ul li {
          display: inline-block;
          margin: 0 1rem;
          list-style-type: none;
          overflow: auto;
        }

        a:link,
        a:visited {
          color: #26afff;
          text-decoration: none;
        }
        a:hover,
        a:focus {
          text-decoration: underline;
        }
      `;

      header.appendChild(style);
      shadow.appendChild(header);
    }
  }
  customElements.define('fireside-header', Header);

  class Footer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const footer = document.createElement('footer');
      footer.innerHTML = `
        <div class="social-media">
          <a target="_blank" href="https://github.com/Mx3-Studio/fireside"><i class="fa fa-github"
              aria-hidden="true"></i><span>GitHub</span></a>
        </div>
        <div class="copyright">
          Copyright &copy; 3xM Studio 2007 - 2009
        </div>
      `;


      // Styles
      const style = document.createElement('style');
      style.textContent = `        
        footer {
          position: sticky;
          bottom: 0;
          background: white;
          border-top: var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          box-sizing: border-box;
        }
        
        .copyright {
          text-align: right;
          font-size: .75rem;
        }

        a:link,
        a:visited {
          color: #26afff;
          text-decoration: none;
        }
        a:hover,
        a:focus {
          text-decoration: underline;
        }
      `;

      footer.appendChild(style);
      shadow.appendChild(footer);
    }
  }
  customElements.define('fireside-footer', Footer);
})();
