import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PlaylistsComponent } from './playlists/playlists/playlists.component';
import { MusicSearchComponent } from './music/music-search/music-search.component';

const routes:Routes =[
{
    path:'',
    redirectTo:'playlists',
    pathMatch: 'full'
},
{
    path:'playlists',
    component:PlaylistsComponent
},
{
    path:'playlists/:id',
    component:PlaylistsComponent
},
{
    path:'music',
    component:MusicSearchComponent
},
{
    path:'**',
    redirectTo:'music',
    pathMatch:'full'
}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
        enableTracing:true,
        useHash:true

    })
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
