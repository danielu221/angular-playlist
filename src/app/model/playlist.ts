export interface Playlist {
    id:number,
    name:string,
    favourite:boolean,
    color: string,
    tracks?: Array<Track>
}

export interface Track{
    id:number,
    name:string
}
