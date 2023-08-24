import { lazy } from 'react';
import { path } from './path'

const Login = lazy(() => import('./login'));
const Home = lazy(() => import('./home'));
const Petition = lazy(() => import('./petition'));
const Register = lazy(() => import('./register'));
const CreateRole = lazy(() => import('./createRole'));


export const pages = [
  { path: '/', element: <Petition /> },
  { path: '/home', element: <Home /> },
  { path: path.login, element: <Login /> },
  { path: path.createRole, element: <CreateRole />, auth: true },
  { path: path.register, element: <Register /> },
  { path: path.petition, element: <Petition /> }
]
