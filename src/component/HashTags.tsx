import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class HashTags extends Component<any,any> {

    constructor(props:any){
        super(props);
        this.state = {
            hashtagName: "",
        }
    }
    hashtagsClick = (e:any) => {
        if(this.props.modeVal===false)
            this.props.ta.setSearchMode(true);
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
    createElement(el:any){
        const i=el.hno;
        return(
            <div key={i} onClick={() => {this.hashtagsClick(el)}}>{el.hname}</div>
        );
    }

    componentDidMount() {
        controller.getHashtag().then(res => {
            this.setState({
                hashtagName: res.data,
            });
        }).catch((e:any) => {
            console.log(e);
            alert("서버와의 통신이 원활하지 않습니다.");
        })
    }
    render() {
        return (
            <div className="hashtags">
                {_.map(this.state.hashtagName,el => this.createElement(el))}
            </div>
        );
    }
}

export default HashTags;