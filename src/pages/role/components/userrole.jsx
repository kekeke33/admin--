import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Tree } from "antd";
import menulist from "../../../config/menuConfig";
const UserRoles = (props) => {
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState(["/"]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, settreeData] = useState([]);

  useEffect(() => {
    // console.log(props.record);
    if (props.record) {
      form.setFieldsValue(props.record[0]);
      console.log(props.record);
      //设置默认选中的树🌲选框
      setCheckedKeys(props.record[0].menus);
    }
  }, [props.record, form]);
  // 获取表单数据
  const onOk = async () => {
    const result = await form.submit();
    // setTimeout(() => {
    // console.log(result); //undefined
    if (!result) {
      form.resetFields();
    }
    // }, 10);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    function getmenuList(menulist) {
      return menulist.reduce((pre, item) => {
        pre.push({
          title: item.title,
          key: item.key,
          children: item.children ? getmenuList(item.children) : null,
        });
        return pre;
      }, []);
    }
    settreeData(getmenuList(menulist));
  }, []);
  //-----数据
  const treeData1 = [
    {
      title: "平台权限",
      key: "/",
      children: treeData,
    },
  ];
  const onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    // console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
    props.callbackdata(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeys);
  };
  return (
    <Modal
      title="修改"
      callbackdata={props.checkedKeys}
      visible={props.modalVisible}
      onCancel={props.handleCancel}
      onOk={onOk}
      forceRender
    >
      <Form
        form={form}
        onFinish={props.onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="name" name="name">
          <Input disabled defaultValue={form.name} />
        </Form.Item>
        {treeData.length > 1 ? (
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData1}
          />
        ) : (
          "loading tree"
        )}
      </Form>
    </Modal>
  );
};

export default UserRoles;
