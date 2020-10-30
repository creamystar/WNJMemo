import { CHANGE_ITEMS, CHANGE_MEMO, CHANGE_MODAL} from './action-types';

export const changeItems = (getPayload: any) => ({ 
    type: "CHANGE_ITEMS",
    payload: getPayload
});

export const changeMemo = (getPayload: any) => ({
    type: "CHANGE_MEMO",
    payload: getPayload
})

export const changeModal = (getPayload: boolean) => ({
    type: "CHANGE_MODAL",
    payload: getPayload
})