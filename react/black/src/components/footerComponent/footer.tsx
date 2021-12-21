import styles from "./footer.module.scss";
import eaIcon from "../../assets/images/footerIcons/ea.png";
import valveIcon from "../../assets/images/footerIcons/valve.png";
import riotIcon from "../../assets/images/footerIcons/riot.png";
import rockIcon from "../../assets/images/footerIcons/rockstar.png";
import ubicIcon from "../../assets/images/footerIcons/ubic.png";

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <span>Incredible convenient</span>
    <div className={styles.icons}>
      <div className={styles.footerLogo}>
        <a href="https://www.ea.com/">
          <img src={eaIcon} alt="EA" />
        </a>
      </div>
      <div className={styles.footerLogo}>
        <a href="https://www.valvesoftware.com/en/">
          <img src={valveIcon} alt="Valve" />
        </a>
      </div>
      <div className={styles.footerLogo}>
        <a href="https://www.riotProducts.com/en">
          <img src={riotIcon} alt="RiotProducts" />
        </a>
      </div>
      <div className={styles.footerLogo}>
        <a href="https://www.rockstarProducts.com/">
          <img src={rockIcon} alt="RockStar" />
        </a>
      </div>
      <div className={styles.footerLogo}>
        <a href="https://www.ubisoft.com/">
          <img src={ubicIcon} alt="Ubisoft" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
