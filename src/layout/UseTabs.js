import React, { Component } from 'react';
import { Layout, Menu, Tabs, Button } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import Parent from '../reactRef/Parent';
import AxiosDemo from '../axios/AxiosDemo';
import FetchJsonpDemo from '../fetchJsonp/FetchJsonpDemo';
import ReactRouterDomDemo from '../reactRouter/ReactRouterDomDemo';
import ReactRouterHooksDemo from '../reactRouter/ReactRouterHooksDemo';

import ContextMenuDemo from '../antdSelection/ContextMenuDemo';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

class UseTabs extends Component {
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
                        component: <Parent />
                    },
                    {
                        path: "/basic/axios",
                        key: 'axios',
                        title: 'axios',
                        component: <AxiosDemo />
                    },
                    {
                        path: "/basic/fetchJsonp",
                        key: 'fetchJsonp',
                        title: 'fetchJsonp',
                        component: <FetchJsonpDemo />
                    },
                    {
                        path: "/basic/reactRouter",
                        key: 'reactRouter',
                        title: 'react-router-dom',
                        component: <ReactRouterDomDemo />
                    },
                    {
                        path: "/basic/reactRouter/hooks",
                        key: 'routerHooks',
                        title: '路由Hooks',
                        component: <ReactRouterHooksDemo />
                    }
                ],
            }, {
                path: '/antdSelection',
                key: 'antdSelection',
                title: 'Antd社区精选组件',
                routes: [
                    {
                        path: "/antdSelection/contextmenu",
                        key: 'contextmenu',
                        title: '右键菜单',
                        component: <ContextMenuDemo />
                    }
                ]
            }
        ],
        routes: [],
        activeKey: '',
        panes: [],
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
                return <Menu.Item key={value.key}>{value.title}</Menu.Item>;
            }
        })
        return res;
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handelMenuClick = ({ item, key, keyPath, domEvent }) => {
        const { routes, panes } = this.state;
        const route = routes.find(value => {
            return value.key === key;
        })

        const activeKey = `${route.key}`;

        const index = panes.findIndex(value => {
            return value.key === key;
        })

        // 如果页面已打开则激活，没打开就添加tab页并激活
        if (index > -1) {
            this.setState({ activeKey });
        } else {
            panes.push({ title: route.title, content: route.component, key: route.key });
            this.setState({ panes, activeKey });
        }

    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        // 如果关闭的是当前页签，则将当前页签的前一个激活，否则显示第一个页签
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    collect = props => {
        return { name: props.name };
    }

    closeAllTab = (e, data, target) => {
        this.setState({ panes: [] })
    }

    closeOtherTab = (e, data, target) => {
        const { panes } = this.state;
        const pane = panes.find(value => {
            return value.key === data.name;
        })
        this.setState({ panes: [pane], activeKey: pane.key })
    }

    render() {

        const { menuRoutes } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />

                    <Menu theme="dark" mode="inline" onClick={this.handelMenuClick}>
                        {this.getMenu(menuRoutes)}
                    </Menu>

                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Tabs
                            hideAdd
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {this.state.panes.map(pane => (
                                <TabPane tab={
                                    <ContextMenuTrigger id="tabContextmenu" collect={this.collect} name={pane.key}>
                                        {pane.title}
                                    </ContextMenuTrigger>
                                } key={pane.key}>
                                    {pane.content}
                                </TabPane>
                            ))}
                        </Tabs>
                        <ContextMenu id="tabContextmenu" >
                            <MenuItem data={{ foo: '1' }} onClick={this.closeAllTab}>
                                <Button block>关闭所有</Button>
                            </MenuItem>
                            <MenuItem data={{ foo: '2' }} onClick={this.closeOtherTab}>
                                <Button block>关闭其他</Button>
                            </MenuItem>
                        </ContextMenu>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default UseTabs;