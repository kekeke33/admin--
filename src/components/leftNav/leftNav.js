import React from "react";
import { Menu, Switch } from "antd";

import { withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import { memoryUtils } from "../../utils/memoryUtils";

const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    theme: "Light",
    current: "1",
  };
  // 动态获取菜单列表
  getmenulist = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item icon={item.icon} key={item.key}>
            {item.title}
          </Menu.Item>
        );
      } else {
        const path = this.props.location.pathname;
        const cItem = item.children.find((citem) => citem.key === path);
        if (cItem) {
          // console.log(cItem);
          this.openKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {/* <Menu.Item key="productclass">品类管理</Menu.Item>
          <Menu.Item key="productshop">商品管理</Menu.Item> */}
            {this.getmenulist(item.children)}
          </SubMenu>
        );
      }
    });
  };

  UNSAFE_componentWillMount() {
    const menus = memoryUtils.user.menus;
    const username = memoryUtils.user.username;
    // console.log(username);
    let newMenusList = [];
    if (username === "admin") {
      this.getMenuNodes = this.getmenulist(menuList);
    } else if (menus) {
      menus.forEach((item) =>
        menuList.forEach((mon) => {
          if (item === mon.key) {
            // console.log(item);
            // console.log(mon);
            return newMenusList.push(mon);
          }
        })
      );
      // console.log(newMenusList);
      this.getMenuNodes = this.getmenulist(newMenusList);
    } else {
      this.getMenuNodes = this.getmenulist(menuList);
    }
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? "dark" : "light",
    });
  };

  handleClick = (e) => {
    // console.log("click ", e);
    this.setState({
      current: e.key,
    });
    this.props.history.push(e.key);
  };

  render() {
    const path = this.props.location.pathname;
    // console.log(path);
    const openKey = this.openKey;
    return (
      <>
        <Switch
          checked={this.state.theme === "dark"}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <br />
        <br />
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 200 }}
          defaultOpenKeys={[openKey]}
          selectedKeys={[path]}
          mode="inline"
        >
          {/* <Menu.Item icon={<MailOutlined />} key="home">
            首页
          </Menu.Item>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品模块">
            <Menu.Item key="productclass">品类管理</Menu.Item>
            <Menu.Item key="productshop">商品管理</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="权限">
            <Menu.Item key="9">菜单 9</Menu.Item>
            <Menu.Item key="10">菜单 10</Menu.Item>
            <Menu.Item key="11">菜单 11</Menu.Item>
            <Menu.Item key="12">菜单 12</Menu.Item>
          </SubMenu>
          <Menu.Item icon={<MailOutlined />} key="user">
            角色管理
          </Menu.Item> */}

          {this.getMenuNodes}
        </Menu>
      </>
    );
  }
}
export default withRouter(Sider);
