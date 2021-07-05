export class World {
    tick(): void {
        
    }

    isEmpty(): boolean{
        return true;
    }

    static empty(): World {
        return new World();
    }

}