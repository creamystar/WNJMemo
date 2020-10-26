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
    //onLayoutChange: function() {},
  };

  constructor(props:any) {
    super(props);
    this.state = { 
      items: '', //메모 배열들이 저장되어 있음 
      newCounter: 0,
      layout: []
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
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
    console.log("memo x/y/w/h/mno: "+el.x+"/"+el.y+"/"+el.w+"/"+el.h+"/"+el.mno);

    return ( 
      <div key={i} data-grid={el}>
        {/* {<span className="text">{i}</span>} */}
        <span className="update" onClick={()=> this.props.updateTarget(el)}>
        </span>
        <span className="remove" onClick={this.onRemoveItem.bind(this, i)}>
        </span>
        <span className="memoHead">
        {el.mno}
        </span>
        <span className="memodate">
        {el.mdate}
        </span>
        <span className="memoCon">
        {el.mcon}
        </span>
      </div>
    );
  }

  onLayoutChange(layout:any) {
    this.setState({ layout: layout });
    console.log("on layoutchange find key? "+layout);
  }
  
  onRemoveItem(i:number) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
  onUpdateItem(i:number) {
    console.log("updating", i);
    //수정화면 떠야함 (추가화면 복붙)
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevState.layout.length !== this.state.layout.length) {//이전과 현재 state 비교, 바뀌면 실행
     console.log(this.state.layout);
      }
}
  componentDidMount() {
    controller.getMemoList().then(res => {
      const memo = res.data.map(function(i:any, key:any, list:any) {
          return {
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: (key * 2)%10,
            y: 0,
            w: 2,
            h: 2,
            mno: i.mno,
            mcon: i.mcon,
            mdate: i.mdate,
            hashtag: i.mhList,
          };
        })
         this.setState({
           items: memo,
         });
        console.log("getmemo from controller: "+this.state.items[2].mno); //20 
        //items에는 각 키 i 기준으로 다 들어있다는 것... 
        //이거가지고 바꿔보면..? 

        //최신순에서 모양 바꾸고 저장하면 - 저장순으로 셀렉박스 바뀌고
        //alert("최신순에서 모양을 저장하면 저장순으로 보여집니다. 다시 최신순으로 보고싶으면 메모 우측 상단 셀렉트박스에서 최신순을 선택해주세요.");
        //다시 최신순 가면 일정한 모양으로 돌아가고 
        //최신순에서 메모추가하면 - 일정한 모양으로 다시 다 돌아가고 가장 왼쪽 상단에 메모 추가되고 
        //저장 순에서는 그 메모는 맨 밑으로 가있고 
        //저장 순에서는 메모추가가 안되고
        //저장 순에서 모양 바꾸고 저장하면 - 그대로 저장순 

        //사용법 같은거.. 클릭해서 볼 수 있게 How to Use 같은거 우측 상단 빈공간에 넣어주기 
    }).catch((e:any) => {
      console.log(e);
      alert("서버와의 통신이 원활하지 않습니다.");
    })
  }
  //--End Axios
  render() {
    return (
      <div>
        {/* 추가버튼 삭제 예정 */}
        <button onClick={this.onAddItem}>Add Item</button>
        <ReactGridLayout
          layout={this.state.layout} 
          onLayoutChange={this.onLayoutChange}
          //onResize={this.onResize.bind(this)}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}

export default BasicLayout;