import styles from './cookingLoader.module.css';

const CookingLoader = () => {
  return (
    <div className={styles.cookingContainer}>
      <h1 className={styles.title}>Cooking in progress..</h1>
      <div id='cooking' className={styles.cooking}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.bubble}></div>
        ))}
        <div className={styles.area}>
          <div className={styles.sides}>
            <div className={styles.pan}></div>
            <div className={styles.handle}></div>
          </div>
          <div className={styles.pancake}>
            <div className={styles.pastry}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingLoader;
