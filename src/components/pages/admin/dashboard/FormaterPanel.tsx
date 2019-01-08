import * as React from "react";
import { Paper, List, ListItem, ListItemText } from "@material-ui/core";

import { Formatter, RawHtml } from "app/ui";

export default function FormatterPanel() {
    return (
        <Paper>
            <List>
                <ListItem>
                    <ListItemText
                        primary={
                            <RawHtml content='<Formatter i18nKey="hi" value={{name: "Bendy"}} description="This is a welcome message." descriptionPlacement="top" />' />
                        }
                        secondary={
                            <Formatter
                                i18nKey="hi"
                                value={{ name: "Bendy" }}
                                description="This is a welcome message."
                                descriptionPlacement="top"
                            />
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <RawHtml content="<Formatter value={2390332} />" />
                        }
                        secondary={<Formatter value={2390332} />}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <RawHtml content='<Formatter value={1459832991883} formatAs="date" />' />
                        }
                        secondary={
                            <Formatter value={1459832991883} formatAs="date" />
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <RawHtml content='<Formatter value={1459832991883} formatAs="time" />' />
                        }
                        secondary={
                            <Formatter value={1459832991883} formatAs="time" />
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <RawHtml content='<Formatter value={1459832991883} formatAs="fromNow" />' />
                        }
                        secondary={
                            <Formatter
                                value={1459832991883}
                                formatAs="fromNow"
                            />
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    );
}
