import React from 'react';
import {IconUser, IconLock, IconTerm, IconLogout} from '../assets';

export const dummyMenu = [
  {
    id: 1,
    name: 'Edit Profile',
    image: <IconUser />,
    page: 'EditProfile',
  },
  // {
  //   id: 2,
  //   name: 'Change Password',
  //   image: <IconLock />,
  //   page: 'ChangePassword',
  // },
  {
    id: 2,
    name: 'Term & Condition',
    image: <IconTerm />,
    page: 'TermCondition',
  },
  {
    id: 3,
    name: 'Logout',
    image: <IconLogout />,
    page: 'Login',
  },
];
