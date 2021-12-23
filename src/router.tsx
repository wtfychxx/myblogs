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
const Register = Loader(lazy(() => import('src/content/pages/Components/Register')));

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
const Bank = Loader(lazy(() => import('src/content/pages/Components/MasterData/Bank')));
const Article = Loader(lazy(() => import('src/content/pages/Components/MasterData/Article')));
const Discuss = Loader(lazy(() => import('src/content/pages/Components/MasterData/Discuss')));
const Color = Loader(lazy(() => import('src/content/pages/Components/MasterData/Color')))

// Master Data Area

const Province = Loader(lazy(() => import('src/content/pages/Components/MasterData/Area/Province')));
const City = Loader(lazy(() => import('src/content/pages/Components/MasterData/Area/City')));

// Master Data Product

const MasterProduct = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Master')))
const ProductColor = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Color')))
const Type = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Type')))
const Tenor = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Tenor')))
const Spesification = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Spesification')))

const Promo = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Promo')))
const Problem = Loader(lazy(() => import('src/content/pages/Components/MasterData/Product/Problem')))

const Profile = Loader(lazy(() => import('src/content/pages/Users/profile')))


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
        path: '/register',
        element: <Register />
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
            path: 'bank',
            element: <Bank />
          },
          {
            path: 'color',
            element: <Color />
          },
          {
            path: 'area',
            children: [
              {
                path: '/',
                element: (
                  <Navigate
                    to="province"
                    replace
                  />
                )
              },
              {
                path: '/province',
                element: <Province />
              },
              {
                path: '/city',
                element: <City />
              }
            ]
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
                path: '/masterProduct',
                element: <MasterProduct />
              },
              {
                path: '/color',
                element: <ProductColor />
              },
              {
                path: '/tenor',
                element: <Tenor />
              },
              {
                path: '/type',
                element: <Type />
              },
              {
                path: '/spesification',
                element: <Spesification />
              },
              {
                path: '/promo',
                element: <Promo />
              },
              {
                path: '/problem',
                element: <Problem />
              },
            ]
          },
          {
            path: 'article',
            element: <Article />
          },
          {
            path: 'discussion',
            element: <Discuss />
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
            element: <Profile />
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
