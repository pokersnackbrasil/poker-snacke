import React from 'react';
import styles from './style.module.css'
import Lottie from 'lottie-react';
import spinnerAnimation from './animation.json';

import logo from "../../assets/ficha.png";

export function Loading() {
    return (
      <div className={styles.Baseloading} data-test-id="loading">
        {/* <div className={styles.Login}> */}
          <div className={styles.barraLoading}>
            <div className={styles.image}>
              <Lottie
                animationData={spinnerAnimation}
                // style={{ width: 100, height: 100 }}
                loop={true}
                autoplay={true}
              />
              {/* <img src={logo} alt="Logotipo da Poker Snack" /> */}
            </div>
          </div>
        </div>
      // </div>
    );
}
