import htm from "https://dev.jspm.io/htm@3.0";
import ReactDOM from "https://dev.jspm.io/react-dom@17.0";
import React from "https://dev.jspm.io/react@17.0";

const html = htm.bind(React.createElement);

const NAME_KEY = "name";
const DOMAIN_KEY = "domain";

function Username() {
  const persistedValue = localStorage.getItem(NAME_KEY) ?? "";
  const [value, setValue] = React.useState(persistedValue);

  const onInput = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem(NAME_KEY, value);
  });

  return html`
    <div>
      <p>Enter the portion of your email that comes before the "@" sign.</p>

      <label hmltfor="name-input">Name: </label>

      <span> </span>

      <input
        id="name-input"
        value=${value}
        onInput=${onInput}
        placeholder="foobar123"
      />
    </div>
  `;
}

function Domain() {
  const persistedValue = localStorage.getItem(DOMAIN_KEY) ?? "";
  const [value, setValue] = React.useState(persistedValue);

  const onInput = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem(DOMAIN_KEY, value);
  });

  return html`
    <div>
      <p>Enter domain portion of your email. Such as gmail.com or your company's domain.</p>

      <label hmltfor="domain-input">Domain: </label>

      <span> </span>

      <input
        id="domain-input"
        value=${value}
        onInput=${onInput}
        placeholder="gmail.com"
      />
    </div>
  `;
}


function App() {
  return html`
    <div>
      <h2>Inputs</h2>
      <${Username}/>
      <${Domain}/>
    </div>
  `;
}

ReactDOM.render(
  html`<${App}/>`,
  document.getElementById("app")
);
