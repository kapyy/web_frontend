import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { pages } from './page'
import {
    RecoilRoot,

} from 'recoil';
import { Route, Router, Routes } from 'base-components/navigate';
import AuthRoute from 'base-components/application/authRouter';
import { ReactNode, Suspense } from 'react';



export const App = () => {
    const RouteAuthFun = (
        (routeList: { path: string; auth?: boolean; element: ReactNode; children?: any; }[]) => {
            return routeList.map(
                (item: {
                    path: string;
                    auth?: boolean;
                    element: ReactNode;
                    children?: any;
                }) => {
                    return (
                        <Route
                            path={item.path}
                            element={
                                <AuthRoute auth={item.auth} routers={pages} key={item.path}>

                                    <Suspense>

                                        {item.element}
                                    </Suspense>
                                </AuthRoute>
                            }
                            key={item.path}
                        >
                            {/* 递归调用，因为可能存在多级的路由 */}
                            {item?.children && RouteAuthFun(item.children)}
                        </Route>
                    );
                }
            );
        }
    );


    return <RecoilRoot>
        <Router>
            <Routes>{RouteAuthFun(pages)}</Routes>
        </Router>
        <ToastContainer />
    </RecoilRoot>

}
