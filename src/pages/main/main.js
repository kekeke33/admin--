import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Home from "../home/home";
import productclass from "../product/productclass";
import productshop from "../shopmanagement/productshop";
import User from "../user/userguanli";
import Line from "../charts/line";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import role from "../role/role";
import { memoryUtils } from "../../utils/memoryUtils";
import { useEffect } from "react";
import { message } from "antd";
import { storageUtils } from "../../utils/storageUtils";

export default function Main() {
  //设置路由权限
  let location = useLocation();
  let history = useHistory();
  useEffect(() => {
    // console.log(location);

    if (memoryUtils.user.username !== "admin") {
      // console.log(memoryUtils.user.menus);
      if (memoryUtils.user.menus) {
        if (memoryUtils.user.menus.indexOf(location.pathname) === -1) {
          message.error("非法访问,以转到权限所在路由!!!", 5);
          // history.replace(memoryUtils.user.menus[0]);

          setTimeout(() => {
            history.replace(memoryUtils.user.menus[0]);
          }, 0);
        }
      } else {
        storageUtils.removeUser();
        memoryUtils.user = {};
        message.info("此账号无权限,3s后跳转到登录页");
        setTimeout(() => {
          history.push("/login");
          // console.log(111);
        }, 3000);
      }
    }
  }, [location.pathname, history]);

  return (
    <>
      <Switch>
        <Redirect from="/" exact to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/category" component={productclass} />
        <Route path="/productshop" component={productshop} />
        <Route path="/user" component={User} />
        <Route path="/role" component={role} />
        <Route path="/charts/line" component={Line} />
        <Route path="/charts/bar" component={Bar} />
        <Route path="/charts/pie" component={Pie} />
      </Switch>
    </>
  );
}
// (

//   memoryUtils.user.menus.map((item) => {
//     console.log("aaaaaaaa", item);

//     if (item == "/home") {
//       return <Route path="/home" component={Home} />;
//     } else if (item == "/category") {
//       <Route path="/category" component={productclass} />;
//     } else if (item == "/productshop") {
//       <Route path="/productshop" component={productshop} />;
//     } else if (item == "/user") {
//       <Route path="/user" component={User} />;
//     } else if (item == "/role") {
//       <Route path="/role" component={role} />;
//     } else if (item == "/charts/line") {
//       <Route path="/charts/line" component={Line} />;
//     } else if (item == "/charts/bar") {
//       <Route path="/charts/bar" component={Bar} />;
//     } else if (item == "/charts/pie") {
//       <Route path="/charts/pie" component={Pie} />;
//     }
//   })
// )
