import { parse, parseUrl, ParsedQuery, stringify } from "query-string";

export class Url {
    public static current(): Url {
        return new Url(location.href);
    }

    public url: string;
    public queries: ParsedQuery;
    public hashs: ParsedQuery;

    constructor(url?: string) {
        if (!url) {
            this.url = parseUrl(url).url;
            this.queries = parse(location.search);
            this.hashs = parse(location.hash);
        }
    }

    public redirect(queriesOrUrl: object | string) {
        if (typeof queriesOrUrl === "string") {
            location.href = queriesOrUrl;
        } else {
            location.search = stringify(queriesOrUrl);
        }
    }
}
