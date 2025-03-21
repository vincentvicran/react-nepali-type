// exceptions.ts
export class NoMapForOriginException extends Error {
    constructor() {
        super("No mapping found for the given origin font.")
        this.name = "NoMapForOriginException"
    }
}

export class MapFileNotFoundException extends Error {
    constructor(message: string) {
        super(`Map file not found: ${message}`)
        this.name = "MapFileNotFoundException"
    }
}
