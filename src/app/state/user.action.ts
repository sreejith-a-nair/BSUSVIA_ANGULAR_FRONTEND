import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';         
import { Authority } from '../core/interface/authoriy.model';
// user - list
export const loadUser = createAction('[user page]load user');


export const loadUsersSuccess = createAction('[user page]load user success',props<{list:User[]}>());

export const loadUserFail = createAction('[user page]load user failure',props<{errormessage:string}>());

// bus - list
export const loadBus = createAction('[user page]load user');

// Athority load
export const loadAuthority= createAction ('[authority page]load authority', props<{ role: string }>());

export const loadAuthoritySuccess = createAction('[authority page]load authority success',props<{list:Authority[]}>());

export const loadAuthorityFail = createAction('[authority page]load authority failure',props<{errormessage:string}>());
