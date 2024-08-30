import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import Web from './Web';

import {
  createBrowserRouter, RouterProvider,} from "react-router-dom";
import { myStore } from './redux/config';

let routerPaths = createBrowserRouter([
  {"path":"/","element":<Home/>},
  {"path":"/Home","element":<Home/>},
  {"path":"/About","element":<About/>},
  {"path":"/Contact","element":<Contact/>},
  {"path":"/Header","element":<Header/>},
  {"path":"/Web","element":<Web/>}
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