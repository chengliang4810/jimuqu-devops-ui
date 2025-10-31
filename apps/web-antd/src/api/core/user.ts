import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  // 开发环境mock用户信息
  if (import.meta.env.DEV) {
    return Promise.resolve({
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      realName: '积木区管理员',
      roles: ['admin'],
      userId: '1',
      username: 'vben',
      homePath: '/dashboard',
    });
  }

  return requestClient.get<UserInfo>('/user/info');
}
