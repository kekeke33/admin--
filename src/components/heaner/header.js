import { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { memoryUtils } from "../../utils/memoryUtils";
import { storageUtils } from "../../utils/storageUtils";
import { getweather } from "../../api";
import menuList from "../../config/menuConfig";
import { Header } from "./styledHeader";
import { Form, Input, Modal, Button, message } from "antd";
import {
  ExclamationCircleOutlined,
  EnvironmentFilled,
} from "@ant-design/icons";
import Dayjs from "dayjs";
// import qingtian from "../../assets/images/晴天.jpg";
import yutian from "../../assets/images/雨天.jpg";
import leiyu from "../../assets/images/阴天.jpg";
// import yintian from "../../assets/images/雷雨.jpg";
const { confirm } = Modal;
function GoLogin() {
  const hishtory = useHistory();
  const [username, setUserName] = useState("");
  const [Times, setTimes] = useState("");
  const [intervalId, setintervalId] = useState("");
  const [title, setititle] = useState("");
  const [weather, setweather] = useState({});
  const [city, setcity] = useState("");

  useEffect(() => {
    async function gettianqi() {
      const result = await getweather(city);
      // console.log(result);
      if (result.infocode === "10000") {
        if (result.lives.length > 0) {
          setweather(result.lives[0]);
          message.success("天气查询成功", 1);
        } else {
          message.warn("暂无该城市信息,请重新输入");
        }
      } else {
        message.warn("查询天气失败", 1);
      }
    }
    gettianqi();
  }, [city]);
  let location = useLocation();
  const handlogin = () => {
    confirm({
      title: "确认退出?",
      icon: <ExclamationCircleOutlined />,
      content: "退出需要重新登录",
      okText: "确定!",
      okType: "danger",
      cancelText: "不要!",
      onOk() {
        // console.log("OK");
        storageUtils.removeUser();
        memoryUtils.user = {};
        hishtory.replace("/login");
      },
      onCancel() {
        // console.log("Cancel");
        console.log(Dayjs().format("YYYY-MM-DD HH:mm:ss"));
      },
    });
  };
  useEffect(() => {
    // console.log(memoryUtils.user);
    setUserName(memoryUtils.user.username);
    getTimes();
  }, []);
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  const getTimes = () => {
    setintervalId(
      setInterval(() => {
        setTimes(Dayjs().format("YYYY-MM-DD HH:mm:ss"));
      }, 1000)
    );
  };
  useEffect(() => {
    const gteTitle = () => {
      const path = location.pathname;
      let title;
      menuList.forEach((item) => {
        if (item.key === path) {
          // 如果当前item对象的key与path一样,item的title就是需要显示的title
          title = item.title;
        } else if (item.children) {
          // 在所有子item中查找匹配的
          const cItem = item.children.find(
            (cItem) => path.indexOf(cItem.key) === 0
          );
          // 如果有值才说明有匹配的
          if (cItem) {
            // 取出它的title
            title = cItem.title;
          }
        }
      });
      setititle(title);
    };
    gteTitle();
  }, [location.pathname]);
  const onFinish = (values) => {
    console.log(values);
    setcity(values.note);
  };
  const tishi = () => {
    message.info("支持县级别哦");
  };
  return (
    <Header
      style={{
        background: `url('${yutian}') center center/cover`,
        backgroundColor: "#1D2128",
        position: "relative",
        color: "#fff",
      }}
    >
      <div>
        <div>欢迎: {username}</div>
        <Button onClick={handlogin} type="primary">
          退出
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "20px" }}>{title}</span>
        {Times}
      </div>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          width: "150px",
          height: "80%",
        }}
      >
        <Form name="control-ref" onFinish={onFinish}>
          <Form.Item color="#fff" name="note">
            <Input
              onFocus={tishi}
              autoComplete="off"
              placeholder="输入城市名"
              prefix={<EnvironmentFilled />}
            />
          </Form.Item>

          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </div>
      <div
        style={{
          width: "50%",
          height: "80%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          // background: "blue",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          // fontSize: "18px",
          // color: "yellow",
        }}
      >
        <div
          style={{
            opacity: ".7",
            borderRadius: "100%",
            overflow: "hidden",
            width: "50px",
            height: "50px",
          }}
        >
          <img
            alt={weather.weather}
            style={{ width: "50px", height: "50px" }}
            src={weather.weather === "晴" ? yutian : leiyu}
          ></img>
        </div>
        <div>
          <p>
            {weather.province}•{weather.city}
          </p>
          <p>风力级别: {weather.windpower}</p>
        </div>
        <div>
          <p>
            <span>温度: </span>
            <span style={{ color: "#eaff8f" }}>{weather.temperature}</span>
          </p>
          <p>
            <span>天气: </span>
            <span style={{ color: "#eaff8f" }}>{weather.weather}</span>
          </p>
        </div>
      </div>
    </Header>
  );
}
export default withRouter(GoLogin);
