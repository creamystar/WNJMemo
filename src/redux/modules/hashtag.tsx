//Action
const SETSEARCHMODE = 'htag/SETSEARCHMODE' as const;
const SETTAGVAL = 'htag/SETTAGVAL' as const;

//ActionCreator
export const setSearchMode = (getPayload:any) => ({
    type: SETSEARCHMODE,
    payload: getPayload
})
export const setTagVal = (getPayload:any) => ({
    type: SETTAGVAL,
    payload: getPayload
})

//type 지정
type TagState = {
    modeVal: boolean, 
    tagVal: any,
}
type TagAction = 
    | ReturnType<typeof setSearchMode>
    | ReturnType<typeof setTagVal>

//Reducer
const initialState: TagState = {
    modeVal: false,
    tagVal: '',
}
export default function hashtag (state = initialState, action: any) {
    switch (action.type) {
        case SETSEARCHMODE :
            return {...state, modeVal : action.payload}
        case SETTAGVAL :
            return {...state, tagVal : action.payload}
        default:
            return state;
    }
}