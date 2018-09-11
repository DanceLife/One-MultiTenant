export class SearchResponse{
    public incomplete_results: boolean;
    public total_count: number;
    public items: [
        {name: string, path: string, git_url: string}
    ]

    constructor(incomplete_results: boolean, total_count: number, items){
        this.incomplete_results = incomplete_results;
        this.total_count = total_count;
        this.items = items;
    }
}