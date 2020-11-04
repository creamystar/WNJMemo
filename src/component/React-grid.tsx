import React, { memo } from 'react';
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import * as controller from './Controller';
import { isTemplateSpan } from 'typescript';
import './React-grid.css';
import _ from "lodash";

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.PureComponent<any,any> { //앞, 뒤 : props, state 쓰겠다는 선언 (없으면 못씀)
  static defaultProps = {
    className: "layout",
    rowHeight: 100,
    cols: 10,
    // rowHeight: 30,
    //onLayoutChange: function() {},
    item: [],
    mode: 1,
  };
  constructor(props:any) {
    super(props);
    this.state = { 
      layout: [],
      memoList: [],
      items: [],
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.updateMemo = this.updateMemo.bind(this);
  }
 
  updateMemo(e:any){
    this.props.setModalVal(true);
    this.props.setMemo(e);
  }
  createElement(el:any) {
    const i = el.i;
    return ( 
      <div key={i} data-grid={el}> 
        {/* {<span className="text">{i}</span>} */}
        <span className="update" onClick={()=> this.updateMemo(el)}>
        </span>
        <span className="remove" >
        </span>
        <span className="memoHead">
        {el.mno}
        </span>
        <span className="memodate">
        {el.mdate}
        </span>
        <span className="memoCon" dangerouslySetInnerHTML={{__html: el.chcon}}>
        </span>
      </div>
    );
  }
  //grid 변할때마다 배치저장위해 items에 담아놓기 
   onLayoutChange(layout:any) {
     console.log("onlayoutchange in")
     console.log(this.state.memoList)
    console.log("변하면 들어오나?");
    const changeItems = this.state.items.map(function(item:any) {
      const i = item.i
        return {
          ...item,
          i: i,
          //메모 한줄 갯수 바꿀시 수정 필요
          x: layout[i].x,
          y: layout[i].y ,
          w: layout[i].w ,
          h: layout[i].h ,
        };
      })
      //this.props.setMemoList(changeItems); 
      //memoListTemp에 xywh 옮겨지고 mno,mcon 유지됨 
    console.log("on Layout Change 완료 ")
    console.log(changeItems)
    console.log(this.state.memoList) 

  }

  componentDidUpdate(prevProps:any, prevState:any) {
    this.setState({
      items: this.props.memoList,
    })
  }
  render() {
    return (
      <div>
        <ReactGridLayout
          //layout={this.state.layout} 
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}

export default BasicLayout;