
import axios from 'axios';

const url = 'http://localhost:8080/';

export function getMemo(){
    return axios.get(url+'select');

}
export function getMemoList(){
    return axios.get(url+'getMemo');

}
export function createMemo(mcon:string,tags:any){
    
    return axios.post(url+'createMemo',{mcon:mcon, tags:tags});

}
export function saveSeq(info:any){
    return axios.put(url+'saveSeq',{info:info});

}
export function updateMemo(mno:number,mcon:string,tags:any){
    //console.log("mno 잘 나오고 있는지: "+mno)
    return axios.post(url+'updateMemo/'+mno,{ mcon:mcon, tags:tags });

}
export function getHashtag(){
    return axios.get(url+'htag/select');
    
}
export function deleteMemo(mno:number){
    return axios.put(url+'delete',{ mno:mno });
}