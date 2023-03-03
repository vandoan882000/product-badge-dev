import { Announcement } from 'types/AnnouncementAPI';
import { IconBox } from 'types/IconBoxAPI';
import { Sidebar } from 'types/SidebarAPI';
import { ThirdPartyApp } from 'types/ThirdPartyAppAPI';
import { TopBanner } from 'types/TopBannerAPI';

export interface AppSettingsResponse {
  topBanner?: TopBanner;
  announcement?: Announcement;
  sidebar?: Sidebar[];
  thirdPartyApp?: ThirdPartyApp[];
  iconBox?: IconBox[];
}
