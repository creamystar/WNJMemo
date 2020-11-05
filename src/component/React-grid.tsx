import React from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
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
      memoListTemp: [],
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.updateMemo = this.updateMemo.bind(this);
    this.createElement = this.createElement.bind(this);
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
     console.log("onlayoutchange in(memoList보기)")
     console.log(this.state.memoList)
     if(this.state.memoList.length !== 0){
      const changeItems = this.state.memoList.map(function(item:any) {
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
        this.props.setMemoListTemp(changeItems); 
     }
      //memoListTemp에 xywh 옮겨지고 mno,mcon 유지됨 
    console.log("on Layout Change 완료(memoListTemp보기) ")
    console.log(this.state.memoListTemp)

  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if(prevProps.memoList !== this.props.memoList){
      this.setState({
        memoList: this.props.memoList,
      })
    }
    if(prevProps.memoListTemp !== this.props.memoListTemp){
      this.setState({
        memoListTemp: this.props.memoListTemp,
      })
    }
    if(prevProps.selectVal!== this.props.selectVal){
      this.setState({
        memoList: '',
      })
    }
  }
  render() {
    return (
      <div>
        <ReactGridLayout
          //layout={this.state.layout} 
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {_.map(this.state.memoList, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}

export default BasicLayout;