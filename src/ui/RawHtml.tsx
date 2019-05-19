import * as React from 'react';

export default class RawHtml extends React.Component<{
    content: string;
}> {
    public render() {
        return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }

    private createMarkup() {
        return {
            __html: this.props.content
                .replace('<', '&lt;')
                .replace('>', '&gt;'),
        };
    }
}
