import React, { Component } from 'react';
import _ from "lodash";
import * as controller from './Controller';

class HashTags extends Component<any,any> {

    constructor(props:any){
        super(props);
        this.state = {
            hashtagName: "",
            hashtags: ['논태그','리액트','반복문','바나나우유','텀블러'],
            hashtagList: []
        }
    }

    hashtagsClick = (e:any) => {
        //@ts-ignore
        this.props.setLeftTxt(e)
    }


    createElement(el:any){
        const i=el;
        return(
            <div key={i} onClick={() => {this.hashtagsClick({el})}}>{el}</div>
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
            <div className="hashtags">
                {_.map(this.state.hashtagName,el => this.createElement(el))}
            </div>
        );
    }
}

export default HashTags;