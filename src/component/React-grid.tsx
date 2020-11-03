import React, { memo } from 'react';
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import _, { update } from "lodash";
import * as controller from './Controller';
import { isTemplateSpan } from 'typescript';
import './React-grid.css';

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
    console.log(memo);

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
      this.props.saveItems(changeItems);
    console.log("on Layout Change 완료 ")
    console.log(this.state.items) //items에 xywh 옮겨지고 mno,mcon 유지됨 
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
     console.log("componentDidUpdate: "+this.state.layout);
      }
}

propsControl(props:any){
  this.setState({
    mode: props.mode 
  })
  console.log("mode: "+this.state.mode)
}

  componentDidMount() {

    this.propsControl(this.props)

    console.log("componentDidMount 시작");
    controller.getMemoList().then(res => {
      const memo = res.data.map((i:any, key:any, list:any) => {
        let chcon = '';
        if(i.mhList!=null){
          // eslint-disable-next-line array-callback-return
          i.mhList.map(function(tag:any, key:any){
            chcon = i.mcon.replace(tag.hname,'<strong style="color: rgb(102, 163, 224);">'+tag.hname+'</strong>');
            
          })
        }else{
          chcon = i.mcon;
        }

        let cordList = i.mcord.split(",");
          console.log("cordList");
          console.log(cordList)
          console.log(cordList.slice(0,1))

        if(this.state.mode === 2){
          return {
            i: key.toString(),
            //메모 한줄 갯수 바꿀시 수정 필요
            x: cordList.slice(0,1),
            y: cordList.slice(1,2),
            w: cordList.slice(2,3),
            h: cordList.slice(3,4),
            mno: i.mno,
            chcon: chcon,
            mdate: i.mdate,
            hashtag: i.mhList,
            mcon: i.mcon,
          };
        }else {
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
        }
          
          
        })
         this.setState({
           items: memo, //items에 memo를 다 넣어놨고 
         });
         console.log("처음 controller - memo - items");
         console.log(this.state.items);
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