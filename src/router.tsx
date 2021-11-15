import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages


// Login
const Login = Loader(lazy(() => import('src/content/pages/Components/Login')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));

// Master Data

const Category = Loader(lazy(() => import('src/content/pages/Components/MasterData/Category')));
const Brand = Loader(lazy(() => import('src/content/pages/Components/MasterData/Brand')));


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboards/crypto"
            replace
          />
        )
      },
      {
        path: 'crypto',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'management',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/management/transactions"
            replace
          />
        )
      },
      {
        path: 'masterdata',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="category"
                replace
              />
            )
          },
          {
            path: 'category',
            element: <Category />
          },
          {
            path: 'brand',
            element: <Brand />
          },
          {
            path: 'city',
            element: <Category />
          },
          {
            path: 'product',
            children: [
              {
                path: '/',
                element: (
                  <Navigate
                    to="color"
                    replace
                  />
                )
              },
              {
                path: '/color',
                element: <Category />
              },
              {
                path: '/tenor',
                element: <Category />
              },
              {
                path: '/location',
                element: <Category />
              },
            ]
          },
          {
            path: 'article',
            element: <Category />
          },
          {
            path: 'discussion',
            element: <Category />
          },
          {
            path: 'review',
            element: <Category />
          },
          {
            path: 'feedback',
            element: <Category />
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="details"
                replace
              />
            )
          },
          {
            path: '/details',
            element: <Category />
          },
          {
            path: '/settings',
            element: <Category />
          },
        ]
      }
    ]
  }
];

export default routes;
