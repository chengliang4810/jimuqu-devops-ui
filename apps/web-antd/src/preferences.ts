import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  app: {
    enableCheckUpdates: false,
    name: import.meta.env.VITE_APP_TITLE || "积木区DevOps",
  },
  breadcrumb: {
    showHome: true,
  },
  shortcutKeys: {
    enable: false,
  },
  theme: {
    builtinType: 'custom',
    colorPrimary: 'hsl(25 95% 53%)',
    mode: 'light',
    radius: '0.75',
  },
  widget: {
    globalSearch: false,
    languageToggle: false,
    lockScreen: false,
    notification: false,
    themeToggle: false,
    timezone: false,
  },
});
