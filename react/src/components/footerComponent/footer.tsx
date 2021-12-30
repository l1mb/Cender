import styles from "./footer.module.scss";
import fender from "../../assets/images/footerIcons/fender.svg";
import gibson from "../../assets/images/footerIcons/gibson.svg";
import squire from "../../assets/images/footerIcons/squire.svg";
import jackson from "../../assets/images/footerIcons/jackson.svg";
import ibanez from "../../assets/images/footerIcons/ibanez.svg";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <span>Incredible convenient</span>
      <div className={styles.icons}>
        <div className={styles.footerLogo}>
          <a href="https://www.fender.com/">
            <img src={fender} alt="fender" />
          </a>
        </div>
        <div className={styles.footerLogo}>
          <a href="https://www.gibson.com">
            <img src={gibson} alt="Valve" />
          </a>
        </div>
        <div className={styles.footerLogo}>
          <a href="https://www.fender.com/en/squier-electric-guitars/">
            <img src={squire} alt="RiotProducts" />
          </a>
        </div>
        <div className={styles.footerLogo}>
          <a href="https://www.jacksonguitars.com/en/start">
            <img src={jackson} alt="RockStar" />
          </a>
        </div>
        <div className={styles.footerLogo}>
          <a href="https://www.ibanez.com/">
            <img src={ibanez} alt="Ubisoft" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
