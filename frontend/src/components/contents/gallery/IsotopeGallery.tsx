import { useState } from "react";

import "./IsotopeGallery.css";
import { CustomImgListType } from "../../UI/Lightbox";

const SELECTION_LIST = [
  { name: "All", filterName: "*" },
  { name: "Summer", filterName: "Summer" },
  { name: "Spring", filterName: "Spring" },
  { name: "Autumn", filterName: "Autumn" },
  { name: "Winter", filterName: "Winter" },
];


interface IIsotopeGalleryProps {
  imageList: CustomImgListType[];
  isotopeContainerClass: string;
  isotopeItemClass: string;
  selectionHandle: (name: string) => void;
  onImgClick: (imgIndex: number) => void
}

const IsotopeGallery = (props: IIsotopeGalleryProps) => {
  const [selection, setSelection] = useState("*");

  function clickItemHandle(name: string) {
    setSelection(name);
    props.selectionHandle(name);
  }

  return (
    <div className="section-padding">
      <div className="headerDiv my-5">
        <h1>
          <span className="color-add">G</span>allery
          <span className="color-add">.</span>
        </h1>
      </div>
      <div>
        <div className="container-fluid">
          <div className="row col-12 m-auto">
            <div className="filter-selection-menu">
              <div className="portfolio-menu text-center">
                {SELECTION_LIST.map((item) => (
                  <button
                    key={item.name}
                    className={`btn ${
                      selection === item.filterName && "active"
                    }`}
                    onClick={() => clickItemHandle(item.filterName)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`row ${props.isotopeContainerClass} mx-lg-5 mx-md-1 imgContainer`}
          >
            {props.imageList.map((imgItem, index) => {
              let classTag = ""
              imgItem.tags?.forEach(tag => {classTag += " " + tag});
              return (
                <div
                  className={`col-12 col-lg-6 col-xl-4 single_gallery_item ${classTag} mb-3 fadeInUp`}
                  key={imgItem.name}
                >
                  <div className="single-portfolio-content">
                    <img src={imgItem.src} alt={imgItem.name} />
                    <div className="hover-content">
                      <a href="#image" className="portfolio-img" onClick={() => props.onImgClick(index)}>
                        +
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsotopeGallery;
