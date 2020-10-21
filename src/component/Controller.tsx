import axios from 'axios';

export function getMemo(){
    return axios.get('http://localhost:8080/select');

}
export function createMemo(mcon:string){
    return axios.post('http://localhost:8080/insert',{mcon: mcon});

}

export function getHashtag(){
    return axios.get('http://localhost:8080/htag/select');
}