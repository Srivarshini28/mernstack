import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Home from './Home';

import {
  createBrowserRouter, RouterProvider,} from "react-router-dom";


let routerPaths = createBrowserRouter([
  {"path":"/","element":<Home/>},
])
    
function App() {
  return (
      <div className='App'>
        <RouterProvider router={routerPaths} />
      </div>
    
  );
}

export default App;