import { ArrowDownOutlined, CheckOutlined, CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Col,
  Input,
  Row,
  Button,
  Space,
  Popconfirm,
  message,
  Table,
  Tag
} from "antd";
import type { ColumnsType } from 'antd/es/table';
import { useState } from "react";

const { TextArea } = Input;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

function AddOrder() {
  const [textValue, setTextValue] = useState("");

  const handleData = (val: any) => {
    console.log(val.target.value);
    let value = val.target.value;
    if (value) {
      value = value
        // \n、\r、\n\r
        .replaceAll(/(\n|\r|\n\r)/g, "")
        .replaceAll(/(:|：|,|，)/g, " ")
        .replaceAll(/(收货人|手机号码|所在地区|详细地址|地址)/g, " ");
    }
    setTextValue(value);
  };

  const add = () => {};
  const into = () => {};

  const confirm = () => {
    message.success("Click on Yes");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={add} type="primary" icon={<CopyOutlined />} />
          <Button onClick={add} ghost type="primary" icon={<EditOutlined />} />
          <Button onClick={add} danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div>
      <Row gutter={20}>
        <Col span={16}>
          <TextArea
            value={textValue}
            onChange={(val) => handleData(val)}
            autoSize={{ minRows: 3 }}
            placeholder="输入格式：张三 13929298888 上海市普陀区金沙江路1518弄 10斤 统装果 68元"
          ></TextArea>
        </Col>
        <Col span={8}>
          <Space>
            <Button onClick={add} type="primary" icon={<CheckOutlined />} />
            <Button
              onClick={into}
              ghost
              type="primary"
              icon={<ArrowDownOutlined />}
            />
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirm}
              okText="确认"
              cancelText="取消"
            >
              <Button danger>clearAll</Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>
      <div className="line"></div>
      <Table maxHeight={300} columns={columns} dataSource={data} />
    </div>
  );
}

export default AddOrder;
