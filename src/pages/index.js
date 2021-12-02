import { Children, useState } from "react";
import styles from "../styles/Home.module.css";
import { Button } from "antd";
import { InputNumber } from "antd";
import { Select } from "antd";

const LAYER_ORDERS = [
  "Background",
  "Eyeball",
  "Eye color",
  "Iris",
  "Shine",
  "Bottom lid",
  "Top lid",
];

export default function Home() {
  const [images, setImages] = useState([]);
  const [growEditionSizeTo, setGrowEditionSizeto] = useState(5);
  const [layersOrder, setLayerOrders] = useState([]);
  const { Option } = Select;
  const fetchImages = async () => {
    const results = await fetch("api/get-image", { method: "post", body: {} });
    const response = await results.json();
    console.log(response);
    setImages(response);
  };
  const handleClick = async () => {
    const layer = [];
    layersOrder.forEach((item) => {
      layer.push({ name: item });
    });
    const data = {
      growEditionSizeTo: growEditionSizeTo,
      layersOrder: layer,
    };
    console.log("data", data);
    await fetch("api/generate-images", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await fetchImages();
  };
  const onChange = (value) => {
    console.log(value);
    setGrowEditionSizeto(value);
  };
  const handleChange = (value) => {
    setLayerOrders(value);
  };

  return (
    <div className={styles.container}>
      <h5>Number of Images</h5>
      <InputNumber min={1} max={10} defaultValue={5} onChange={onChange} />
      <div>
        <h5>Choose layers</h5>
        <Select
          mode='multiple'
          allowClear
          style={{ width: "100%" }}
          placeholder='Please select'
          onChange={handleChange}
        >
          {LAYER_ORDERS.map((item, idx) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </div>

      <div>
        <Button onClick={handleClick}>Generate</Button>
      </div>

      {images.map((item, id) => (
        <img src={item} alt='' key={id} />
      ))}
    </div>
  );
}
