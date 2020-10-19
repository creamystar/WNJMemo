import React from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import * as controller from './Controller';

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
      items: '',
      newCounter: 0 
    };
    this.onAddItem = this.onAddItem.bind(this);
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

    // controller.createMemo('Axios Testing...');
  }
  createElement(el:any) {
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        {/* {<span className="text">{i}</span>} */}
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
        <span className="memoHead">
        {el.mno}
        </span>
        <span className="memoHead">
        {el.mdate}
        </span>
        <span className="memoCon">
        {el.mcon}
        </span>
        
      </div>
    );
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
    controller.getMemo().then(res => {
      const memo = res.data.map(function(i:any, key:any, list:any) {
          return {
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: (key * 2)%8!=0?(key * 2)%10:(key * 2),
            y: (key*2)/2,
            w: 2,
            h: 2,
            mno: i.mno,
            mcon: i.mcon,
            mdate: i.mdate,
          };
        })
        this.setState({
          items: memo,
        });
        console.log(this.state.items);
    })
  }
  //--End Axios
  render() {
    return (
      <div>
        {/* 추가버튼 삭제 예정 */}
        <button onClick={this.onAddItem}>Add Item</button> 
        <ReactGridLayout
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