import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class SearchRes2 extends Component<any,any> {

    constructor(props:any){
        super(props);
        this.state = {
            hashtagName: "",
            hashtagList: [],
            text: '',
            hashtagsId: ''
        }
    }

    handleChange = (e:any) => {
        console.log(e.target.value)
        this.setState({
            //@ts-ignore
            text: e.target.value 
        })
    }
    hashtagsClick = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e);
    }

    sendSearchTxt = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e);
        this.setState({
            text: ''
        });
    }

    createElement(el:any){
        const i=el;
        return(
            <div key={i} onClick={() => {this.hashtagsClick(el)}}>{el}</div>
        );
    }

    componentDidMount() {
        controller.getHashtag().then(res => {
            //this.state.gashtags ==> res.data
            const hashtagdb = res.data.map(function(i:any){
                return i.hname;
            })
            this.setState({
                hashtagName: hashtagdb,
            });
            console.log(this.state.hashtagName);
        })
    }
    
    
    render() {
        return (
            <div className="searchs">
            <div>
                    <input type="text" id="searchTxt" value={this.state.text} onChange={this.handleChange}/>
                    <input type="button" id="searchBtn" onClick={() => this.sendSearchTxt(this.state.text)} />
                </div>
                <div className="searchRes">
                    {_.map(this.state.hashtagName,el => this.createElement(el))}                
                </div>
            </div>
        );
    }
}

export default SearchRes2;