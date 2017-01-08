 export class CityWheather {

    private _name:string;
    private _temperature:number;
    private _main:string;
    private _description:string;
    private _icon:string;

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get temperature():number {
        return this._temperature;
    }

    set temperature(value:number) {
        this._temperature = value;
    }

    get main():string {
        return this._main;
    }

    set main(value:string) {
        this._main = value;
    }

    get description():string {
        return this._description;
    }

    set description(value:string) {
        this._description = value;
    }

    get icon():string {
        return this._icon;
    }

    set icon(value:string) {
        this._icon = value;
    }
}
