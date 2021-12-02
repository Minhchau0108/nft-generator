import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button, InputNumber, Select, Switch } from "antd";
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
  const [gifs, setGifs] = useState([]);
  const [growEditionSizeTo, setGrowEditionSizeTo] = useState(5);
  const [layersOrder, setLayerOrders] = useState([]);
  const [isGif, setIsGif] = useState(true);
  const { Option } = Select;
  const fetchImages = async () => {
    const results = await fetch("api/get-image");
    const response = await results.json();
    console.log(response);
    setImages(response);
  };
  const fetchGifs = async () => {
    const results = await fetch("api/get-gif");
    const response = await results.json();
    console.log(response);
    setGifs(response);
  };
  const handleClick = async () => {
    const layer = [];
    layersOrder.forEach((item) => {
      layer.push({ name: item });
    });
    const data = {
      growEditionSizeTo: growEditionSizeTo,
      layersOrder: layer,
      isGif: isGif,
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
    isGif && (await fetchGifs());
  };
  const onChange = (value) => {
    console.log(value);
    setGrowEditionSizeTo(value);
  };
  const handleChange = (value) => {
    setLayerOrders(value);
  };
  const handleChangeShowGifs = (checked) => {
    setIsGif(checked);
  };

  return (
    <div className={styles.container}>
      <h2 className='label'>Number of images</h2>
      <InputNumber min={1} max={100} defaultValue={5} onChange={onChange} />
      <div className='layers'>
        <h2 className='label'>Choose some layers </h2>
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
        <h2 className='label'>Show gifs</h2>
        <Switch defaultChecked onChange={handleChangeShowGifs} />
      </div>

      <div className='btn-generate'>
        <Button onClick={handleClick}>Generate</Button>
      </div>

      <div className='images'>
        {images.map((item, id) => (
          <img src={item} alt='' key={id} />
        ))}
      </div>
      {isGif && (
        <div className='images'>
          {gifs.map((item, id) => (
            <img src={item} alt='' key={item} />
          ))}
        </div>
      )}
    </div>
  );
}
