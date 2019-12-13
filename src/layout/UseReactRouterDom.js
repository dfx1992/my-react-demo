import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Parent from '../reactRef/Parent';
import AxiosDemo from '../axios/AxiosDemo';
import FetchJsonpDemo from '../fetchJsonp/FetchJsonpDemo';
import ReactRouterDomDemo from '../reactRouter/ReactRouterDomDemo';
import ReactRouterHooksDemo from '../reactRouter/ReactRouterHooksDemo';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class UseReactRouterDom extends Component {
    state = {
        collapsed: false,
        menuRoutes: [
            {
                path: '/basic',
                key: 'basic',
                title: '16以前内容回顾',
                routes: [
                    {
                        path: "/basic/ref",
                        key: 'ref',
                        title: '父子组件传值',
                        component: () => <Parent />
                    },
                    {
                        path: "/basic/axios",
                        key: 'axios',
                        title: 'axios',
                        component: () => <AxiosDemo />
                    },
                    {
                        path: "/basic/fetchJsonp",
                        key: 'fetchJsonp',
                        title: 'fetchJsonp',
                        component: () => <FetchJsonpDemo />
                    },
                    {
                        path: "/basic/reactRouter",
                        key: 'reactRouter',
                        title: 'react-router-dom',
                        component: () => <ReactRouterDomDemo />
                    },
                    {
                        path: "/basic/reactRouter/hooks",
                        key: 'routerHooks',
                        title: '路由Hooks',
                        component: () => <ReactRouterHooksDemo />
                    }
                ],
            }
        ],
        routes: [],
    };

    componentDidMount() {
        // 获取所有根组件的路由，用于生成Switch下的Route
        const { menuRoutes } = this.state;

        const newRoutes = [];

        // eslint-disable-next-line array-callback-return
        const getRoute = data => data.map(value => {
            if (value.routes && Array.isArray(value.routes)) {
                getRoute(value.routes);
            } else {
                newRoutes.push(value);
            }
        })

        getRoute(menuRoutes);
        this.setState({ routes: newRoutes });

    }

    // 动态生成左侧菜单栏
    getMenu = (data) => {
        const res = data.map(value => {
            if (value.routes && Array.isArray(value.routes)) {
                return <SubMenu
                    key={value.key}
                    title={value.title}
                >
                    {this.getMenu(value.routes)}
                </SubMenu>
            } else {
                return <Menu.Item key={value.key}><Link to={value.path}>{value.title}</Link></Menu.Item>;
            }
        })
        return res;
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {

        const { menuRoutes, routes } = this.state;

        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />

                        <Menu theme="dark" mode="inline">
                            {this.getMenu(menuRoutes)}
                        </Menu>

                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Switch>
                                {routes.map((route, index) => (
                                    /**
                                    * exact属性为true时路径中的hash值必须和path完全一致才渲染对应的组件，如果为false则'/'也可以匹配'/xxx';
                                    * 没有配置exact: true,的情况下，/basic/reactRouter/hooks一直匹配到了/basic/reactRouter指向的ReactRouterDomDemo组件上
                                    */
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={true}
                                        children={<route.component />}
                                    />
                                ))}
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default UseReactRouterDom;