import styled from "styled-components";
import bgimg from "../../assets/images/雨天.jpg";
// import one from "../../assets/font/HYYanRuiMinXingKaiW";
// import two from "../../assets/font/SentyCandy-color";
export const HeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: url(${bgimg}) no-repeat center/cover;
  display: flex;
  align-items: center;
  p {
    /* margin: 20% 0; */
    /* color: #18dbb8; */
    color: #000;
    text-align: center;
    font-size: 60px;
    font-family: "HYYanRuiMinXingKaiW";
    text-shadow: 0 0 20px #000;
    text-shadow: -1px -1px rgba(197, 223, 248, 0.8),
      -2px -2px rgba(197, 223, 248, 0.8), -3px -3px rgba(197, 223, 248, 0.8),
      -4px -4px rgba(197, 223, 248, 0.8), -5px -5px rgba(197, 223, 248, 0.8),
      -6px -6px rgba(197, 223, 248, 0.8);
    /* text-shadow: 5px 5px 0 #666, 7px 7px 0 #eee; */
  }
`;
