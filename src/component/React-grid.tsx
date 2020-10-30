import React from 'react';
import RGL, {WidthProvider} from "react-grid-layout";
import _ from "lodash";
import store from '../redux/store';

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
    }
  };
  constructor(props:any) {
    super(props);
    this.state = { 
      items: '', //메모 배열들이 저장되어 있음 
      newCounter: 0,
      layout: []
    };
    store.subscribe(function(){
      //@ts-ignore
      this.setState({items:store.getState().items});
  }.bind(this));
    this.onLayoutChange = this.onLayoutChange.bind(this);
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
        <span className="memoCon" dangerouslySetInnerHTML={{__html: el.chcon}}>
        </span>
      </div>
    );
  }
  //grid 변할때마다 배치저장위해 memo에 담아놓기 
  onLayoutChange(layout:any) {
    //여기서 디버그를 하면 layout에 w h x y i 가 있음을 알 수 있다. 
    // this.setState({
    //   items: layout.map((i:any, key:any) => {
    //     //메모 한줄 갯수 바꿀시 수정 필요
    //     return {
    //       i: i.i,
    //       x: i.x,
    //       y: i.y,
    //       w: i.w,
    //       h: i.h
    //     };
    //   })
    // });
    console.log("layout/items 확인");
    console.log(layout);
    console.log(this.state.items);

    //layout에서 달라진 xywh를 items로 
    // const item = this.state.items.map(
    //   layout.map(
    //     item => i === layout.i 
    //     ? {...item, ...data
    //   )
    // )

  }

  // fromLayoutToMemo(layout:any){
  //   layout.map((arrange,i) => {
  //     return (
  //       this.setState({
  //         items: layout 
  //       })
  //     )
  //   })
  // }
  
  onRemoveItem(i:number) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevState.layout.length !== this.state.layout.length) {//이전과 현재 state 비교, 바뀌면 실행
     console.log("componentDidUpdate: "+this.state.layout);
    }
  }
  componentDidMount() {
    console.log("componentDidMount 시작");
        //items에는 각 키 i 기준으로 다 들어있다는 것... 
        //이거가지고 바꿔보면..? 

        //최신순에서 모양 바꾸고 저장하면 - 저장순으로 셀렉박스 바뀌고
        //alert("최신순에서 모양을 저장하면 저장순으로 보여집니다. 다시 최신순으로 보고싶으면 셀렉트박스에서 최신순을 선택해주세요.");
        //다시 최신순 가면 일정한 모양으로 돌아가고 
        //최신순에서 메모추가하면 - 일정한 모양으로 다시 다 돌아가고 가장 왼쪽 상단에 메모 추가되고 
        //저장 순에서는 그 메모는 맨 밑으로 가있고 
        //저장 순에서는 메모추가가 안되고
        //저장 순에서 모양 바꾸고 저장하면 - 그대로 저장순 

        //사용법 같은거.. 클릭해서 볼 수 있게 How to Use 같은거 우측 상단 빈공간에 넣어주기 
  }
  render() {
    return (
      <div>
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