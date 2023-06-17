import { useMemo, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { MultiValue } from "react-select";

import { faImages } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import imageApi from "../../../shared/util/image_api";
import PageHeader from "../../UI/PageHeader";
import styles from "./UploadForm.module.css";
import UploadFormTagsSel, { ITags } from "./UploadFormTagsSel";

const UploadForm = () => {
  const navigate = useNavigate();
  const selImgRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitleState] = useState("");
  const [description, setDescriptionState] = useState("");
  const [tagsValue, setTagsValue] = useState<MultiValue<ITags>>([]);
  const [selectedImage, setSelectedImage] = useState<
    Blob | MediaSource | null
  >();
  const [isSending, setIsSending] = useState(false);

  // This function will be triggered when the file field change
  const imageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      setSelectedImage(event.currentTarget.files[0]);
    }
  };

  const imgIconClickHandler = () => {
    selImgRef.current!.click();
  };

  // use memo to prevent re-render image when select image not change
  const showSelectedImg = useMemo(() => {
    return selectedImage ? (
      <div className={`${styles["img-div"]}`}>
        <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
      </div>
    ) : (
      <FontAwesomeIcon
        icon={faImages}
        size="2xl"
        className={styles["img-icon"]}
        onClick={imgIconClickHandler}
      />
    );
  }, [selectedImage]);

  const clearForms = () => {
    setTitleState("");
    setDescriptionState("");
    setTagsValue([]);
    setSelectedImage(null);
    selImgRef.current!.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select image");
      return;
    }

    const response = await imageApi(
      "post",
      "image/upload/",
      "multipart/form-data",
      {
        title: title,
        description: description,
        image: selectedImage,
        tags: tagsValue.map((tag) => tag.label),
      }
    ).catch(function (error) {
      alert("Upload Fail");
      setIsSending(false);
      return error;
    });

    if (response) {
      alert("Image Uploaded");
      clearForms();
    }
    setIsSending(false);
  };
  return (
    <div className={styles["upload-img-main"]}>
      <PageHeader parentPath="gallery" />
      <div className="container">
        <form
          name="uploadImg"
          className="col-lg-12 row justify-content-center"
          onSubmit={handleSubmit}
        >
          {/* left half */}
          <div className="col-lg-6">
            <div className="row form-group mb-1">
              <label className="my-2" htmlFor="title">
                Image Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={styles["form-control"]}
                placeholder="Title Name"
                required
                onChange={(event) => setTitleState(event.target.value)}
                value={title}
              />
            </div>
            <div className="row form-group mb-1">
              <label className="my-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                className={styles["form-control"]}
                placeholder="Description"
                required
                onChange={(event) => setDescriptionState(event.target.value)}
                value={description}
              />
            </div>
            <div className={`${styles["tag-select"]} row form-group mb-1`}>
              <label className="my-2">Tags</label>
              <UploadFormTagsSel
                tagsValue={tagsValue}
                setTagsValue={setTagsValue}
              />
            </div>
          </div>

          {/* right half */}
          <div className="col-lg-6">
            <div className="container h-100">
              <input
                accept="image/*"
                type="file"
                className={styles["img-sel-button"]}
                ref={selImgRef}
                onChange={imageChange}
              />
              <div className={styles["upload-div"]}>{showSelectedImg}</div>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-lg-12">
            <button
              className={`btn btn-lg ${styles["submit-button"]} mx-4`}
              disabled={isSending}
            >
              {isSending ? (
                <Spinner animation="grow" role="status" size="sm" />
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              className={`btn btn-lg ${styles["cancel-button"]} mx-4`}
              onClick={() => navigate("..")}
              disabled={isSending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
