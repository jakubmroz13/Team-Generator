import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPlayersBtn = 'underline';
  showTeamsBtn = '';
  showPlayers = true;
  newPlayerName = '';
  players: string[] = [];
  numberOfTeams: number | '' = '';
  teams: string[][] = [];
  playerErrorMessage: string = '';
  teamsErrorMessage: string = '';

  setShowPlayers(value: boolean) {
    this.showPlayers = value;
    this.showPlayersBtn = value ? 'underline' : '';
    this.showTeamsBtn = !value ? 'underline' : '';
  }

  onNewPlayerNameInput(newPlayerNameInput: string) {
    this.newPlayerName = newPlayerNameInput;
  }

  addPlayer() {
    if (!this.newPlayerName) {
      this.playerErrorMessage = "Can't add player without a name";
      return;
    }
    this.playerErrorMessage = '';
    this.players.push(this.newPlayerName);
    this.newPlayerName = '';
  }

  onNumberOfTeamsInput(numberOfTeamsInput: string) {
    this.numberOfTeams = Number(numberOfTeamsInput);
  }

  generateTeams() {
    this.teams = [];
    if(this.numberOfTeams <= 0 || this.numberOfTeams === '') {
      this.teamsErrorMessage = "Number of teams must be positive";
      return;
    }
    if(this.numberOfTeams > this.players.length) {
      this.teamsErrorMessage = "To few players";
      return;
    }
    this.teamsErrorMessage = '';
    const playerArr = [...this.players];
    while (playerArr.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        if (!playerArr.length) break;
        const random = Math.floor(Math.random() * playerArr.length);
        if (this.teams[i]) {
          this.teams[i].push(playerArr.splice(random, 1)[0]);
        } else {
          this.teams[i] = [playerArr.splice(random, 1)[0]];
        }
      }
    }
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }
}
