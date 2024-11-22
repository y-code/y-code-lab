import { RouteObject } from 'react-router-dom';
import StrawberryJoystick from './strawberry-joystick';
import { SJHome } from './sj-home';
import { SJPrivacyPolicy } from './sj-privacy-policy';
import { SJProjects } from './sj-game-apps';

export const sjRouter: Array<RouteObject> = [
  {
    path: '/strawberry-joystick',
    element: <StrawberryJoystick/>,
    children: [
      {
        path: '',
        element: <SJHome/>,
      },
      {
        path: 'home',
        element: <SJHome/>,
      },
      {
        path: 'projects',
        element: <SJProjects/>,
      },
      {
        path: 'privacy-policy',
        element: <SJPrivacyPolicy/>,
      },
    ],
  }
];
