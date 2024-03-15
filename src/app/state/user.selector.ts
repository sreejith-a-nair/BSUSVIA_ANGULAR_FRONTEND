
    import { createFeatureSelector, createSelector } from "@ngrx/store";
    import { UserModel } from "../user.model";
    import { AuthorityModel } from "../core/interface/authoriy.model";

    const getuserstate = createFeatureSelector<UserModel>('user');

    export const getuserlist = createSelector(getuserstate,(state)=>{
        return state.list;
    })
// bus selector
const getbusstate = createFeatureSelector<UserModel>('user');

export const getbuslist = createSelector(getuserstate,(state)=>{
    return state.list;
})
// // banner selector
const getbannerstate = createFeatureSelector<UserModel>('user');

export const getbannerlist = createSelector(getuserstate,(state)=>{
    return state.list;
})

const getauthoritystate = createFeatureSelector<AuthorityModel>('authority');

export const getauthoritylist = createSelector(getauthoritystate,(state)=>{
    return state.list;
})


