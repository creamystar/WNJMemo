
import axios from 'axios';

const url = 'http://localhost:8080/';

export function getMemo(){
    return axios.get(url+'select');

}
export function getMemoList(){
    console.log("몇번 도는가 ")
    return axios.get(url+'getMemo');

}
export function createMemo(mcon:string,tags:any){
    
    return axios.post(url+'createMemo',{mcon:mcon, tags:tags});

}
export function saveSeq(info:any){
    return axios.put(url+'saveSeq',{info:info});

}
export function updateMemo(mno:number,mcon:string,tags:any){
    return axios.put(url+'updateMemo/'+mno,{ mcon:mcon, tags:tags});

}
export function getHashtag(){
    console.log("몇번 도는가 ")
    return axios.get(url+'htag/select');
    
}
