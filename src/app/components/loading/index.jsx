import { Box } from "@mui/material";
import "./styles.css";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span className="loader"></span>
    </div>
  );
};
export default Loader;
