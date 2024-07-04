import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "../../services/usuario.service";
import * as actions from "../actions";

@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(actions.cargarUsuarios),
      mergeMap(
        () => this.usuariosService.getUsers()
          .pipe(
            map(users => actions.cargarUsuariosSuccess({ usuarios: users })),
            catchError(err => of(actions.cargarUsuariosError({ payload: err })))
          )
      )
    )
  );
}
