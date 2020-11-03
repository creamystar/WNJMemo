import './Howtouse.css';
import React, { useEffect } from 'react';

//@ts-ignore
function Howtouse({ history }) {
    
        const goBack = () => {
            history.goBack(); //뒤로가기. 새로고침 안됨 
        };
    
        const goHome = () => {
            history.push('/'); //새로 고침 안됨 
        };
    
        useEffect(() => {
            console.log(history);
            const unblock = history.block('정말 창을 닫으시겠습니까?');
            return() => {
                unblock();
                // eslint-disable-next-line no-restricted-globals
                //location.href = document.referrer; //새로고침 
            };
        }, [history]);
    
    return(
        <div id="wrap">
                <div id="fakeWrap" onClick={goHome}></div>
                <div id="center">
                    {/* onClick={moveRoute} */}
                    <div>
                        <div>
                            #해시태그_그리드 메모
                            <br/><br/>
                            이 메모는 당신이 원하는 대로 태그를 붙이고 <br/>
                            또 당신이 원하는 모양대로 만들어 <br/>
                            그 모양을 저장하는 기능이 가능한 메모입니다.<br/>
                            <br/>
                            메모 오른쪽 아래 아이콘을 드래그하여 <br/>
                            크게 보고 싶은 메모는 크게,<br/>
                            작게 보고 싶은 메모는 작게,<br/>
                            중요한 메모는 위에, 덜 중요한 메모는 아래에 보관하세요!<br/>
                            <br/>
                            그리고 메모를 작성할 때 '#'을 통해<br/>
                            나중에 메모를 불러올 태그를 붙여주세요!<br/>
                            <br/>
                            태그별 메모를 확인하고, <br/>
                            필요한 정보를 간편하게 불러오기 쉽습니다!<br/>
                            <br/>
                            #해시태그_그리드 메모에 더 좋은 아이디어가 있다면,<br/>
                            메일을 보내주세요!<br/>
                            hashtag_grid_memo@gmail.com 
                        </div> 
                    </div><br/>
                    <button id="okBtn" onClick={goHome}>확인</button>
                </div>
            </div>
        );
    }

export default Howtouse;
 



            