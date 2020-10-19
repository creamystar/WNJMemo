import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import axios from "axios";

const ReactGridLayout = WidthProvider(RGL);

class BasicLayout extends React.PureComponent<any,any> { //앞, 뒤 : props, state 쓰겠다는 선언 (없으면 못씀)

  static defaultProps = {
    className: "layout",
    rowHeight: 100,
    cols: 10,
    // rowHeight: 30,
    onLayoutChange: function() {},
  };

  constructor(props:any) {
    super(props);

    this.state = { 
      items: [0,1,2,3,4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
        };
      }),
      newCounter: 0 
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }
  onAddItem() { 
    // 메모 추가기능 수정시 같이 수정할 예정 -김누리
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 10),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }
  createElement(el:any) {
    
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        {<span className="text">{i}</span>}
        <span
          className="remove"
          style={{position: "absolute",
          right: "2px",
          top: 0,
          cursor: "pointer"}}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }
  onBreakpointChange(breakpoint:string, cols:number) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }
  onLayoutChange(layout:any) {
    this.props.onLayoutChange(layout);
  }
  onRemoveItem(i:number) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  // Axios 예제
  componentDidMount() {
    this.getMemo();
  }
  getMemo = () => {
    axios.get('http://localhost:8080/select')
    .then(res => {
        const memo = res.data.map(function(i, key, list) {
            return {
              i: key.toString(),
              x: key * 2,
              y: 0,
              w: 2,
              h: 2,
              mno: i.mno,
              mcon: i.mcon,
              mdate: i.mdate,
            };
          })
      this.setState({
        items: memo,
        newCounter: 0 
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  //--End Axios
  render() {
    return (
      <div>
        {/* 추가버튼 삭제 예정 */}
        <button onClick={this.onAddItem}>Add Item</button> 
        <ReactGridLayout
          //onBreakpointChange={this.onBreakpointChange}
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