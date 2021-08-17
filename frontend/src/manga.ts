export interface Manga {
    id?: number;
    title: string;
    preview: string;
    bookmarked: boolean;
    routeName: string;
    link: string[][];
}