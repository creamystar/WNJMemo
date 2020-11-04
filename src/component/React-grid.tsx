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
    item: {
      i: 0,
      x: 0,
      y: 0,
      h: 0,
      w: 0
    },
    mode: 1
  };
  constructor(props:any) {
    super(props);
    this.state = { 
      items: '', //메모 배열들이 저장되어 있음 
      layout: []
    };
    //this.onLayoutChange = this.onLayoutChange.bind(this);
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
        <span className="remove" onClick={this.onRemoveItem.bind(this, i)}>
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
    console.log("변하면 들어는 오나?");
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
      this.setState({
        items: changeItems
      })
      // this.props.saveItems(changeItems);
    console.log("on Layout Change 완료 ")
    console.log(this.state.items) //items에 xywh 옮겨지고 mno,mcon 유지됨 
  }
  onRemoveItem(i:number) {
    // console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
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
          layout={this.state.layout} 
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}

export default BasicLayout;