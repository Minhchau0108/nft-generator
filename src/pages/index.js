import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const results = await fetch("api/get-image");
    const response = await results.json();
    console.log(response);
    setImages(response);
  };
  const handleClick = async () => {
    await fetch("api/generate-images");
    await fetchImages();
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={handleClick}>Generator</button>
      </div>
      {images.map((item, id) => (
        <img src={item} alt='' key={id} />
      ))}
    </div>
  );
}
