import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: '1' },
  { title: 'Hip-Hop', value: '2' },
  { title: 'Dance', value: '3' },
  { title: 'Electronic', value: '4' },
  { title: 'Soul', value: '5' },
  { title: 'Alternative', value: '6' },
  { title: 'Rock', value: '7' },
  { title: 'Latin', value: '8' },
  { title: 'Film', value: '9' },
  { title: 'Country', value: '10' },
  { title: 'Worldwide', value: '12' },
  { title: 'Reggae', value: '13' },
  { title: 'House', value: '14' },
  { title: 'K-Pop', value: '15' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];
