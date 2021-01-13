import { Upload, Modal, message } from "antd";
// import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { reqDeleteImg } from "../../../api";
function Uploadpic(props) {
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState("");
  const [previewTitle, setpreviewTitle] = useState("");
  const [fileList, setfileList] = useState([]);

  function getBase64(file) {
    console.log(11111, file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  // const beforeUpload = (file) => {
  //   console.log(file);
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   console.log(333333, isLt2M);
  //   if (!isLt2M) {
  //     message.error("图片大小不能超过2m!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };
  const handleCancel = () => {
    setpreviewVisible(false);
  };
  const handlePreview = async (file) => {
    console.log(1111, file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewImage(file.url || file.preview);
    setpreviewVisible(true);
    setpreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async ({ file, fileList }) => {
    console.log(
      "handleChange()",
      file.status,
      fileList.length,
      file === fileList[fileList.length - 1]
    );

    // 一旦上传成功, 将当前上传的file的信息修正(name, url)
    if (file.status === "done") {
      const result = file.response; // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
      if (result.status === 0) {
        message.success("上传图片成功!");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
        props.getimgcase(fileList.map((file) => file.name));
      } else {
        message.error("上传图片失败");
      }
    } else if (file.status === "removed") {
      // 删除图片
      const result = await reqDeleteImg(file.name);
      console.log(result);
      if (result.status === 0) {
        message.success("删除图片成功!");
      } else {
        message.error("删除图片失败!");
      }
    }
    setfileList(fileList);
  };

  // const handleChange = async (fileList) => {
  //   console.log(
  //     "handleChange()",
  //     file.status,
  //     fileList.length,
  //     file === fileList[fileList.length - 1]
  //   );

  //   // 一旦上传成功, 将当前上传的file的信息修正(name, url)
  //   if (file.status === "done") {
  //     const result = file.response; // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
  //     if (result.status === 0) {
  //       message.success("上传图片成功!");
  //       const { name, url } = result.data;
  //       file = fileList[fileList.length - 1];
  //       file.name = name;
  //       file.url = url;
  //     } else {
  //       message.error("上传图片失败");
  //     }
  //   } else if (file.status === "removed") {
  //     // 删除图片
  //     const result = await reqDeleteImg(file.name);
  //     if (result.status === 0) {
  //       message.success("删除图片成功!");
  //     } else {
  //       message.error("删除图片失败!");
  //     }
  //   }

  //   // 在操作(上传/删除)过程中更新fileList状态
  //   setfileList(fileList);
  // };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action="/manage/img/upload"
        // action="http://121.4.58.185:5001/manage/img/upload"
        listType="picture-card"
        name="image" /*请求参数名*/
        fileList={fileList}
        // beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default Uploadpic;
