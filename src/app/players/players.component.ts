import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @Input() players: Player[] = [];
  @Output() deletePlayerEvent = new EventEmitter<number>();

  deletePlayer(index: number) {
    this.deletePlayerEvent.emit(index);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

interface Player {
  name: string;
  power: number;
}