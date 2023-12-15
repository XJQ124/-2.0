import React, { useState } from 'react';
import { Button, Table, Input, Dropdown, Modal, Form, Select } from 'antd';
import {MoreOutlined} from '@ant-design/icons';
import _ from 'lodash';

const App = () => {
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data,setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [preData,setPreData] = useState([]);

  const onSearch = (value, _e) => {
    const newData = _.filter(preData,(i)=>{ 
      return i.name.includes(value) || i.email.includes(value) || i.phone.includes(value)
    })
    setData(newData)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      if(isEditing){
        const newData = data.map((item)=>{
          if(item.key===values.key){
            return values
          }
          return item 
        })
        setData(newData);
        setPreData(newData);
      }else{
        setData([...data, { ...values, key: Date.now() }]);
        setPreData([...data, { ...values, key: Date.now() }]);
      }
      form.resetFields(); 
      setIsModalOpen(false);
    });
  };

  const handleCancel = () =>{
    setIsModalOpen(false)
  };
  console.log(data);
  
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleEdit = (key) => {
    setIsEditing(true);
    form.setFieldsValue(key);
    setIsModalOpen(true);
  };
  
  return(
    <div style={{margin:'20px'}}>
      <h3 style={{ fontSize: '20px', margin: '10px' }}>用户管理</h3>
      <div>
        <Button type="primary" onClick={showModal}>+ 新增用户</Button>
      </div>
      <hr style={{ marginTop: '30px' }} />
      <Search
        placeholder="请输入姓名、邮箱、手机号码..."
        onSearch={onSearch}
        style={{
          fontSize: '20px', 
          margin: '10px',
          width: 200,
        }}
      />
      <Table
        style={{ fontSize: '20px', margin: '10px'}}
        columns={[
          {
            title: '序号',
            width: 60,
            dataIndex: 'number',
            key: 'number',
            fixed: 'left',
            render: (_, __, index) => index + 1,
          },
          {
            title: '姓名',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 150,
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
          },
          {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
            width: 150,
          },
          {
            title: '工号',
            dataIndex: 'work',
            key: 'work',
            width: 150,
          },
          {
            title: '职务',
            dataIndex: 'job',
            key: 'job',
            width: 150,
          },
          {
            title: '登录次数',
            dataIndex: 'login',
            key: 'login',
            width: 150,
          },
          {
            title: '最近登录时间',
            dataIndex: 'times',
            key: 'times',
            width: 150,
          },
          {
            title: '允许登录',
            dataIndex: 'allow',
            key: 'allow',
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_,record) => (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'edit',
                      label: '编辑'

                    },
                    {
                      key: 'delet',
                      label: '删除'

                    }
                  ],
                  onClick: ({ key }) => {
                    if (key === 'delet') {
                      handleDelete(record.key)
                    }else if(key === 'edit'){
                      handleEdit(record)
                    }
                  }
                }}
                placement="bottom"
                arrow
              >
                <MoreOutlined />
              </Dropdown>
            ),
          },
]}
        dataSource={data}
        bordered
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
      <Modal title={isEditing ? '编辑用户' : '新增用户'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form labelCol={{
          span: 4,
        }}
          wrapperCol={{
            span: 20,
          }}
          form={form}
          >
          <Form.Item label='key' name='key' style={{display:'none'}} >

            </Form.Item>
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入用户姓名' }]} >
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱地址' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="手机号码" name="phone" rules={[{ message: '请输入手机号码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="工号" name="work" rules={[{ message: '请输入公号' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="部门" name="department" rules={[{ message: '请输入所在部门' }]}>
          <Input />
          </Form.Item>
          <Form.Item label="职务" name="job" rules={[{ message: '请输入你所担任的职务' }]}>
            <Input />
        </Form.Item>
        <Form.Item label="登录" name="allow">
          <Select>
            <Select.Option value="允许">允许</Select.Option>
            <Select.Option value="不允许">不允许</Select.Option>
          </Select>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};
export default App;