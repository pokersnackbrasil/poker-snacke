
import styles from './style.module.css'
import carta from './../../assets/carta.png'

export function Loading() {
    return (
      <div className={styles.Baseloading} data-test-id="loading">
        {/* <div className={styles.Login}> */}
          <div className={styles.barraLoading}>
              <img className={styles.img} src={carta} alt="Logotipo da Poker Snack" />
          </div>
        </div>
      // </div>
    );
}
