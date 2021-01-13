import { message, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginWrap } from "./styledLogin";
// import axios from "axios";
import { reqLogin, lookuserRole } from "../../api";
import { useHistory } from "react-router-dom";
import { memoryUtils } from "../../utils/memoryUtils";
import { storageUtils } from "../../utils/storageUtils";
import { useEffect, useState } from "react";
export default function Login() {
  let hishtory = useHistory();
  const [flag, setflag] = useState(true);
  const [infocase, setinfocase] = useState("点击使用默认账户:admin 密码:admin");
  const [form] = Form.useForm();
  useEffect(() => {
    const user = memoryUtils.user;
    // console.log(user);
    if (user && user._id) {
      message.success("已经登录,无需重复登录");
      hishtory.replace("/");
    }
  }, [hishtory]);
  const layout = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 24,
    },
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { username, password } = values;
    const result = await reqLogin(username, password);
    console.log(result);
    if (result.status === 0) {
      message.success("登录成功");
      // console.log(1111111, result);
      var user = result.data;
      if (result.data.username !== "admin") {
        const role = await lookuserRole(result.data.usercla);
        const menus = role.menus;
        // menus.map((item) => {
        //   return memoryUtils.menus.push(item);
        // });
        //针对该页面进行特殊配置
        if (menus.indexOf("/productshop") !== -1) {
          menus.push("/productshop/addshop");
        }
        user.menus = menus;
        // 保存user
        memoryUtils.user = user; // 保存在内存中
        storageUtils.saveUser(user); // 保存到local中
      }
      memoryUtils.user = user; // 保存在内存中
      storageUtils.saveUser(user); // 保存到local中
      // storageUtils.saveUser(menus); // 保存到local中
      hishtory.replace("/");
    } else {
      // 登陆失败
      // 提示错误信息
      message.error(result.msg);
    }
  };

  const validatorPwd = [
    {
      required: true,
      message: "请输入密码",
    },
    {
      // min: 4,
      // message: "aaa",
    },
  ];
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const changeislogin = () => {
    // form.resetFields();
    // console.log(flag);
    if (flag) {
      setinfocase("我自己有账号");
      setflag(false);
      form.setFieldsValue({
        username: "admin",
        password: "admin",
      });
    } else {
      form.resetFields();
      setflag(true);
      setinfocase("点击使用默认");
    }
    // username: login, password: login
  };
  const usernamechange = () => {
    console.log(111);
    setinfocase("点击清空");
    setflag(false);
  };
  return (
    <LoginWrap>
      <div>
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              {
                min: 1,
                message: "用户名不能小于1位",
              },
            ]}
          >
            <Input
              autoComplete="off"
              placeholder="用户名"
              defaultValue={form.username}
              prefix={<UserOutlined />}
              onChange={usernamechange}
            />
          </Form.Item>

          <Form.Item rules={validatorPwd} name="password">
            <Input.Password
              defaultValue={form.password}
              placeholder="密码"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Button type="link" onClick={changeislogin}>
              {infocase}
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              style={{
                lineHeight: "20px",
                fontWeight: "800",
                fontSize: "16px",
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
            >
              登录!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrap>
  );
}
