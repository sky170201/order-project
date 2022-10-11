import { lazy, ReactNode, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

// 用懒加载实现优化
// const AppLayout = lazy(() => import('../AppLayout'));
const Detail = lazy(() => import('../pages/order/Detail'));
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const AddOrder = lazy(() => import('../pages/order/AddOrder'));
const QueryOrder = lazy(() => import('../pages/order/QueryOrder'));

// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
import AppLayout from '../AppLayout';

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
  return <Suspense fallback={<h1>Loading...</h1>}>
    {children}
  </Suspense>
}


export const routers: RouteObject[] = [

  {
    path: '/',
    handle: '首页',
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        index: true,
        element: lazyLoad(<Home />)
      },
      {
        path: '/order/add',
        handle: '新增订单',
        element: lazyLoad(<AddOrder />)
      },
      // {
      //   path: '/user/detail/:id',
      //   element: lazyLoad(<Detail />)
      // },
      {
        path: '/order/query',
        handle: '查询订单',
        element: lazyLoad(<QueryOrder />)
      },
    ]
  },
  {
    path: '/login',
    element: lazyLoad(<Login />)
  },
  {
    path: '*',
    element: <Navigate to='/login' />
  }

]