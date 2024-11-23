import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
// import Homepage from './components/Homepage.jsx';
// import Storepage from './components/Storepage.jsx';


const router = createBrowserRouter([
  {
    path: "/:name",
    element: <App />,
    // children: [
    //   { index: true, element: <Homepage /> },
    //   { path: "home", element: <Homepage /> },
    //   {
    //     path: "store",
    //     element: <Storepage /> 
    //   },
    // ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
