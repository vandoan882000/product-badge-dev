// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';

// START_EDIT: Chuyển sang ReactDOM render của react 18
const root = document.getElementById('app');
if (root) {
  ReactDOM.render(<App />, document.getElementById('app'));
} else {
  document.body.innerHTML = `<h1> HTMLElement<#app> is not exist</h1>`;
}
