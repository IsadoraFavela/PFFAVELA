import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Usuario, CrearUsuarioPayload } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuario$ = new BehaviorSubject<Usuario[]>([]);

  constructor(private httpClient: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
      .subscribe({
        next: (usuarios) => {
          this.usuario$.next(usuarios);
        },
      });
    return this.usuario$.asObservable();
  }

  getUsuarioById(usuarioId: number): Observable<Usuario | undefined> {
    return this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios?id=${usuarioId}`)
      .pipe(
        map((usuarios) => {
          return usuarios[0];
        })
      );
  }

  crearUsuario(payload: CrearUsuarioPayload): Observable<Usuario[]> {
    let numeroDeUsuarios: number = 0;

    this.obtenerUsuarios().subscribe((usuarios) => {
      numeroDeUsuarios = usuarios.length;
    });

    this.httpClient
      .post<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`, {
        id: numeroDeUsuarios + 1,
        ...payload,
        token: 'woebfowebgowueb',
      })
      .subscribe({
        next: (usuarios) => {
          this.usuario$.next(usuarios);
        },
      });
    return this.usuario$.asObservable();
  }

  editarUsuario(
    usuarioId: number,
    actualizacion: Partial<Usuario>
  ): Observable<Usuario[]> {
    this.usuario$.pipe(take(1)).subscribe({
      next: (usuario) => {
        const usuariosActualizados = usuario.map((usuario) => {
          if (usuario.id === usuarioId) {
            return {
              ...usuario,
              ...actualizacion,
            };
          } else {
            return usuario;
          }
        });

        this.usuario$.next(usuariosActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.usuario$.asObservable();
  }

  eliminarUsuario(usuarioId: number): Observable<Usuario[]> {
    let usuariosActuales: Usuario[] = [];

    this.obtenerUsuarios().subscribe((usuarios) => {
      usuariosActuales = usuarios;
    });

    this.httpClient
      .delete<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios/${usuarioId}`)
      .subscribe({
        next: (_) => {
          const usuariosActualizados = usuariosActuales.filter(
            (usuario) => usuario.id !== usuarioId
          );
          this.usuario$.next(usuariosActualizados);
        },
      });

    return this.usuario$.asObservable();
  }
}
