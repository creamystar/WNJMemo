import axios from 'axios';

export function getMemo(){
    return axios.get('http://localhost:8080/select');

}
export function getMemoList(){
    return axios.get('http://localhost:8080/getMemo');

}
export function createMemo(mcon:string,tags:any){
    return axios.post('http://localhost:8080/createMemo',{mcon:mcon, tags:tags});

}

export function saveSeq(mcord:string, mno:number){
    return axios.put('http://localhost:8080/saveSeq',{mcord:mcord, mno:mno});
}


export function updateMemo(mno:number,mcon:string,tags:any){
    return axios.put('http://localhost:8080/updateMemo',{mno:mno, mcon:mcon, tags:tags});

}
export function getHashtag(){
    return axios.get('http://localhost:8080/htag/select');
}

