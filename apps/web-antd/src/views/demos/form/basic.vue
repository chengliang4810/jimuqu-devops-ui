<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { Button, Card, message } from 'ant-design-vue';

import { $t } from '#/locales';

const [BasicForm, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'username',
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入密码',
      },
      fieldName: 'password',
      label: '密码',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '管理员', value: 'admin' },
          { label: '用户', value: 'user' },
          { label: '访客', value: 'guest' },
        ],
        placeholder: '请选择角色',
      },
      fieldName: 'role',
      label: '角色',
      rules: 'selectRequired',
    },
    {
      component: 'Switch',
      fieldName: 'enabled',
      label: '启用状态',
    },
  ],
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
});

function handleSubmit(values: Record<string, any>) {
  message.success(`表单提交成功: ${JSON.stringify(values)}`);
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="基础表单示例，展示如何使用VbenForm组件"
    title="基础表单"
  >
    <Card title="用户信息">
      <BasicForm @submit="handleSubmit" />
    </Card>
  </Page>
</template>