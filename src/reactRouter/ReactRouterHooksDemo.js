import React, { Component } from 'react';
// 引入react-router-dom相关的组件
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    useHistory,
    useLocation
} from "react-router-dom";

/**
 * react-router-dom相关Hooks函数
 * 1.useParams：获取url上的参数
 * 2.useRouteMatch:获取路由参数，常用匹配的参数有path和url
 * 3.useHistory：获取history对象用于路由跳转
 * 4.useLocation:获取一个表示当前定位的对象，包含url,hash等参数
 */
class ReactRouterHooksDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

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
                                <Link to="/home/1">Home1</Link>
                            </li>
                            <li>
                                <Link to="/home/2">Home2</Link>
                            </li>
                            <li>
                                <Link to="/home/3">Home3</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
                            </li>
                        </ul>
                    </div>

                    <div style={{ flex: 1, padding: "10px" }}>
                        <Switch>
                            <Route path="/home/:id" children={<Child />} />
                            <Route path="/topics">
                                <Topics />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}

function Topics() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
    // console.log(`path:${path}----url:${url}`)
    /**
     * 此处path和url匹配的结果都是 '/topics'
     */

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Switch>
                <Route path={`${path}/:topicId`}>
                    <Topic />
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();

    let { path, url } = useRouteMatch();
    console.log(`path:${path}----url:${url}`)

    /**
     * 打印结果：
     *  path:/topics/:topicId----url:/topics/rendering 
     *  path:/topics/:topicId----url:/topics/components 
     *  path:/topics/:topicId----url:/topics/props-v-state
     * 
     * 所以path匹配的是Route组件中的path属性，与属性字符串完全相同
     * 而url匹配的则是真实的路径
     */

    let history = useHistory();
    /**
     * history对象常用方法(官方文档)：
     * history objects typically have the following properties and methods:

        length - (number) The number of entries in the history stack
        action - (string) The current action (PUSH, REPLACE, or POP)
        location - (object) The current location. May have the following properties:
            pathname - (string) The path of the URL
            search - (string) The URL query string
            hash - (string) The URL hash fragment
            state - (object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
        push(path, [state]) - (function) Pushes a new entry onto the history stack
        replace(path, [state]) - (function) Replaces the current entry on the history stack
        go(n) - (function) Moves the pointer in the history stack by n entries
        goBack() - (function) Equivalent to go(-1)
        goForward() - (function) Equivalent to go(1)
        block(prompt) - (function) Prevents navigation (see the history docs)

     */

    function handleClick() {
      history.push("/home/1");
    }

    // 与history对象的location属性相同
    let location = useLocation();
    console.log(location);

    return (
        <div>
            <button type="button" onClick={handleClick}>
                Go Home1
            </button>
            <h3>{topicId}</h3>
        </div>
    );
}

export default ReactRouterHooksDemo;