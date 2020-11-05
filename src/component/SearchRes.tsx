import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class SearchRes extends Component<any,any> {

    constructor(props:any){
        super(props);
        this.state = {
            tagList: [],
            text: '',
        }
        this.sendSearchTxt = this.sendSearchTxt.bind(this);
    }
    handleChange = (e:any) => {
        console.log(e.target.value)
        this.setState({
            text: e.target.value 
        })
    }
    hashtagsClick = (e:any) => {
        controller.clickTag(e.hno)
        .then( res => {
            if(res.data.length !== 0){
                const memoList =res.data.map(function(i:any, key:any, list:any) {
                    let chcon='';
                    chcon = i.mcon.replace(e.hname,'<strong style="color: rgb(102, 163, 224);">'+e.hname+'</strong>');
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
                this.props.ma.setMemoList(memoList);
                this.props.ta.setTagVal(e);
            }else{
                alert("메모 불러오기 오류");
            }
        })
        .catch(e =>{
            alert("메모 불러오기 실패")
        })
    }
    sendSearchTxt(con:string){
        if(con!==''){
            const reg = /^#/gm;
            con = con.replace(reg,"");
            controller.searchTag(con)
            .then( res=> {
                if(res.data.tagList.length !== 0){
                    const tagList = res.data.tagList;
                    const memoList =res.data.memoList.map(function(i:any, key:any, list:any) {
                        let chcon='';
                        tagList.map(function(tag:any, key:any){
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
                    this.props.ma.setSelectVal(false);
                    this.props.ma.setMemoList(memoList);
                    this.props.ta.setSearchMode(true);
                    this.props.ta.setTagVal('');
                    this.setState({
                        tagList: tagList,
                    });
                }else{
                    alert("검색 결과가 없습니다.")
                }
            })
            .catch(e =>{
                alert("검색 실패")
            })
        }
    }
    createElement(el:any){
        const i=el.hno;
        return(
            <div key={i} onClick={() => {this.hashtagsClick(el)}}>{el.hname}</div>
        );
    }
    componentDidUpdate(prevProps:any, prevState:any) {
        if(prevProps.modeVal === true && this.props.modeVal === false){
            this.setState({
                tagList: '',
                text: '',
            })
        }
    }
    render() {
        return (
            <div className="searchs">
                <div>
                    <input type="text" id="searchTxt" value={this.state.text} onChange={this.handleChange}/>
                    <input type="button" id="searchBtn" onClick={()=>this.sendSearchTxt(this.state.text)} />
                </div>
                <div className="searchRes">
                    {_.map(this.state.tagList,el => this.createElement(el))}                
                </div>
            </div>
        );
    }
}

export default SearchRes;