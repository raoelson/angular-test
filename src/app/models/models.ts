export class ModelData {
    public static fromJson(json: Object): ModelData {
        return new ModelData(
            json['position'],
            json['symbol'],
            json['name'],
            (json['weight'])
        );
    }

    constructor(public position: string,
                public name: string,
                public weight: string,
                public symbol: Date) {
    }
}