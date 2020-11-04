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
                const memoList = res.data.memoList.map(function(i:any, key:any, list:any) {
                    let chcon='';
                    hashtagdb.map(function(tag:any, key:any){
                        if(key===0) chcon=i.mcon;
                        chcon = chcon.replace(tag.hname,'<strong style="color: rgb(102, 163, 224);">'+tag.hname+'</strong>');
                    })
                    return {
                        i: key.toString(),
                        //메모 한줄 갯수 바꿀시 수정 필요
                        x: (key * 2)%10,
                        y: 0,
                        w: 2,
                        h: 2,
                        mno: i.mno,
                        chcon: chcon,
                        mdate: i.mdate,
                        hashtag: i.mhList,
                        mcon: i.mcon,
                      };
                });
                this.props.setMemoList(memoList);
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