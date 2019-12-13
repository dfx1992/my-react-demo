import React, { Component } from 'react';
// 引入react-router-dom相关的组件
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


// 实现点击左侧菜单，右侧页面内容变化
class ReactRouterDomDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const routes = [
            {
                path: "/dfx",
                exact: true,
                component: () => <h2>dfx</h2>
            },
            {
                path: "/bubblegum",
                component: () => <h2>Bubblegum</h2>
            },
            {
                path: "/shoelaces",
                component: () => <h2>Shoelaces</h2>
            }
        ];
        return (
            <Router>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            padding: "10px",
                            width: "40%",
                            background: "#f0f0f0"
                        }}
                    >
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>
                                <Link to="/dfx">Home</Link>
                            </li>
                            <li>
                                <Link to="/bubblegum">Bubblegum</Link>
                            </li>
                            <li>
                                <Link to="/shoelaces">Shoelaces</Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ flex: 1, padding: "10px" }}>
                        <Switch>
                            {routes.map((route, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.component />}
                                />
                            ))}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ReactRouterDomDemo;