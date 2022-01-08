interface TheadProps {
  data: string[];
}

function Thead({ data }) {
  return (
    <>
      <thead style={{ textAlign: "center" }}>
        <tr>
      {data.map((m) => (
        <th key={m}>{m}</th>  
      ))}
    </tr>
    </thead></>

  );
}

export default Thead;
