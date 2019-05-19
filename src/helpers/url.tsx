import { parse, parseUrl, ParsedQuery, stringify } from 'query-string';

export class Url {
    public static current(): Url {
        return new Url(location.href);
    }

    public readonly url: string;
    public readonly rootUrl: string;
    public readonly queries: ParsedQuery;
    public readonly hashs: ParsedQuery;
    public readonly originUrl: string;

    public constructor(url?: string) {
        if (url) {
            this.originUrl = url;
            // eslint-disable-next-line no-useless-escape
            this.rootUrl = url.replace(/^(.*\/\/[^\/?#]*).*$/, '$1');
            this.url = parseUrl(url).url;
            this.queries = parse(location.search);
            this.hashs = parse(location.hash);
        }
    }

    public appendQueries(queries: object | string): string {
        if (typeof queries === 'string') {
            return `${this.originUrl}${
                this.originUrl.indexOf('?') < 0 ? '?' : ''
            }${queries}`;
        } else if (queries) {
            return `${this.originUrl}${
                this.originUrl.indexOf('?') < 0 ? '?' : ''
            }${stringify(queries)}`;
        } else {
            return this.originUrl;
        }
    }

    public merge(absolutePath: string, queries?: object | string): string {
        return new Url(`${this.rootUrl}${absolutePath}`).appendQueries(queries);
    }

    public redirect(queriesOrUrl: object | string) {
        if (typeof queriesOrUrl === 'string') {
            location.href = queriesOrUrl;
        } else {
            location.search = stringify(queriesOrUrl);
        }
    }
}
