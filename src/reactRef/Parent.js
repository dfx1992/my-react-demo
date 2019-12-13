import React, { Component } from 'react';
import Child from './Child';
import './common.css';

class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consoleLogs: [],
        };
    }

    run = () => {
        const { consoleLogs } = this.state;
        consoleLogs.push('run方法被调用')
        this.setState(consoleLogs);
    }

    // 清除方法被调用的信息
    cleanLog = () => {
        this.setState({ consoleLogs: [] });
    }

    // 获取子组件，并调用子组件run()方法
    getChildMethod = () => {
        const { run } = this.refs.child;
        run();
    }

    render() {
        const { consoleLogs } = this.state;
        const logList = consoleLogs.map(value => {
            return <li>{value}</li>
        })
        return (
            <div>
                <div className="parent">
                    <div>这是父组件</div><button onClick={this.getChildMethod}>调用子组件run()方法</button>
                    <ul className="console">
                        <button onClick={this.cleanLog}>清除log</button>
                        consoleLog:
                {logList}
                    </ul>

                </div>
                <Child parent={this} ref="child" />
            </div>
        );
    }
}

export default Parent;