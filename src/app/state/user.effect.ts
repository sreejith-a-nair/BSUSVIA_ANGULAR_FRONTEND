
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadAuthority, loadAuthorityFail, loadAuthoritySuccess, loadUser, loadUserFail, loadUsersSuccess } from "./user.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { JwtServiceService } from "../service/jwt-service.service";



    @Injectable()
    export class UserEffect{

        constructor(private action$: Actions, private service: JwtServiceService){}

        _loaduser=createEffect(()=>
        this.action$.pipe(
            ofType(loadUser),
            exhaustMap((action)=>{
                return this.service.getAllUsers().pipe(
                    map((data)=>{
                        return loadUsersSuccess({list:data})
                    }),
                    catchError((_error)=>of(loadUserFail({errormessage:_error.message})))
                )
            })
        ))
        
        _loadAuthority = createEffect(() =>
    this.action$.pipe(
        ofType(loadAuthority),
        exhaustMap((action) => {
            console.log('Action Role:', action.role); 
            return this.service.getAllAuthority(action.role).pipe(
                map((data) => loadAuthoritySuccess({ list: data })),
                
                catchError((_error) => of(loadAuthorityFail({ errormessage: _error.message })))
            );
        })
    )
);
    }
