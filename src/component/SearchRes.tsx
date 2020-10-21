import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class SearchRes extends Component<any,any> {



    constructor(props:any){
        super(props);
        this.state = {
            hashtagName: "",
            hashtags: ['논태그','리액트','반복문','바나나우유','텀블러'],
            hashtagList: [],
            text: '#여행',
            hashtagsId: ''
        }
    }

    sendCompanyName = (e:any) => {
        this.setState = {
            //@ts-ignore
            text: e.target.value
        }
    }
    hashtagsClick = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e)
    }

    sendSearchTxt(){
        //@ts-ignore
        this.props.setLeftTxt({text});
    }

    createElement(el:any){
        const i=el;
        return(
            <div onClick={() => {this.hashtagsClick({i})}}>{i}</div>
        );
    }

    componentDidMount() {
        controller.getHashtag().then(res => {
            //this.state.gashtags ==> res.data
            const hashtagdb = this.state.hashtags.map(function(i:any){
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
                    <input type="text" id="searchTxt" value={this.state.text} onChange={this.sendCompanyName}/>
                    <input type="button" id="searchBtn" onClick={this.sendSearchTxt} />
                </div>
                <div className="searchRes">
                    {_.map(this.state.hashtagName,el => this.createElement(el))}                
                </div>
            </div>
        );
    }
}

export default SearchRes;