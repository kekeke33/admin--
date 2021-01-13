import { Card, Input, Button, Table, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { lookshopcase } from "../../api";
import { BASE_IMG_URL } from "../../utils/constants";
const { Option } = Select;
export default function ShopHome() {
  let history = useHistory();
  const [searchType, setsearchType] = useState("productName");
  const [searchName, setsearchName] = useState("");
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState();
  const [total, settotal] = useState(0);
  const [pageNum] = useState(1);

  useEffect(() => {
    // async function getdata() {
    //   setloading(true);
    //   const result = await lookshopcase({ pageNum: 1, pageSize: 5 });
    //   console.log(result);
    //   // let arr = [];
    //   // result.data.map((item) => {
    //   //   return arr.push({
    //   //     name: item.name,
    //   //     desc: item.desc,
    //   //     price: item.price,
    //   //     status: item.status,
    //   //     _id: item._id,
    //   //   });
    //   // });
    //   // console.log(result);
    //   // setdataSource(arr);
    //   setloading(false);
    // }
    // getdata();
    // other code
    getProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取商品分类
  const getProducts = async (num) => {
    setloading(true);

    let pageNum = num;
    // const { searchName, searchType } = this.state;
    let result;
    if (searchName) {
      // 说明我要进行搜索;
      result = await lookshopcase({
        pageNum,
        pageSize: 3,
        searchName,
        searchType,
      });
    } else {
      // 说明展示
      result = await lookshopcase({ pageNum, pageSize: 3 });
    }
    // console.log(result);
    if (result.status === 0) {
      const { list, total } = result.data;
      setdataSource(list);
      settotal(total);
      setloading(false);
      message.success(result.msg, 1);
      // this.setState({
      //   products: list,
      //   total, //设置total可以分页
      // });
    }
  };
  // const getProducts = () => {
  //   console.log(searchType, searchName);
  // };

  const addshop = () => {
    history.push("/productshop/addshop");
  };
  const title = (
    <span>
      <Select
        style={{ width: "150px" }}
        value={searchType}
        onChange={(value) => setsearchType(value)}
      >
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按描述搜索</Option>
      </Select>
      <Input
        type="text"
        style={{ width: "150px", margin: "0 10px" }}
        value={searchName}
        onChange={(e) => setsearchName(e.target.value)}
      />
      <Button onClick={() => getProducts(1)} type="primary">
        搜索
      </Button>
    </span>
  );
  const extra = (
    <Button onClick={addshop} type="primary">
      添加
    </Button>
  );

  const columns = [
    {
      width: 150,

      title: "商品名称",
      dataIndex: "name",
    },
    {
      title: "图片",
      dataIndex: "imgs",
      width: 300,
      render: (imgs) => {
        return (
          <img
            style={{
              border: "4px solid #000",
              borderRadius: "10px",
              width: "100%",
              padding: "2px",
            }}
            alt="img"
            src={BASE_IMG_URL + imgs[0]}
          ></img>
        );
        // return imgs.map((item, index) => {
        //   // console.log(111111111, item);
        //   return (
        //     <>
        //       <img
        //         key={index}
        //         style={{
        //           border: "4px solid #000",
        //           borderRadius: "10px",
        //           width: "100%",
        //           padding: "2px",
        //         }}
        //         alt="img"
        //         src={BASE_IMG_URL + item}
        //       ></img>
        //     </>
        //   );
        // });
      },
    },
    {
      title: "商品描述",
      dataIndex: "desc",
    },
    {
      title: "价格",
      dataIndex: "price",
      render: (price) => {
        return "￥" + price;
      },
    },

    {
      width: 100,
      title: "状态",
      render: () => {
        return (
          <span>
            <Button type="primary">已上架</Button>
            <span>在售</span>
          </span>
        );
      },
    },
    {
      width: 130,
      title: "操作",
      render: () => {
        return (
          <span>
            <span>详情</span>
            <span>修改</span>
          </span>
        );
      },
    },
  ];
  return (
    <Card title={title} extra={extra}>
      <Table
        rowKey="_id"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total,
          defaultCurrent: pageNum,
          defaultPageSize: 3,
          onChange: getProducts,
        }}
      />
      ;
    </Card>
  );
}
