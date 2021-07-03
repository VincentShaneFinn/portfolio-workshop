import { Card } from "./card";

export class KanbanBoard{
    private _openList: Array<Card>;

    constructor() {
        this._openList = new Array<Card>();
    }

    public get openList(): Array<Card> {
        return this._openList;
    }

    addCard(card: Card) {
        this._openList.push(card);
    } 
}