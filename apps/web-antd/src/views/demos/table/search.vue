<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { Button, Card, message } from 'ant-design-vue';

import { $t } from '#/locales';

const [TableForm, tableFormApi] = useVbenForm({
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '电子产品', value: 'electronics' },
          { label: '服装', value: 'clothing' },
          { label: '食品', value: 'food' },
        ],
        placeholder: '请选择分类',
      },
      fieldName: 'category',
      label: '分类',
    },
    {
      component: 'RangePicker',
      fieldName: 'dateRange',
      label: '日期范围',
    },
  ],
  showCollapseButton: true,
  submitOnChange: true,
});

const tableData = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'electronics',
    price: 999,
    date: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: '运动T恤',
    category: 'clothing',
    price: 89,
    date: '2024-01-16',
    status: 'active',
  },
  {
    id: 3,
    name: '有机苹果',
    category: 'food',
    price: 12,
    date: '2024-01-17',
    status: 'inactive',
  },
]);

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
];

function handleSearch(values: Record<string, any>) {
  message.success(`搜索条件: ${JSON.stringify(values)}`);
  // 这里可以调用API进行搜索
}

function handleReset() {
  tableFormApi.resetForm();
  message.info('已重置搜索条件');
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="表格搜索示例，展示表单与表格的配合使用"
    title="表格搜索"
  >
    <Card title="搜索条件">
      <TableForm>
        <template #submitBefore>
          <Button type="primary" @click="tableFormApi.submitForm()">
            搜索
          </Button>
        </template>
        <template #submitAfter>
          <Button @click="handleReset">重置</Button>
        </template>
      </TableForm>
    </Card>

    <Card title="数据表格">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="{ pageSize: 10 }"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <Button type="link" size="small">编辑</Button>
            <Button type="link" size="small" danger>删除</Button>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </Card>
  </Page>
</template>