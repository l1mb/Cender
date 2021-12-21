interface TheadProps {
  data: string[];
}

const Thead: React.FC<TheadProps> = ({ data }) => (
  <thead>
    <tr>
      {data.map((m) => (
        <th key={m}>{m}</th>
      ))}
    </tr>
  </thead>
);

export default Thead;
