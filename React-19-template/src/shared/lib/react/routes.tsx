import { createBrowserRouter } from 'react-router';
import { DashboardPage } from 'pages/DashboardPage';
import { OperatorTablePage } from 'pages/OperatorTablePage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/operators/:groupId',
    element: <OperatorTablePage />,
  },
  {
    path: '/operators/:groupId/profile/:operatorId',
    element: <OperatorTablePage />,
  },
]);
