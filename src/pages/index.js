import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button } from "antd";

export default function Home() {
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    const results = await fetch("api/get-image", {method: 'post', body: { 
      
    }});
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
        <Button onClick={handleClick}>Generate</Button>
      </div>

      {images.map((item, id) => (
        <img src={item} alt='' key={id} />
      ))}
    </div>
  );
}
