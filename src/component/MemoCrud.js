import React, { Component } from 'react';
import './MemoCrud.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ClassicEditor.editorConfig = function(config) {
    config.toolbarGroups = [
        {name: 'document', groups: ['mode','document','doctools']}
    ]
}

class MemoCrud extends Component {
    exit(){
        document.getElementById("memoCrudAll").style.display="none";
    }
    
    render() {
        return (
            <div id="memoCrudAll">
                <div className="wrap" onClick={this.exit}></div>
                <div className="editorSpace">
                    <h2 id="memoCreate">Memo Editor</h2>
                    <div id="memoBtn">
                        <input type="button" id="writeEditorBtn" value="완료"/>
                        <input type="button" id="cancleEditorBtn" value="취소"/>
                    </div>
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            //data 넘겨줘야함 
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                    />
                </div>
            </div>
        );
    }
}

export default MemoCrud;