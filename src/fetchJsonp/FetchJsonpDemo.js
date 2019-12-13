import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

/**
 * fetch-jsonp用于跨域请求
 */
class FetchJsonpDemo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            response:[],
         };
    }

useFetchJsonp = ()=>{
    fetchJsonp('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20')
    .then(response=>{
        //第一个.then 中获取到的不是最终数据，而是一个中间的数据流对象(Response对象)；
        console.log(response)
        return response.json();
    }).then(json=>{
        // json获取的是实际的请求返回数据
        console.log(json)
        this.setState({response:json.result})
    }).catch(ex=>{
        alert("请求错误！！");
        console.log(ex);
    })
}

    render() {
        return (
            <div>
                <button onClick={this.useFetchJsonp}>
                    使用fetch-jsonp获取数据
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

export default FetchJsonpDemo;