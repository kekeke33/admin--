import { Table, Modal, Space, Button, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddUser from "./adduser";
import { findUserList, deluser, editusercase } from "../../api";
import { memoryUtils } from "../../utils/memoryUtils";
import Edituser from "./edituser";
const { confirm } = Modal;
export default function User() {
  const [userList, setUserList] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [record, setrecord] = useState();
  const columns = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "注册时间",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "所属角色",
      key: "usercla",
      dataIndex: "usercla",
    },
    {
      title: "操作",
      key: "active",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => upuserData(record)} type="primary">
            修改
          </Button>
          <Button
            onClick={() => deldata(record.key, record.name)}
            type="primary"
            danger
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const upuserData = (record) => {
    console.log(record);
    setisModalVisible(true);
    setrecord(record);
  };
  const deldata = (id, name) => {
    const username = memoryUtils.user.username;
    // console.log(username);
    // console.log(id);
    if (name !== username) {
      confirm({
        title: "确认删除?",
        icon: <ExclamationCircleOutlined />,
        content: "数据将被删除",
        okText: "确定!",
        okType: "danger",
        cancelText: "不要!",
        onOk() {
          async function a() {
            const result = await deluser(id);
            // console.log(result);
            if (result) {
              message.success(result.msg);
              getuserlist();
            }
          }
          a();
        },
        onCancel() {
          // console.log("Cancel");
        },
      });
    } else {
      message.warn(name + "用户已登录不可删除");
    }
  };
  //   const data = [
  //     {
  //       key: "1",
  //       name: "John ",
  //       email: 32,
  //       phone: "123123123123",
  //       time: "123",
  //       user: "1",
  //     },
  //   ];
  const data = [];
  userList.forEach((item) => {
    data.push({
      key: item._id,
      name: item.username,
      phone: item.phone,
      email: item.email,
      time: item.time,
      usercla: item.usercla,
    });
  });
  //   useEffect(() => {
  //     let arr = {};
  //     userList.map((item) => {
  //       //   console.log(item);
  //       (arr.key = item._id),
  //         (arr.name = item.username),
  //         (arr.phone = item.phone),
  //         (arr.email = item.email),
  //         (arr.time = item.time);
  //     });
  //     data.push(arr);
  //   }, [userList]);
  useEffect(() => {
    getuserlist();
  }, []);
  // console.log(userList);
  const getuserlist = async () => {
    const result = await findUserList();
    // console.log(result);
    setUserList(result.data);
  };
  const updatalist = () => {
    getuserlist();
  };
  const handleCancel = () => {
    setisModalVisible(false);
  };
  const onFinish = async (values) => {
    // console.log(11111, record.key);
    console.log(values);
    const result = await editusercase({
      _id: record.key,
      username: values.name,
      email: values.email,
      phone: values.phone,
      usercla: values.usercla,
    });
    if (result.status === 0) {
      setisModalVisible(false);
      message.success(result.msg);
      getuserlist();
    } else {
      message.warn(result.msg);
    }
  };
  return (
    <>
      <div>
        <AddUser updatalist={updatalist} />
      </div>
      <Table
        bordered
        pagination={{ defaultPageSize: 3 }}
        columns={columns}
        dataSource={data}
      />
      <Edituser
        record={record}
        handleCancel={handleCancel}
        showModal={isModalVisible}
        onFinish={onFinish}
      />
    </>
  );
}
