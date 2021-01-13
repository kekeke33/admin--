import { Input } from "antd";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
function Updataclass(props) {
  const [value, setvalue] = useState("");
  // console.log(11111, props);
  useEffect(() => {
    setvalue(props.categoryName);
  }, [props.categoryName]);

  const databiu = (e) => {
    props.sumit(e.target.value);
    setvalue(e.target.value);
  };
  return (
    <>
      <Input value={value} onChange={databiu} placeholder={value} />
    </>
  );
}
export default Updataclass;
