import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { pluscategory } from "../../../api";
const { Option } = Select;

const CollectionCreateForm = ({ dataSource, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      dataSource={dataSource}
      visible={visible}
      title="创建新分类"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="parentId" label="类别" rules={[]}>
          <Select
            placeholder="不选择默认一级菜单"
            // onChange={onGenderChange}
            allowClear
          >
            {dataSource.map((item) => {
              return (
                <Option key={item._id} value={item.name}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  return Promise.reject("名称不能为空");
                } else if (value.length > 8) {
                  return Promise.reject("名称不能超过8位");
                }
                //  else if (
                //   !/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(value)
                // ) {
                //   return Promise.reject("名称为中文!");
                // }
                else {
                  return Promise.resolve();
                }

                // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                // callback();
              },
            },
          ]}
          label="名称"
        >
          <Input autoComplete="off" type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
  const [visible, setVisible] = useState(false);
  const dataSource = props.dataSource;
  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    const result = await pluscategory(values.parentId, values.name);
    console.log(result);
    if (result.status === 0) {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
    props.update();
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加
      </Button>
      <CollectionCreateForm
        dataSource={dataSource}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;
