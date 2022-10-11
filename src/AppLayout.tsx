import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, FundOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { routers } from './routers';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [breadcrumbList, setBreadcrumbList] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isInit, setIsInit] = useState<Boolean>(false)

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr: string[] = [];
    const breadcrumbList: string[] = []
    if(routes !== null) {
      routes.forEach((item) => {
      const path = item.route.path;
      const handle = item.route.handle;
      if ((!pathArr.includes(path as string)) && handle) {
        breadcrumbList.push(handle)
      }
      if(path) {
        pathArr.push(path);
      }
      })
    }
    setBreadcrumbList(breadcrumbList)
    setDefaultSelectedKeys([location.pathname]);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);
  if(!isInit) {
    return null;
  }
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={200}>
          <div style={{textAlign: 'center', background: '#fff', lineHeight: '64px'}}>菜单栏</div>
          <Menu
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}   
            defaultOpenKeys={defaultOpenKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to='/'>首页</Link>
            </Menu.Item>
            <SubMenu key="/order" icon={<FundOutlined />} title="订单管理">
              <Menu.Item key="/order/add">
                <Link to='/order/add'>新增订单</Link>
              </Menu.Item>
              <Menu.Item key="/order/query">
                <Link to='/order/query'>查询订单</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {
              breadcrumbList?.map((item) => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
            }
          </Breadcrumb>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}