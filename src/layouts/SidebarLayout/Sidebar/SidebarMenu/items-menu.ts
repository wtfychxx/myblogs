import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

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
              name: 'Post',
              link: '/management/post'
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
            link: '/profile/details'
          },
          {
            name: 'Change Password',
            link: '/profile/changepassword'
          },
        ]
      }
    ]
  }
];

export default menuItems;
