import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";

const DUMMY_TAGS = [
  { name: "green", label: "Green" },
  { name: "forest", label: "Forest" },
  { name: "slate", label: "Slate" },
  { name: "silver", label: "Silver" },
];

export interface ITags {
  name: string;
  label: string;
}

interface ITagsSelProps {
  tagsValue: MultiValue<ITags>;
  setTagsValue: (tags: MultiValue<ITags>) => void;
}

const UploadFormTagsSel = (props: ITagsSelProps) => {
  const [options, setOptions] = useState<ITags[]>(DUMMY_TAGS);

  // TODO use effect get request tags and set Options

  const tagsChangehandler = (option: MultiValue<ITags>) => {
    props.setTagsValue(option);
    console.log(props.tagsValue);
  };

  const tagCreateHandler = (inputValue: string) => {
    const newOption = {
      name: inputValue,
      label: inputValue,
    };
    tagsChangehandler([...props.tagsValue, newOption])
  };
  return (
    <CreatableSelect
      isMulti
      isClearable
      name="uploadImgTags"
      options={options}
      value={props.tagsValue}
      getOptionValue={(option) => option.name}
      onChange={tagsChangehandler}
      onCreateOption={tagCreateHandler}
      className="p-0"
    />
  );
};

export default UploadFormTagsSel;
