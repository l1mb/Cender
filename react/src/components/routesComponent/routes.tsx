import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "@/elements/home/spinnerElement/spinner";
import styles from "./scrollWrapper.module.scss";
import Footer from "../footerComponent/footer";
import WrappedContent from "./wrapper";

function Routes(): JSX.Element {
  return (
    <div className={styles.globalWrapper}>
      <Suspense fallback={<Spinner />}>
        <Router>
          <WrappedContent />
        </Router>
      </Suspense>

      <Footer />
    </div>
  );
}

export default Routes;
