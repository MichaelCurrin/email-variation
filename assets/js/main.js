import htm from "https://dev.jspm.io/htm@3.0";
import ReactDOM from "https://dev.jspm.io/react-dom@17.0";
import React from "https://dev.jspm.io/react@17.0";

const html = htm.bind(React.createElement);

const NAME_KEY = "name";
const DOMAIN_KEY = "domain";

function formatEmail(username, suffix, domain) {
  return `${username}+${suffix}@${domain}`;
}

function datetime(dt) {
  return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}-${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`;
}

function timestamp(dt) {
  return dt.getTime();
}

function Username() {
  const persistedValue = localStorage.getItem(NAME_KEY) ?? "";
  const [username, setUsername] = React.useState(persistedValue);

  const onInput = (event) => {
    setUsername(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem(NAME_KEY, username);
  });

  return html`
    <div>
      <p>Enter the portion of your email that comes before the "@" sign.</p>

      <label hmltfor="name-input">Name: </label>

      <span> </span>

      <input
        id="name-input"
        value=${username}
        onInput=${onInput}
        placeholder="foobar123"
      />
    </div>
  `;
}

function Domain() {
  const persistedValue = localStorage.getItem(DOMAIN_KEY) ?? "";
  const [domain, setDomain] = React.useState(persistedValue);

  const onInput = (event) => {
    setDomain(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem(DOMAIN_KEY, domain);
  });

  return html`
    <div>
      <p>
        Enter domain portion of your email. Such as gmail.com or your company's
        domain.
      </p>

      <label htmlfor="domain-input">Domain: </label>

      <span> </span>

      <input
        id="domain-input"
        value=${domain}
        onInput=${onInput}
        placeholder="gmail.com"
      />
    </div>
  `;
}

function Result() {
  const username = localStorage.getItem(NAME_KEY) ?? "";
  const domain = localStorage.getItem(DOMAIN_KEY) ?? "";

  const now = new Date();
  const suffixA = datetime(now);
  const suffixB = timestamp(now);

  if (username && domain) {
    const emailA = formatEmail(username, suffixA, domain);
    const emailB = formatEmail(username, suffixB, domain);

    return html`
      <div>
        <code> ${emailA} </code>
        <br />
        <code> ${emailB} </code>
      </div>
    `;
  }

  return html`<i>Nothing to display yet</i>`;
}

function App() {
  return html`
    <div>
      <h2>Inputs</h2>
      <${Username} />
      <${Domain} />

      <h2>Outputs</h2>
      <${Result} />
    </div>
  `;
}

ReactDOM.render(html`<${App} />`, document.getElementById("app"));
