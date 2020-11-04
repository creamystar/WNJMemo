//Action
const SETMEMOLIST = 'main/SETMEMOLIST' as const;
const SETMODALVAL = 'main/SETMODALVAL' as const;
const SETMEMO = 'main/SETMEMO' as const;
const SETSEARCHMODALVAL = 'main/SETSEARCHMODALVAL' as const;

//ActionCreator
export const setMemoList = (getPayload:any) => ({
    type: SETMEMOLIST,
    payload: getPayload
})
export const setModalVal = (getPayload:boolean) => ({
    type: SETMODALVAL,
    payload: getPayload
})
export const setMemo = (getPayload:any) => ({
    type: SETMEMO,
    payload: getPayload
})
export const setSearchModalVal = (getPayload:boolean) => ({
    type: SETSEARCHMODALVAL,
    payload: getPayload
})

//type 지정
type MainState = {
    memoList: any,  
    modal: boolean,
    memo: any,
    searchModal: boolean,
}
type MainAction = 
    | ReturnType<typeof setMemoList>
    | ReturnType<typeof setModalVal>
    | ReturnType<typeof setMemo>
    | ReturnType<typeof setSearchModalVal>;

//Reducer
const initialState: MainState = {
    memoList: '',
    memo: '',
    modal: false,
    searchModal: false,
}
export default function main (state = initialState, action: any) {
    switch (action.type) {
        case SETMEMOLIST :
            return {...state, memoList : action.payload}
        case SETMODALVAL :
            return {...state, modal : action.payload}
        case SETMEMO :
            return {...state, memo : action.payload}
        case SETSEARCHMODALVAL :
            return {...state, searchModal : action.payload}
        default:
            return state;
    }
}