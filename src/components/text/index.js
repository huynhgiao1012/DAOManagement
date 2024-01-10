import "./text.scss";

const Text = ({ data }) => {
  return (
    <div style={{ width: "90%" }}>
      <h3 style={{ color: "#34acaf" }}>{data.key}</h3>
      <p
        style={{
          backgroundColor: "#f8f8f8",
          padding: 10,
          color: "#3C3434",
          borderRadius: 10,
          fontWeight: "bold",
        }}
      >
        {data.value}
      </p>
    </div>
  );
};

export default Text;
