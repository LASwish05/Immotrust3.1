import { createCampaign, dashboard2, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard2',
    imgUrl: dashboard2,
    link: '/',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];