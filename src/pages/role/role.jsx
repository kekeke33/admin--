import { Form, Input, Modal, Card, Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import { addroles, lookroles, updataroles } from "../../api";
import UserRoles from "./components/userrole";
import { memoryUtils } from "../../utils/memoryUtils";
export default function Role() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [QisModalVisible, setQIsModalVisible] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [Qdata, setQdata] = useState(undefined);
  const [total, settotal] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "creatime",
    },
    {
      title: "授权时间",
      dataIndex: "impowertime",
    },
    {
      title: "授权人",
      dataIndex: "impowername",
    },
  ];
  useEffect(() => {
    getroleslist(1);
  }, []);
  const getroleslist = async (pageNum) => {
    const result = await lookroles({ pageNum, pageSize: 5 });
    if (result.status === 0) {
      message.success(result.msg);
      // console.log(result);
      settotal(result.data.total);
      // console.log(result.data.total);
      const arr = [];
      Object.keys(result.data.list).map((item) => {
        // console.log(result.data.list[item]);
        return arr.push({
          name: result.data.list[item].name,
          creatime: result.data.list[item].creatime,
          impowertime: result.data.list[item].impowertime,
          impowername: result.data.list[item].impowername,
          _id: result.data.list[item]._id,
          menus: result.data.list[item].menus,
        });
      });
      // console.log(arr);
      setdataSource(arr);
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setQdata(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onrow = (record) => {
    return {
      onClick: (event) => {
        console.log(record);
      },
    };
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const QshowModal = () => {
    setQIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setQIsModalVisible(false);
  };
  const onFinishFailed = async (value) => {
    console.log(value);
    const result = await addroles(value.note);
    // console.log(result);
    if (result.status === 0) {
      message.success(result.msg);
      setIsModalVisible(false);
    } else {
      message.warn(result.msg);
    }
    // console.log(total);
    getroleslist(Math.floor(total / 5 + 1));
    // getroleslist(1);
  };
  const QonFinish = async (value) => {
    console.log(1111111, value);
    // console.log(111111, memoryUtils.user.username);
    // console.log(selectedKeys);
    // console.log(Qdata[0]._id);
    setQIsModalVisible(false);
    const result = await updataroles({
      impowername: memoryUtils.user.username,
      _id: Qdata[0]._id,
      menus: selectedKeys,
    });
    getroleslist(1);
    console.log(result);
  };
  const callbackdata = (keys) => {
    setSelectedKeys(keys);
  };
  return (
    <Card
      title={
        <>
          <Button onClick={showModal} type="primary">
            {" "}
            添加角色
          </Button>
          {Qdata ? (
            <Button
              onClick={QshowModal}
              style={{ margin: "0 20px" }}
              type="primary"
            >
              {" "}
              设置权限
            </Button>
          ) : (
            <Button
              onClick={QshowModal}
              style={{ margin: "0 20px" }}
              type="primary"
              disabled
            >
              {" "}
              设置权限
            </Button>
          )}
        </>
      }
    >
      <Table
        rowKey="_id"
        onRow={onrow}
        rowSelection={{
          // type: selectionType,
          type: "radio",
          ...rowSelection,
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          defaultCurrent: 1,
          total,
          onChange: getroleslist,
        }}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinishFailed} form={form} name="control-hooks">
          <Form.Item
            name="note"
            label="角色名称:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
      <UserRoles
        modalVisible={QisModalVisible}
        handleCancel={handleCancel}
        record={Qdata}
        onFinish={QonFinish}
        callbackdata={(val) => callbackdata(val)}
      />
    </Card>
  );
}
