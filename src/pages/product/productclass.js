import { Card, Modal, message, Table, Button } from "antd";
import { useEffect, useState } from "react";
import Addproclass from "./components/addclass";
import { categorylist, updataclass } from "../../api";
import Updataclassa from "./components/updataclass";
export default function Productclass() {
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState();
  const [title] = useState("一级菜单");
  const [parentName, setparentName] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [children, setchildren] = useState({});
  const [childform, setchildform] = useState({});
  useEffect(() => {
    getdate();
  }, []);
  const showsub = async (recode) => {
    setloading(true);

    const result = await categorylist(recode.parentId, recode.name);
    // console.log(result);
    setloading(false);

    if (result.status === 0) {
      setparentName(result.data[0].parentId);
      setdataSource(result.data);
      message.success(result.msg, 1);
    } else {
      message.warn(result.msg);
    }
  };
  const getdate = (parent) => {
    setloading(true);
    categorylist(parent).then((res) => {
      // console.log(res);
      if (res.status === 0) {
        setdataSource(res.data);
        message.success(res.msg, 1);
      } else {
        message.warn(res.msg, 1);
      }
      setloading(false);
    });
  };

  //返回一级菜单
  const goBack = () => {
    getdate();
    setparentName("");
  };
  //添加数据后更新数据
  const update = () => {
    console.log("数据更新成功");
    getdate();
  };
  //修改分类
  const updateclass = (record) => {
    // const result = await updataclass(record._id, record.name);
    // console.log(result);
    setchildren(record);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    // console.log(111111111, children);
    // console.log(222222222, childform);
    const result = await updataclass(children._id, childform);
    if (result.status === 0) {
      // console.log(result);
      if (children.parentId === "0") {
        getdate();
      } else {
        // console.log(children.name, children.parentId);
        setloading(true);
        categorylist(children.name, children.parentId).then((res) => {
          // console.log(res);
          if (res.status === 0) {
            setdataSource(res.data);
            message.success(res.msg, 1);
          } else {
            message.warn(res.msg, 1);
          }
          setloading(false);
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          {record.parentId !== "0" ? (
            <Button onClick={() => updateclass(record)}>修改子分类</Button>
          ) : (
            <>
              <Button onClick={() => showsub(record)}>查看子分类</Button>
              <Button onClick={() => updateclass(record)}>修改分类</Button>
            </>
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Card
        title={
          <>
            <Button size="large" onClick={goBack} type="link">
              {title}
            </Button>

            <span
              style={{ fontSize: "14px", marginRight: "10px", color: "#000" }}
            >
              {parentName}
            </span>
          </>
        }
        extra={
          !parentName ? (
            <Addproclass dataSource={dataSource} update={update} />
          ) : null
        }
      >
        {
          <Table
            loading={loading}
            rowKey="_id"
            dataSource={dataSource}
            columns={columns}
            pagination={{
              defaultCurrent: 1,
              defaultPageSize: 5,
            }}
          />
        }
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Updataclassa
            sumit={(value) => {
              setchildform(value);
            }}
            categoryName={children.name}
          />
        </Modal>
      </Card>
    </div>
  );
}
