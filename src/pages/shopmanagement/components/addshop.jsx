import { Card, Form, Input, Button, Cascader, message } from "antd";
import { useEffect, useState } from "react";
import Uploadpic from "./upload";
import { categorylist, addshopclass } from "../../../api/index";
// import { useState } from "react";
// import { SwapOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};
// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     number: "${label} 必须为数字!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };

export default function Addshop() {
  const [imgcase, setimgcase] = useState({});
  const [options, setOptions] = useState([]);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  let history = useHistory();
  useEffect(() => {
    getoptions();
  }, []);
  const getoptions = async () => {
    const result = await categorylist();
    // console.log(result);
    let aa = [];
    result.data.map((item) => {
      // console.log(item);
      return aa.push({ value: item.name, label: item.name, isLeaf: false });
    });
    setOptions(aa);
  };
  useEffect(() => {
    return getoptions();
  }, []);
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const result = await categorylist(targetOption.value, targetOption.value);
    console.log(result.data);
    targetOption.children = [];
    if (result.data) {
      result.data.map((item) => {
        return targetOption.children.push({
          label: item.name,
          value: item.name,
        });
      });
    } else {
      targetOption.isLeaf = true;
    }
    targetOption.loading = false;
    setOptions([...options]);
  };

  const onFinish = async (values) => {
    console.log(values);
    console.log(imgcase);
    console.log(options);
    const result = await addshopclass({
      categoryId:
        values.user.shopclass.length > 1 ? values.user.shopclass[1] : "0",
      pCategoryId: values.user.shopclass[0] || "0",
      name: values.user.name || "",
      price: values.user.price || "",
      desc: values.user.desc || "",
      status: 1,
      imgs: imgcase.length > 0 ? imgcase : "image-1610291565460.jpg",
      detail: values.user.case || "",
    });
    console.log(result);
    if (result.status === 0) {
      message.success(result.msg);
      history.replace("/productshop");
    } else {
      message.error(result.msg);
    }
  };

  return (
    <Card title="添加商品" extra="?">
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        autoComplete="off"

        // validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "name"]}
          label="商品名称"
          rules={[
            {
              required: true,
              message: "必填项",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["user", "desc"]} label="商品描述" rules={[]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={["user", "price"]}
          label="商品价格"
          rules={[
            {
              required: true,
              message: "必填项",
              // type: "number",
              // message: "请输入数字",
            },
          ]}
        >
          <Input prefix="￥" suffix="RMB" />
        </Form.Item>
        <Form.Item
          name={["user", "shopclass"]}
          rules={[
            {
              required: true,
              message: "必填项",
            },
          ]}
          label="商品分类"
        >
          <Cascader
            placeholder="指定商品分类"
            options={options}
            loadData={loadData}
            onChange={onChange}
            changeOnSelect
            notFoundContent
            // suffixIcon={<SwapOutlined />}
          />
        </Form.Item>
        <Form.Item name={["user", "imgcase"]} label="商品图片">
          <Uploadpic
            getimgcase={(imgcase) => {
              setimgcase(imgcase);
            }}
          ></Uploadpic>
        </Form.Item>
        <Form.Item name={["user", "case"]} label="商品详情">
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
