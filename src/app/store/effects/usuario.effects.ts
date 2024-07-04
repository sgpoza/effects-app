import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "../../services/usuario.service";
import * as actions from "../actions";

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(actions.cargarUsuario),
      mergeMap(
        (action) => this.usuariosService.getUserById(action.id)
          .pipe(
            map(user => actions.cargarUsuarioSuccess({ usuario: user })),
            catchError(err => of(actions.cargarUsuarioError({ payload: err })))
          )
      )
    )
  );
}
