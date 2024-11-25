import { Routes } from '@angular/router';

// export const routes: Routes = [];
export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m=> m.AuthModule)
    },
    {
        path: 'public',
        loadChildren: () => import('./modules/public-game/public-game.module').then(m=> m.PublicGameModule)
    },
    {
        path: '',
        redirectTo: 'public/control-game',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'public/control-game'
      }
];