//Action
const SETMEMOLIST = 'main/SETMEMOLIST' as const;
const SETMODALVAL = 'main/SETMODALVAL' as const;
const SETMEMO = 'main/SETMEMO' as const;

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

//type 지정
type MainState = {
    memoList: any,  
    modal: boolean,
    memo: any,
}
type MainAction = 
    | ReturnType<typeof setMemoList>
    | ReturnType<typeof setModalVal>
    | ReturnType<typeof setMemo>;

//Reducer
const initialState: MainState = {
    memoList: '',
    memo: '',
    modal: false,
}
export default function main (state = initialState, action: any) {
    switch (action.type) {
        case SETMEMOLIST :
            return {...state, memoList : action.payload}
        case SETMODALVAL :
            return {...state, modal : action.payload}
        case SETMEMO :
            return {...state, memo : action.payload}
        default:
            return state;
    }
}