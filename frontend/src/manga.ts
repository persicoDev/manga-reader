export interface MangaInfos {
    id?: number;
    title: string;
    preview: string;
    routeName: string;
    trama: string;
    alt_title: string;
    genres: string[];
    author: string;
    artist: string;
    status: string;
    year: string;
    chapter_cont: number;
}

export interface MangaLinks {
    id?: number;
    link: string[];
}