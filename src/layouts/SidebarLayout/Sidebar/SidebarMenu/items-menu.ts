import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';
import BeachAccessTwoToneIcon from '@material-ui/icons/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@material-ui/icons/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@material-ui/icons/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@material-ui/icons/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@material-ui/icons/RedeemTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import TrafficTwoToneIcon from '@material-ui/icons/TrafficTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Management',
    items: [
      {
        name: 'Master Data',
        icon: TableChartTwoToneIcon,
        link: '/management/transactions',
        items: [
            {
                name: 'Kategori',
                link: '/management/masterdata/category'
            }
        ]
      },
      {
        name: 'User',
        icon: AccountCircleTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
          {
            name: 'User Settings',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  },
  {
    heading: 'Components',
    items: [
      {
        name: 'Buttons',
        icon: BallotTwoToneIcon,
        link: '/components/buttons'
      },
      {
        name: 'Modals',
        icon: BeachAccessTwoToneIcon,
        link: '/components/modals'
      },
      {
        name: 'Accordions',
        icon: EmojiEventsTwoToneIcon,
        link: '/components/accordions'
      },
      {
        name: 'Tabs',
        icon: FilterVintageTwoToneIcon,
        link: '/components/tabs'
      },
      {
        name: 'Badges',
        icon: HowToVoteTwoToneIcon,
        link: '/components/badges'
      },
      {
        name: 'Tooltips',
        icon: LocalPharmacyTwoToneIcon,
        link: '/components/tooltips'
      },
      {
        name: 'Avatars',
        icon: RedeemTwoToneIcon,
        link: '/components/avatars'
      },
      {
        name: 'Cards',
        icon: SettingsTwoToneIcon,
        link: '/components/cards'
      },
      {
        name: 'Forms',
        icon: TrafficTwoToneIcon,
        link: '/components/forms'
      },
    ]
  }
];

export default menuItems;
