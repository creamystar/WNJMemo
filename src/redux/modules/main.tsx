//Action
const SETMEMOLIST = 'main/SETMEMOLIST' as const;
const SETMODALVAL = 'main/SETMODALVAL' as const;
const SETMEMO = 'main/SETMEMO' as const;
const SETSEARCHMODALVAL = 'main/SETSEARCHMODALVAL' as const;
const SETNEWWRITECHECK = 'main/SETNEWWRITECHECK' as const;
const SETMEMOLISTTEMP = 'main/SETMEMOLISTTEMP' as const;

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
export const setNewWrightCheck = (getPayload:boolean) => ({
    type: SETNEWWRITECHECK,
    payload: getPayload 
})
export const setMemoListTemp = (getPayload: any) => ({
    type: SETMEMOLISTTEMP,
    payload: getPayload 
})

//type 지정
type MainState = {
    memoList: any,  
    modal: boolean,
    memo: any,
    searchModal: boolean,
    newWrightCheck: boolean,
    memoListTemp: any,
}
type MainAction = 
    | ReturnType<typeof setMemoList>
    | ReturnType<typeof setModalVal>
    | ReturnType<typeof setMemo>
    | ReturnType<typeof setSearchModalVal>
    | ReturnType<typeof setNewWrightCheck>
    | ReturnType<typeof setMemoListTemp>;

//Reducer
const initialState: MainState = {
    memoList: '',
    memo: '',
    modal: false,
    searchModal: false,
    newWrightCheck: false,
    memoListTemp: [],
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
        case SETNEWWRITECHECK :
            return {...state, newWrightCheck: action.payload}
        case SETMEMOLISTTEMP : 
            return {...state, memoListTemp : action.payload}  

        default:
            return state;
    }
}