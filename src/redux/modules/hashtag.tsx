//Action
const SETTAGLIST = 'htag/SETTAGLIST' as const;

//ActionCreator
export const setTagList = (getPayload:any) => ({
    type: SETTAGLIST,
    payload: getPayload
})

//type 지정
type MainState = {
    tagList: any,  
}
type MainAction = 
    | ReturnType<typeof setTagList>

//Reducer
const initialState: MainState = {
    tagList: '',
}
export default function hashtag (state = initialState, action: any) {
    switch (action.type) {
        case SETTAGLIST :
            return {...state, tagList : action.payload}
        default:
            return state;
    }
}