import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core'; 
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Rated from './Rated';
import { Film } from './Film';
import Errorpage from './Errorpage';
const router=createBrowserRouter([
  {
    path:'*',
    element: <Errorpage/> 
  },
  {
    path:'/',
   
    element:<App/>
  },
  {
    path:'/ratedmovies',
   
    element:<Rated/>
  },
  {
    path:'/:id',
   
    element:<Film/>
  },
])
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);