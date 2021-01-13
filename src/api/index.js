// import jsonp from 'jsonp'
// import {message} from 'antd'
import ajax from "./ajax";

//const BASE = "http://121.4.58.185:5001";
const BASE = "";
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
//天气信息
// "https://restapi.amap.com/v3/weather/weatherInfo?city=410102&key=63f2a2a297971a375d76bb2295481955&extensions=base"
export const getweather = (city) =>
  ajax(
    `https://restapi.amap.com/v3/weather/weatherInfo?city=${
      city ? city : "中原区"
    }&key=63f2a2a297971a375d76bb2295481955&extensions=base`,
    {},
    "GET"
  );
//登录
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
//注册
export const reqRes = (username, email, phone, password, usercla) =>
  ajax(BASE + "/res", { username, email, phone, password, usercla }, "POST");
//查看用户列表
export const findUserList = () => ajax(BASE + "/finduserlist", {}, "GET");
//删除用户
export const deluser = (id) => ajax(BASE + "/deluser", { id }, "POST");
//修改用户
export const editusercase = ({ _id, username, email, phone, usercla }) =>
  ajax(
    BASE + "/editusercase",
    { _id, username, email, phone, usercla },
    "POST"
  );
//添加分类
export const pluscategory = (parentId, name) =>
  ajax(BASE + "/pluscategory", { parentId, name }, "POST");

//查看分类
export const categorylist = (parentId, name) =>
  ajax(BASE + "/categorylist", { parentId, name }, "POST");
//修改分类
export const updataclass = (_id, name) =>
  ajax(BASE + "/updataclass", { _id, name }, "POST");
//删除指定图片
export const reqDeleteImg = (name) =>
  ajax(BASE + "/manage/img/delete", { name }, "POST");

//添加产品-商品管理
export const addshopclass = ({
  categoryId,
  pCategoryId,
  name,
  price,
  desc,
  status,
  imgs,
  detail,
}) =>
  ajax(
    BASE + "/addshop",
    {
      categoryId,
      pCategoryId,
      name,
      price,
      desc,
      status,
      imgs,
      detail,
    },
    "POST"
  );
//查看商品列表
export const lookshopcase = ({ pageNum, pageSize }) =>
  ajax(BASE + "/lookshopcase", { pageNum, pageSize }, "POST");

//添加角色
export const addroles = (name) => ajax(BASE + "/addroles", { name }, "POST");
//查看角色
export const lookroles = ({ pageNum, pageSize }) =>
  ajax(BASE + "/lookroles", { pageNum, pageSize }, "POST");

//设置角色权限
export const updataroles = ({ impowername, _id, menus }) =>
  ajax(BASE + "/updataroles", { impowername, _id, menus }, "POST");

//查看角色权限
export const lookuserRole = (name) =>
  ajax(BASE + "/lookuserRole", { name }, "POST");
