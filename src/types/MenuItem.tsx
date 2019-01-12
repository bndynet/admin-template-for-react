export interface MenuItem {
    icon?: string | JSX.Element;
    text: string;
    link?: string;
    description?: string;
    children?: MenuItem[];
}
