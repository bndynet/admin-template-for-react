import * as React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {
    Grid,
    Theme,
    createStyles,
    withStyles,
    TextField,
} from '@material-ui/core';

import { PageHeader } from 'app/ui';

const styles = (theme: Theme) =>
    createStyles({
        textarea: {
            width: '100%',
            marginRight: theme.spacing(),
            '& div': {
                height: 'calc(100vh - 150px)',
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(),
            },
        },
        textareaRoot: {},
        preview: {
            width: '100%',
            height: 'calc(100vh - 150px)',
            border: `1px solid ${theme.palette.divider}`,
            marginLeft: theme.spacing(),
            padding: theme.spacing(3),
            borderRadius: 4,
        },
    });

class Markdown extends React.Component<
    {
        classes: any;
    },
    { input: string }
> {
    public constructor(props) {
        super(props);
        this.state = {
            input: `# Hi, I am Markdown.
- one
- two
- ...

\`\`\`
Code block
\`\`\`
`,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    public render() {
        const { classes } = this.props;
        return (
            <div>
                <PageHeader title="Markdown Editor" />
                <Grid container={true}>
                    <Grid item={true} xs={6}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Markdown Content"
                            multiline={true}
                            value={this.state.input}
                            onChange={this.handleInputChange}
                            className={classes.textarea}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item={true} xs={6}>
                        <ReactMarkdown
                            className={classNames(
                                'markdown-body',
                                classes.preview,
                            )}
                            source={this.state.input}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

    private handleInputChange(e) {
        this.setState({ input: e.target.value });
    }
}

export default withStyles(styles)(Markdown);
