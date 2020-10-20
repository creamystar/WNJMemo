import React, { Component } from 'react';
import './MemoCrud.css';
//@ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
/*
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
*/

/*
ClassicEditor.editorConfig = function(config:any) {
    config.toolbarGroups = [{
        name: 'document', groups: ['mode','document','tools']
    }]
}*/

ClassicEditor.create( document.querySelector( '#editor' ), { 
    //---------------------------------------------------------------- 
    // 여기 툴바 부분의 옵션명을 넣어주면 원하는 설정을 할수 있습니다. 
    toolbar: [ 'bold', 'italic', 'underline', 'strikethrough', 'numberedList', 'blockQuote' ], 
    //---------------------------------------------------------------- 
     } ) 
    .catch( (error: any) => { console.log( error ); } );

class MemoCrud extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
         
        }
      }

    set = {
        oneMemo: ''
    }
    exit(){
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display="none";
    }
    cancleClick(){
        //@ts-ignore
        document.getElementById("memoCrudAll").style.display="none";
    }
    wirteClick(){
        alert("");
        //alert(CKEditor.getDate());
        
    }
    
    render() {
        return (
            <div id="memoCrudAll">
                <div className="wrap" id="wrap" onClick={this.exit}></div>
                <div className="editorSpace" id="editorSpace">
                    <h2 id="memoCreate">Memo Editor</h2>
                    <div id="memoBtn">
                        <input type="button" id="writeEditorBtn" value="완료" onClick={this.wirteClick}/>
                        <input type="button" id="cancleEditorBtn" value="취소" onClick={this.cancleClick}/>
                    </div>
                    <CKEditor
                        onInit={ (editor:any) => console.log( 'Editor is ready to use!', editor ) }
                        onChange={ ( event:any, editor:any ) => 
                            console.log( { event, editor } ) }
                        
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                />
                </div>
            </div>
        );
    }
}

export default MemoCrud;