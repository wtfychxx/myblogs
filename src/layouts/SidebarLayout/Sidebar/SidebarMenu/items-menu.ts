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
              name: 'Kategori',
              link: '/management/masterdata/category'
            },
            {
              name: 'Merk',
              link: '/management/masterdata/brand'
            },
            {
              name: 'Bank',
              link: '/management/masterdata/bank'
            },
            {
              name: 'Warna',
              link: '/management/masterdata/color'
            },
            {
              name: 'Area',
              link: '/management/masterdata/area',
              items: [
                {
                  name: 'Provinsi',
                  link: '/management/masterdata/area/province'
                },
                {
                  name: 'Kota',
                  link: '/management/masterdata/area/city'
                }
              ]
            },
            {
              name: 'Produk',
              link: '/management/masterdata/product',
              items: [
                {
                  name: 'Master Product',
                  link: '/management/masterdata/product/masterProduct'
                },
                {
                  name: 'Warna',
                  link: '/management/masterdata/product/color'
                },
                {
                  name: 'Tenor',
                  link: '/management/masterdata/product/tenor'
                },
                {
                  name: 'Tipe',
                  link: '/management/masterdata/product/type'
                },
                {
                  name: 'Spesifikasi',
                  link: '/management/masterdata/product/spesification'
                },
                {
                  name: 'Promo',
                  link: '/management/masterdata/product/promo'
                },
                {
                  name: 'Problem',
                  link: '/management/masterdata/product/problem'
                }
              ]
            },
            {
              name: 'Artikel',
              link: '/management/masterdata/article'
            },
            {
              name: 'Diskusi',
              link: '/management/masterdata/discussion'
            },
            {
              name: 'Review',
              link: '/management/masterdata/review'
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
    heading: 'Transaction',
    items: [
      {
        name: 'Purchase',
        icon: ShoppingCartIcon,
        link: '/components/buttons'
      }
    ]
  }
];

export default menuItems;
