import Column from "./column/column";
import styles from "./styles.module.scss";
import smallComputer from "../../assets/images/computer-small.jpg";
import prices from "../../assets/images/prices.jpg";
import about from "../../assets/images/about-us.jpg";

function Home() {
  const data = [
    { label: "computers", route: "/computers", logo: smallComputer },
    { label: "vendors", route: "/vendors", logo: prices },
    { label: "about us", route: "/about-us", logo: about },
  ];
  return (
    <div className={styles.homeWrapper}>
      {data.map((elem) => (
        <Column key={elem.label} label={elem.label.toUpperCase()} route={elem.route} logo={elem.logo} />
      ))}
    </div>
  );
}

export default Home;
