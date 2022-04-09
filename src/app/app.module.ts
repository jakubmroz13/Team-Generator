import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
