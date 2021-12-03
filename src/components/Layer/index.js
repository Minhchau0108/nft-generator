import React from "react";
import { Switch, Slider, Select, Button } from "antd";

const MODE_OPTION = [
  "source-over",
  "source-in",
  "source-out",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
];
const LAYERS_EYES = [
  "Background",
  "Eyeball",
  "Eye color",
  "Iris",
  "Shine",
  "Bottom lid",
  "Top lid",
  "Goo",
];
const LAYERS = ["Background", "Brow", "Eye", "Hair", "Head", "Mouth", "Nose"];

const Layer = ({
  code,
  layer,
  handleChange,
  handleChangeOption,
  handleChangeName,
  deleteLayer,
}) => {
  const { Option } = Select;
  const handleSelectNameLayer = (value) => {
    console.log(value);
    handleChangeName(code, value);
  };
  const handleChangeOpacity = (value) => {
    const newOption = { blend: layer.options?.blend, opacity: value };
    handleChangeOption(code, newOption);
  };
  const handleSelectBlendMode = (value) => {
    const newOption = { blend: value, opacity: layer.options?.opacity };
    handleChangeOption(code, newOption);
  };
  return (
    <div className='layer'>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select
          showSearch
          style={{ width: 200, backgroundColor: "#f2f2f2" }}
          placeholder='Select layer'
          onChange={handleSelectNameLayer}
        >
          {LAYERS.map((item, idx) => (
            <Option value={item} key={`layer-${idx}`}>
              {item}
            </Option>
          ))}
        </Select>

        <Switch
          checked={layer?.checked}
          onChange={(value) => {
            handleChange(code, value);
          }}
          style={{ marginLeft: 20 }}
          checkedChildren='On'
          unCheckedChildren='Off'
        />
        <Button
          shape='circle'
          style={{ margin: "-5px -5px 0 30px", alignSelf: "flex-start" }}
          size='small'
          onClick={() => deleteLayer()}
        >
          X
        </Button>
      </div>

      <div style={{ marginTop: 10 }}>
        {layer?.checked && (
          <>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select blend mode'
              onChange={handleSelectBlendMode}
            >
              {MODE_OPTION.map((item, idx) => (
                <Option value={item} key={`blend-${idx}`}>
                  {item}
                </Option>
              ))}
            </Select>
            <h4>Opacity</h4>
            <Slider
              defaultValue={1}
              disabled={false}
              marks={{ 0: "0", 1: "1" }}
              min={0}
              max={1}
              step={0.01}
              onChange={(value) => {
                handleChangeOpacity(value);
              }}
              style={{ width: "200px" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Layer;
