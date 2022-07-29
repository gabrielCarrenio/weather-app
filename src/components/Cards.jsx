import styles from "../css/Cards.module.css";
import Card from "./Card";

export default function Cards(props) {
  const { cities, onClose } = props;
  if (cities) {
    return (
      <div className={styles.container}>
        {cities.map((c, i) => {
          return (
            <Card
              key={c.id + i}
              max={c.max}
              min={c.min}
              name={c.name}
              img={c.img}
              onClose={() => onClose(c.id)}
              id={c.id}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>No cities!</div>;
  }
}
