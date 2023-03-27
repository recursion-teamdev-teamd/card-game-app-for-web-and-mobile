export class GameResult {
  private _win: string = "win";
  private _lose: string = "lose";

  public get win() {
    return this._win;
  }
  public get lose() {
    return this._lose;
  }
}
export class WarGameResult extends GameResult {
  private _draw: string = "draw";
  public get draw(): string {
    return this._draw;
  }
}
