import { Modal, Input, Button, Select, message } from "antd";
import React, { useEffect } from "react";
import { reqRes, lookroles } from "../../api";
import { ListWrap } from "./styledadduserlist";
const AddUser = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  //   const [modalText, setModalText] = React.useState("Content of the modal");
  const [username, setusername] = React.useState("");
  const [email, setemail] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [usercla, setusercla] = React.useState("");
  const [userclass, setuserclass] = React.useState([]);
  const { Option } = Select;
  const showModal = () => {
    setVisible(true);
  };
  useEffect(() => {
    async function getuserclass() {
      const result = await lookroles({ pageNum: "all", pageSize: "all" });
      // console.log(result);
      setuserclass(result.data);
    }
    getuserclass();
  }, []);
  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    if (!usercla) {
      message.warn("请选择角色,如没有请先添加角色");
      return;
    }
    setConfirmLoading(true);
    console.log(username, email, phone, password, usercla);
    reqRes(username, email, phone, password, usercla).then((res) => {
      console.log(res);
      setVisible(false);
      setConfirmLoading(false);
      props.updatalist();
    });

    // setTimeout(() => {
    // }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handChang1 = (e) => {
    setusername(e.target.value);
  };
  const handChang2 = (e) => {
    setpassword(e.target.value);
  };
  const handChang3 = (e) => {
    setphone(e.target.value);
  };
  const handChang4 = (e) => {
    setemail(e.target.value);
  };
  const handChang5 = (e) => {
    console.log(e);
    setusercla(e);
  };
  return (
    <>
      <Button
        style={{
          lineHeight: "20px",
          fontWeight: "800",
          fontSize: "16px",
          margin: "20px",
          //   width: "100%",
        }}
        type="primary"
        onClick={showModal}
      >
        添加用户!
      </Button>
      <Modal
        title="添加用户"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <ListWrap>
          <div>
            <span>用户名:</span>
            <Input onChange={handChang1} placeholder="请输入用户名" />
          </div>
          <div>
            <span>密码:</span>
            <Input
              type="password"
              onChange={handChang2}
              placeholder="请输入密码"
            />
          </div>{" "}
          <div>
            <span>手机号:</span>
            <Input
              //   type="number"
              onChange={handChang3}
              placeholder="请输入手机号"
            />
          </div>{" "}
          <div>
            <span>邮箱:</span>
            <Input
              type="email"
              onChange={handChang4}
              placeholder="请输入邮箱"
            />
          </div>{" "}
          <div>
            <span>角色:</span>
            {/* <Input onChange={handChang5} placeholder="选择角色" /> */}
            <Select
              onChange={handChang5}
              placeholder="选择角色"
              // defaultValue="1"
            >
              {userclass.map((item) => {
                return (
                  <Option key={item._id} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </ListWrap>
      </Modal>
    </>
  );
};
export default AddUser;
