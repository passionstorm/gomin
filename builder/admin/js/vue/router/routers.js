import AdminLayout from '@/components/layouts/DefaultLayout'
export default [
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: {title: 'Home', group: 'apps', 
        icon: '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
      },
        component: () => import('@/views/dashboard'),
      },
      {
        path: '/post',
        name: 'post',
        meta: {title: 'Bài viết', group: 'apps', 
        icon: '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
      },
        component: () => import('@/views/post/post'),
      },
    ],
  },
];


