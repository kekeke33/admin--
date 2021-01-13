import styled from "styled-components";
export const ListWrap = styled.div`
  /* background: #666; */
  > div {
    margin: 15px auto;
    display: flex;
    justify-content: space-around;

    span {
      width: 20%;
      /* margin: 0 10px 0 0; */
    }
    > div {
      width: 80%;
    }
    input {
      width: 100%;
    }
  }
`;
