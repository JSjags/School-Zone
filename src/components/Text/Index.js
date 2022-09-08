import { useState } from "react";
import { TextWrapper } from "./Text.styles";

const Text = ({ value, setFormData, name }) => {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => {
      if (name === "schoolSlug" || name === "deletePhrase") {
        return e.target.value;
      } else if (name === "title" || name === "author") {
        return {
          ...prev,
          [name]: e.target.value,
        };
      } else {
        return {
          ...prev,
          [e.target.name]: {
            value: e.target.value,
            type: prev[e.target.name].type,
          },
        };
      }
    });
  };

  return (
    <>
      <TextWrapper
        placeholder={name[0].toUpperCase() + name.slice(1)}
        name={name}
        value={value}
        onChange={(e) => {
          setText(e.target.value);
          handleChange(e);
        }}
      />
    </>
  );
};

export default Text;
