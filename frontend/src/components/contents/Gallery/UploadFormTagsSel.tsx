import { useCallback, useEffect, useState } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import imageApi from "../../../shared/util/image_api";

export interface ITags {
  name: string;
  label: string;
}

interface ITagsSelProps {
  tagsValue: MultiValue<ITags>;
  setTagsValue: (tags: MultiValue<ITags>) => void;
}

const UploadFormTagsSel = (props: ITagsSelProps) => {
  const [options, setOptions] = useState<ITags[]>([]);

  const requestTagOption = useCallback(async () => {
    const tagData = await imageApi("get", "image/tags").catch((error) => {
      alert(`Tag get error \n ${error.status} ${error.message}`);
    });

    if (tagData) {
      setOptions(tagData);
    }
  }, []);

  useEffect(() => {
    requestTagOption();
  }, [requestTagOption]);

  const tagsChangehandler = (option: MultiValue<ITags>) => {
    props.setTagsValue(option);
  };

  const tagCreateHandler = (inputValue: string) => {
    const newOption = {
      name: inputValue,
      label: inputValue,
    };
    tagsChangehandler([...props.tagsValue, newOption]);
  };
  return (
    <CreatableSelect
      isMulti
      isClearable
      name="uploadImgTags"
      options={options}
      value={props.tagsValue}
      onChange={tagsChangehandler}
      onCreateOption={tagCreateHandler}
      className="p-0"
    />
  );
};

export default UploadFormTagsSel;
