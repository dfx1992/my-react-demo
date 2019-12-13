import React, { Component } from 'react';
import './common.css'

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = { consoleLogs: [], };
    }
    run = () => {
        const { consoleLogs } = this.state;
        consoleLogs.push('run方法被调用')
        this.setState(consoleLogs);
    }
    cleanLog = () => {
        this.setState({ consoleLogs: [] });
    }
    render() {
        const {run} = this.props.parent;
        const { consoleLogs } = this.state;
        const logList = consoleLogs.map(value => {
            return <li>{value}</li>
        })
        return (
            <div className="child">这是子组件
            <button onClick={run}>调用父组件run()方法</button>
            <ul className="console">
                <button onClick={this.cleanLog}>清除log</button>
                    consoleLog:
                {logList}
                </ul>
            </div>
            
        );
    }
}

export default Child;