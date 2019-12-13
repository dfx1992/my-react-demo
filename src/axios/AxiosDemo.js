import React, { Component } from 'react';
import axios from 'axios';

class AxiosDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            error: {},
        };
    }

    useAxios = () => {
        axios.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20')
            .then( (response)=> {
                console.log(response)
                this.setState({response:response.data.result})
            })
            .catch( (error)=> {
                console.log(error)
            });
    }

    render() {
        return (
            <div>
                <button onClick={this.useAxios}>
                    使用axios获取数据
                </button>
                <ul>
                    {this.state.response.map((value,index)=>{
                    return <li>{index}:{value.title}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default AxiosDemo;