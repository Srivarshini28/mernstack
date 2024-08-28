import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Header from './Header';

import {
  createBrowserRouter, RouterProvider,} from "react-router-dom";
import { myStore } from './redux/config';

let routerPaths = createBrowserRouter([
  {"path":"/","element":<Home/>},
  {"path":"/Home.js","element":<Home/>},
  {"path":"/About.js","element":<About/>},
  {"path":"/Contact.js","element":<Contact/>},
  {"path":"/Header.js","element":<Header/>},
])
    
function App() {
  return (
    <Provider store={myStore}>
      <div className='App'>
        <RouterProvider router={routerPaths} />
      </div>
    </Provider>
    
  );
}

export default App;