import { Card, Table } from 'antd'
import ComplexSelect from './complexselect/index';
import 'antd/dist/antd.css'

function App() {
  const title = [
    {
      title: '省份',
      fieldProps: {
        placeholder: '请选择',
        // value: 1,
        // style: {
        //   width: 200,
        // },
      },
    },
    {
      title: '市',
      fieldProps: {
        placeholder: '请选择',
      },
    },
    {
      title: '区/县',
      fieldProps: {
        placeholder: '请选择',
      },
    },
  ];

  const optionContent = [
    {
      value: 0,
      label: "浙江省",
      children: [
        {
          value: 0,
          label: '杭州市',
          children: [
            {
              value: 0,
              label: '西湖区',
            },
            {
              value: 1,
              label: '拱墅区',
            },
          ]
        },
        {
          value: 1,
          label: '宁波市',
          children: [
            {
              value: 0,
              label: '象山县',
            },
            {
              value: 1,
              label: '宁海县',
            },
          ],
        },
      ],
    },
    {
      value: 1,
      label: "四川省",
      children: [
        {
          value: 0,
          label: '成都市',
          children: [
            {
              value: 0,
              label: '高新区',
            },
            {
              value: 1,
              label: '郫都区',
            },
          ]
        },
        {
          value: 1,
          label: '达州市',
          children: [
            {
              value: 0,
              label: '大竹县',
            },
            {
              value: 1,
              label: '通川区',
            },
          ],
        },
      ],
    },
  ]

  const layout = 'horizontal';
  const value = [1];
  const labelCol = { span: 4 };
  const wrapperCol = { span: 6 };

  const onChange = (v: Array<number | string>) => {
    console.log('===ComplexSelect onChange ===');
    console.log(v)
  }

  // API
  const columns = [
    {
      title: '参数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'items',
      description: '每个select框前面标题、选择框默认文本、样式',
      type: `{title: string; fieldProps?: SelectProps<any>;}[][SelectProps 详情]`,
      default: '[]',
    },
    {
      key: '2',
      name: 'options',
      description: 'select框选项内容名称、参数',
      type: 'interface ComplexSelectOptions{value: string | number;label: string;children?:ComplexSelectOptions[];}',
      default: '[]',
    },
    {
      key: '3',
      name: 'layout',
      description: '下拉框布局',
      type: 'horizontal | vertical | inline',
      default: 'horizontal',
    },
    {
      key: '4',
      name: 'labelCol',
      description: 'label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}',
      type: 'object',
      default: '-',
    },
    {
      key: '5',
      name: 'wrapperCol',
      description: '需要为输入控件设置布局样式时，使用该属性，用法同 labelCol',
      type: 'object',
      default: '-',
    },
    {
      key: '6',
      name: 'value',
      description: '指定默认选择条目',
      type: 'Array<number | string>',
      default: '-',
    },
    {
      key: '7',
      name: 'onChange',
      description: '选中option变化时，调用此函数',
      type: 'function(value: Array<number | string>)',
      default: '-',
    },
  ];

  return (
    <div style={{ margin: 40 }}>
      <Card title='ComplexSelect: Demo'>
        <ComplexSelect
          items={title}
          layout={layout}
          value={value}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          options={optionContent}
          onChange={onChange}
        />
      </Card>
      <div style={{ margin: '40px 40px' }}></div>
      <Card title='API'>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </Card>
    </div>
  );
}

export default App;
