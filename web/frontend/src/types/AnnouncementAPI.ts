export interface Announcement {
  type: 'warning' | 'danger' | 'info';
  heading: string;
  /** html */
  description: string;
}
