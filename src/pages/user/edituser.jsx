import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { lookroles } from "../../api";

const Edituser = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [roles, setroles] = useState();
  //   const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    // console.log(props.record);
    if (props.record) {
      form.setFieldsValue(props.record);
      console.log(props.record);
      //设置默认选中的树🌲选框
      //   setCheckedKeys(props.record.usercla);
    }
  }, [props.record, form]);
  useEffect(() => {
    async function getroles() {
      const result = await lookroles({ pageNum: "all" });
      console.log(result);
      setroles(result.data);
    }
    getroles();
  }, []);
  const handleOk = async () => {
    // setIsModalVisible(false);
    const result = await form.submit();
    if (!result) {
      form.resetFields();
    }
  };

  return (
    <>
      <Modal
        title="修改用户"
        visible={props.showModal}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
        <Form form={form} onFinish={props.onFinish}>
          <Form.Item label="用户名" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="邮箱" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="电话" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="所属角色" name="usercla">
            <Select
              placeholder="Select a option and change input text above"
              //   onChange={onGenderChange}
              //   initialValues={checkedKeys}
              //   key={checkedKeys}
              allowClear
            >
              {roles
                ? roles.map((item) => {
                    return (
                      <Option key={item._id} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })
                : null}
              {/* <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option> */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Edituser;
