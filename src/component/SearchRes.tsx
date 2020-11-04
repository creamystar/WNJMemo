import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class SearchRes extends Component<any,any> {

    constructor(props:any){
        super(props);
        this.state = {
            hashtagName: "",
            hashtagList: [],
            text: '',
            hashtagsId: ''
        }
        this.sendSearchTxt = this.sendSearchTxt.bind(this);
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
    sendSearchTxt(con:string){
        const reg = /^#/gm;
        con = con.replace(reg,"");
        controller.searchTag(con)
        .then( res=> {
            if(res.data.tagList.length !== 0){
                const hashtagdb = res.data.tagList.map(function(i:any){
                    return i.hname;
                })
                this.setState({
                    hashtagName: hashtagdb,
                });
            }else{
                alert("검색 결과가 없습니다.")
            }
        })
        .catch(e =>{
            alert("검색 실패")
        })
    }
    createElement(el:any){
        const i=el;
        return(
            <div key={i} onClick={() => {this.hashtagsClick(el)}}>{el}</div>
        );
    }
    render() {
        return (
            <div className="searchs">
                <div>
                    <input type="text" id="searchTxt" value={this.state.text} onChange={this.handleChange}/>
                    <input type="button" id="searchBtn" onClick={()=>this.sendSearchTxt(this.state.text)} />
                </div>
                <div className="searchRes">
                    {_.map(this.state.hashtagName,el => this.createElement(el))}                
                </div>
            </div>
        );
    }
}

export default SearchRes;