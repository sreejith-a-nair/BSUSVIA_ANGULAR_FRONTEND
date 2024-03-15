import { createReducer, on } from "@ngrx/store";
import { loadAuthorityFail, loadAuthoritySuccess } from "./user.action";
import { AuthorityState } from "./authority.state";

const _AuthorityReducer = createReducer(AuthorityState,
   
    on(loadAuthoritySuccess, (state, action) => ({
        ...state,
        list: [...action.list],
        errorMessage: ''
    })),
    on(loadAuthorityFail, (state, action) => ({
        ...state,
        list: [],
        errorMessage: action.errormessage
    })),
    
);

export function AuthorityReducer(state:any, action: any){

    return _AuthorityReducer(state,action);
}