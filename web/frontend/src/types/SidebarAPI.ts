export interface SidebarTextBox {
  heading: string;
  btnName?: string;
  link?: string;
  description: string;
}

export interface SidebarBanner {
  imgSrc: string;
  link: string;
}

export interface Sidebar {
  type: 'textBox' | 'banner';
  item: SidebarTextBox | SidebarBanner;
}
