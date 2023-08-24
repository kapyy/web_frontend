import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'lib-flexible'
import { setRem } from 'utils/px2rem';
import Modal from 'react-modal';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
Modal.setAppElement('#root');

window.onresize = () => {
  setRem()

}
setRem()
root.render(
  <App />

);
