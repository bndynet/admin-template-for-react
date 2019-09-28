import * as React from 'react';
import { isClassic } from 'app/theme';
import { default as Header } from './Header';
import { default as Sidebar } from './Sidebar';

interface FrameProps {
    onSidebarToggle?: (open: boolean) => void;
}

interface FrameState {
    sidebarOpen: boolean;
}

class Frame extends React.Component<FrameProps, FrameState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            sidebarOpen: true,
        };
    }

    public render() {
        const hasHeader = isClassic();
        return (
            <div>
                {hasHeader && (
                    <Header
                        hideBrand={!this.state.sidebarOpen}
                        onToggleClick={this.handleSidebarToggle}
                    />
                )}
                <Sidebar
                    open={this.state.sidebarOpen}
                    onToggleClick={this.handleSidebarToggle}
                />
            </div>
        );
    }

    private handleSidebarToggle = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
        });
    };
}

export default Frame;
