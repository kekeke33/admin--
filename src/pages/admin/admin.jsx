import { Layout } from "antd";
import Main from "../main/main";
import { memoryUtils } from "../../utils/memoryUtils";
import LeftNav from "../../components/leftNav/leftNav";
import GoLogin from "../../components/heaner/header";
import { Redirect } from "react-router-dom";
import { FooterWrap } from "./styledadmin";
const { Footer, Sider, Content } = Layout;
export default function LayOut() {
  const user = memoryUtils.user;
  // 如果内存没有存储user ==> 当前没有登陆
  if (!user || !user._id) {
    // 自动跳转到登陆(在render()中)
    return <Redirect to="/login" />;
  }
  return (
    // <Layout style={{ height: "100%" }}>
    //   <Header style={{ background: "#fff" }}>
    //     <GoLogin />
    //   </Header>
    //   <BrowserRouter>
    //     <Layout>
    //       <Sider style={{ background: "#fff" }}>
    //         <LeftNav />
    //       </Sider>
    //       <Content style={{ border: "1px solid #cecece" }}>
    //         <Main />
    //       </Content>
    //     </Layout>
    //   </BrowserRouter>
    //   <Footer>Footer</Footer>
    // </Layout>
    <Layout style={{ height: "100%" }}>
      <Sider style={{ background: "#fff" }}>
        <LeftNav />
      </Sider>
      <Layout>
        <GoLogin />
        <Content style={{ background: "#fff", border: "1px solid #cecece" }}>
          <Main />
        </Content>
        <Footer
          style={{
            // height: "50px",
            margin: 0,
            padding: 0,
            // border: "1px solid #cecece",
          }}
        >
          <FooterWrap>
            <div>
              <p>
                梦想是凌晨拿起笔的坚持是掀开被子的毫不犹豫和冷水扑面的清醒六点看到旭日东升的惊艳和笔记绽放的光
              </p>
            </div>
          </FooterWrap>
        </Footer>
      </Layout>
    </Layout>
  );
}
