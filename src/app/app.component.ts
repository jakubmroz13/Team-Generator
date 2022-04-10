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
  players: Player[] = [];
  numberOfTeams: number | '' = '';
  teams: Player[][] = [];
  playerErrorMessage: string = '';
  teamsErrorMessage: string = '';
  powerRating = 4;

  setShowPlayers(value: boolean) {
    this.showPlayers = value;
    this.showPlayersBtn = value ? 'underline' : '';
    this.showTeamsBtn = !value ? 'underline' : '';
  }

  onNewPlayerNameInput(newPlayerNameInput: string) {
    this.newPlayerName = newPlayerNameInput;
  }

  onPowerRatingInput(powerRatingInput: string) {
    this.powerRating = Number(powerRatingInput);
  }

  addPlayer() {
    if (!this.newPlayerName) {
      this.playerErrorMessage = "Can't add player without a name";
      return;
    }
    this.playerErrorMessage = '';
    const newPlayer: Player = {
      name: this.newPlayerName,
      power: this.powerRating,
    };
    this.players.push(newPlayer);
    this.newPlayerName = '';
  }

  onNumberOfTeamsInput(numberOfTeamsInput: string) {
    this.numberOfTeams = Number(numberOfTeamsInput);
  }

  generateTeams() {
    this.teams = [];
    if (this.numberOfTeams <= 0 || this.numberOfTeams === '') {
      this.teamsErrorMessage = "Number of teams must be a positive number";
      return;
    }
    if (this.numberOfTeams > this.players.length) {
      this.teamsErrorMessage = "Too few players";
      return;
    }
    this.teamsErrorMessage = '';

    const playerArr: string[][] = [[], [], [], [], []];

    this.players.map(({ name, power }) => {
      playerArr[power].push(name);
    });
    let addToJ = 1;
    let j = 0;
    for (let i = 4; i >= 0; i--) {
      while (playerArr[i].length) {
        const random = Math.floor(Math.random() * playerArr[i].length);
        const player = {
          name: playerArr[i].splice(random, 1)[0],
          power: i,
        };
        if (this.teams[j]) {
          this.teams[j].push(player);
        } else {
          this.teams[j] = [player];
        }

        j += addToJ;

        if(j === this.numberOfTeams) {
          j = this.numberOfTeams - 1;
          addToJ = -1;
        } else if(j === -1) {
          j = 0;
          addToJ = 1;
        }
      }
    }
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }
}

interface Player {
  name: string;
  power: number;
}