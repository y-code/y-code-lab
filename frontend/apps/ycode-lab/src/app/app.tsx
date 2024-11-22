import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { YcodeLabLayout } from './layout';
import { sjRouter } from '@ycode-lab/strawberry-joystick';
import { TechWritings } from './tech-writings';
import { Home } from './home';
import { VideoGameDevs } from './video-game-devs';
import { MyProjects } from './my-projects';

const router = createBrowserRouter([
  {
    path: '',
    element: <YcodeLabLayout/>,
    children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/my-projects',
        element: <MyProjects/>,
      },
      {
        path: '/video-game-devs',
        element: <VideoGameDevs/>,
      },
      {
        path: '/tech-writings',
        element: <TechWritings/>,
      },
    ]
  },
  ...sjRouter,
]);

export function App() {
  React.useEffect(() => {
    document.body.classList.add('bg-light');
  });

  return (
    <RouterProvider router={router} />
  );
}

export default App;
