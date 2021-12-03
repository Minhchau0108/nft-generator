import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button, InputNumber, Switch, Radio } from "antd";
import Layer from "../components/Layer";
import { PlusOutlined } from "@ant-design/icons";

export default function Home() {
  const [images, setImages] = useState([]);
  const [growEditionSizeTo, setGrowEditionSizeTo] = useState(5);
  const [layersOrder, setLayerOrders] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [viewAsImages, setViewAsImages] = useState("images");
  const [isGif, setIsGif] = useState(true);
  const fetchGifs = async () => {
    const results = await fetch("api/get-gif");
    const response = await results.json();
    setGifs(response);
  };
  const handleClick = async () => {
    const layer = [];
    layersOrder.forEach((item) => {
      if (item.checked) {
        layer.push({
          name: item.name,
          options: {
            blend: item.options.blend,
            opacity: item.options.opacity / 100,
          },
        });
      }
    });
    const data = {
      growEditionSizeTo: growEditionSizeTo,
      layersOrder: layer,
      isGif: isGif,
    };
    const response = await fetch("api/generate-images", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("result", result);
    setImages(result.data);
  };
  const onChange = (value) => {
    setGrowEditionSizeTo(value);
  };
  const handleAddLayer = () => {
    const layer = {
      name: "",
      checked: false,
      options: { blend: "", opacity: 100 },
    };
    setLayerOrders([...layersOrder, layer]);
  };

  const handleChangeShowGifs = (checked) => {
    setIsGif(checked);
  };
  const handleChangeCheckLayer = (code, checked) => {
    const idx = layersOrder.findIndex((_, idx) => idx === code);
    const newLayerOrder = [...layersOrder];
    newLayerOrder[idx].checked = checked;
    setLayerOrders(newLayerOrder);
  };
  const handleChangeName = (code, name) => {
    const idx = layersOrder.findIndex((_, idx) => idx === code);
    const newLayerOrder = [...layersOrder];
    newLayerOrder[idx].name = name;
    setLayerOrders(newLayerOrder);
  };
  const handleChangeOption = (code, option) => {
    const idx = layersOrder.findIndex((_, idx) => idx === code);
    const newLayerOrder = [...layersOrder];
    newLayerOrder[idx].options = option;
    setLayerOrders(newLayerOrder);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "500px",
        }}
      >
        <div style={{ display: "flex" }}>
          <p className='label'>Number of images</p>
          <InputNumber min={1} max={100} defaultValue={5} onChange={onChange} />
        </div>
        <Button
          type='primary'
          shape='circle'
          icon={<PlusOutlined />}
          size='large'
          style={{ marginLeft: 10 }}
          onClick={handleAddLayer}
        />
      </div>
      <div>
        <Switch
          defaultChecked
          onChange={handleChangeShowGifs}
          checkedChildren='Gifs'
          unCheckedChildren='Gifs'
        />
      </div>
      <div className='layers'>
        {layersOrder.map((item, idx) => (
          <Layer
            key={`layer-bg-${idx}`}
            code={idx}
            layer={item}
            handleChange={(code, checked) =>
              handleChangeCheckLayer(code, checked)
            }
            handleChangeName={(code, name) => handleChangeName(code, name)}
            handleChangeOption={(code, option) =>
              handleChangeOption(code, option)
            }
          />
        ))}
      </div>

      <div className='btn-generate'>
        <Button onClick={handleClick}>Generate</Button>
      </div>

      <Radio.Group
        value={viewAsImages}
        onChange={(e) => setViewAsImages(e.target.value)}
        style={{ marginTop: 10 }}
      >
        <Radio.Button value='images'>View as Images</Radio.Button>
        <Radio.Button value='gifs'>View as Gifs</Radio.Button>
      </Radio.Group>

      <div className='images'>
        {viewAsImages === "images"
          ? images.map((item, id) => <img src={item} alt='' key={id} />)
          : gifs.map((item, id) => <img src={item} alt='' key={id} />)}
      </div>
    </div>
  );
}
