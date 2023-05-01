import { useState } from "react";

import "./IsotopeItems.css";

const SELECTION_LIST = [
  { name: "All", filterName: "*" },
  { name: "Summer", filterName: "summer" },
  { name: "Spring", filterName: "spring" },
  { name: "Autumn", filterName: "autumn" },
  { name: "Winter", filterName: "winter" },
];

const IMG_LIST = [
  {
    img: "/assets/images/DSC02733.png",
    name: "1",
    Location: { Region: "Tohoku" },
    tag: ["summer", "test"],
  },
  {
    img: "/assets/images/portrait/DSC09007.png",
    name: "2",
    Location: { Region: "Hokkaido" },
    tag: ["winter"],
  },
  {
    img: "/assets/images/DSC06441.png",
    name: "3",
    Location: { Region: "Hokkaido" },
    tag: ["autumn"],
  },
  {
    img: "/assets/images/portrait/DSC09007.png",
    name: "4",
    Location: { Region: "Kanto" },
    tag: ["summer"],
  },
  {
    img: "/assets/images/DSC02733.png",
    name: "5",
    Location: { Region: "Hokkaido" },
    tag: ["spring"],
  },
  // {img: '', name: '', Location: {Region: ''}, tag: []},
];

interface IIsotopeItemsProps {
  isotopeContainerClass: string;
  isotopeItemClass: string;
  selectionHandle: (name: string) => void;
}

export interface clickItemHandle {
  clickItemHandle: (name: string) => void;
}

const IsotopeItems = (props: IIsotopeItemsProps) => {
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
            {IMG_LIST.map((imgItem) => {
              let classTag = ""
              imgItem.tag.forEach(tag => {classTag += " " + tag});
              return (
                <div
                  className={`col-12 col-sm-6 col-lg-3 single_gallery_item ${classTag} mb-3 fadeInUp`}
                  key={imgItem.name}
                >
                  <div className="single-portfolio-content">
                    <img src={imgItem.img} alt={imgItem.name} />
                    <div className="hover-content">
                      <a href="#image" className="portfolio-img">
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

export default IsotopeItems;
