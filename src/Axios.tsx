import axios from 'axios';

export function getMemo(){
    return axios.get('http://localhost:8080/select');
}