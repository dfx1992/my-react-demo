import React, { Component } from 'react';
import {Button} from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class ContextMenuDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick = (e, data) => {
        // console.log(e)
        // console.log(data.foo);
    }

    handleGetTargetName = (e, data, target)=>{
        // console.log(data)
        // console.log(target)
        alert(`name:${data.name}`)
    }

    collect = props=>{
        // console.log(props)
        return {name:props.name}
    }
    render() {
        return (
            <div>
                <ContextMenuTrigger id="some_unique_identifier" collect={this.collect} name='fff'> {/* NOTICE: id must be unique for EVERY instance */}
                    <div style={{backgroundColor:'#fff',padding:'20px',textAlign:'center'}}>Right click to see the menu</div>
                </ContextMenuTrigger>
                <ContextMenuTrigger id="some_unique_identifier" collect={this.collect} name='ddd'> {/* NOTICE: id must be unique for EVERY instance */}
                    <div style={{backgroundColor:'#fff',padding:'20px',textAlign:'center',marginTop:'10px'}}>Right click to see the menu</div>
                </ContextMenuTrigger>

                <ContextMenu id="some_unique_identifier" style={{backgroundColor:'#eee',padding:'5px',}}>
                    <MenuItem data={{ foo: '1' }} onClick={this.handleGetTargetName}>
                        <Button block>get target name</Button>
                    </MenuItem>
                    <MenuItem data={{ foo: '2' }} onClick={this.handleClick}>
                        <Button block>ContextMenu Item 2</Button>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ foo: '3' }} onClick={this.handleClick}>
                    <Button block>ContextMenu Item 3</Button>
                    </MenuItem>
                </ContextMenu>

            </div>
        );
    }
}

export default ContextMenuDemo;