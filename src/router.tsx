import { Suspense, lazy, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { PartialRouteObject } from 'react-router'

import SidebarLayout from 'src/layouts/SidebarLayout'
import BaseLayout from 'src/layouts/BaseLayout'
import HomeLayout from 'src/layouts/HomeLayout'

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

const HomePage = Loader(lazy(() => import('src/content/pages/Home/Homepage')))
const AboutPage = Loader(lazy(() => import('src/content/pages/Home/AboutPage')))
const BlogsPage = Loader(lazy(() => import('src/content/pages/Home/BlogsPage')))
const BlogsDetail = Loader(lazy(() => import('src/content/pages/Home/BlogsDetail')))

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));

// Master Data
const Post = Loader(lazy(() => import('src/content/pages/Components/MasterData/Post')))
const PostForm = Loader(lazy(() => import('src/content/pages/Components/MasterData/PostForm')))

const Profile = Loader(lazy(() => import('src/content/pages/Users/profile')))

const Transactions = Loader(lazy(() => import('src/content/pages/Components/Transaction')))
const TransactionDetail = Loader(lazy(() => import('src/content/pages/Components/Transaction/Detail')))


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <HomeLayout />,
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/home"
            replace
          />
        )
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/blogs',
        element: <BlogsPage />
      },
      {
        path: '/article/:id',
        element: <BlogsDetail />
      },
    ]
  },
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
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
            to="/management/post"
            replace
          />
        )
      },
      {
        path: '/post',
        element: <Post />
      },
      {
        path: '/postform',
        element: <PostForm />
      },
      {
        path: '/postform/:id',
        element: <PostForm />
      }
    ]
  },
  {
    path: '/profile',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/details',
        element: <Profile />
      }
    ]
  }
];

export default routes;
