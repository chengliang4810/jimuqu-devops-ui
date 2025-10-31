import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          icon: 'lucide:file-text',
          title: '表单示例',
        },
        name: 'FormDemos',
        path: '/demos/form',
        children: [
          {
            name: 'FormBasicDemo',
            path: '/demos/form/basic',
            component: () => import('#/views/demos/form/basic.vue'),
            meta: {
              icon: 'lucide:file-text',
              title: '基础表单',
            },
          },
        ],
      },
      {
        meta: {
          icon: 'lucide:table',
          title: '表格示例',
        },
        name: 'TableDemos',
        path: '/demos/table',
        children: [
          {
            name: 'TableSearchDemo',
            path: '/demos/table/search',
            component: () => import('#/views/demos/table/search.vue'),
            meta: {
              icon: 'lucide:search',
              title: '搜索表格',
            },
          },
        ],
      },
    ],
  },
];

export default routes;