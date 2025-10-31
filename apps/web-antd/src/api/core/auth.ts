import { baseRequestClient, requestClient } from '#/api/request';
import type { UserInfo } from '@vben/types';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // 开发环境mock登录
  if (import.meta.env.DEV) {
    if (data.username === 'vben' && data.password === '123456') {
      return Promise.resolve({
        accessToken: 'mock-access-token-12345',
        refreshToken: 'mock-refresh-token-67890',
      });
    } else {
      throw new Error('用户名或密码错误');
    }
  }

  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  // 开发环境mock权限码
  if (import.meta.env.DEV) {
    return Promise.resolve(['admin', 'common', 'dashboard']);
  }

  return requestClient.get<string[]>('/auth/codes');
}
