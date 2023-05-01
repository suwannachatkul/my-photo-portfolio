import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Transition } from "react-transition-group";

import "./IsotopeItems.css";

// dummy image list
const IMG_LIST = [
  {
    img: "/assets/images/DSC02733.png",
    name: "1",
    Location: { Region: "Tohoku" },
    tag: [],
  },
  {
    img: "/assets/images/portrait/DSC09007.png",
    name: "2",
    Location: { Region: "Hokkaido" },
    tag: [],
  },
  {
    img: "/assets/images/DSC06441.png",
    name: "3",
    Location: { Region: "Hokkaido" },
    tag: [],
  },
  {
    img: "/assets/images/portrait/DSC09007.png",
    name: "4",
    Location: { Region: "Kanto" },
    tag: [],
  },
  {
    img: "/assets/images/DSC02733.png",
    name: "5",
    Location: { Region: "Hokkaido" },
    tag: [],
  },
  // {img: '', name: '', Location: {Region: ''}, tag: []},
];

interface IIsotopeItemsProps {
  isotopeContainerClass: string;
  isotopeItemClass: string;
  selectionHandle: (name: string) => void;
  divRef: React.RefObject<HTMLDivElement>;
}

export interface clickItemHandle {
  clickItemHandle: (name: string) => void;
}

const IsotopeItems = forwardRef((props: IIsotopeItemsProps, ref) => {
  const [selection, setSelection] = useState("*");
  const [inProp, setInProp] = useState(false);

  // set InProp for fadeIn transition text when selection change
  useEffect(() => {
    setInProp(true);
  }, [selection]);

  function clickItemHandle(name: string) {
    setSelection(name);
    setInProp(false);
  }

  useImperativeHandle(ref, () => ({
    clickItemHandle,
  }));

  const transitionStyles: {
    [id: string]: { class: string };
  } = {
    entering: { class: "my-node-enter" },
    entered: { class: "my-node-enter-active active" },
    exiting: { class: "my-node-exit active" },
    exited: { class: "my-node-exit-active" },
  };

  return (
    <div ref={props.divRef} className="section-padding-80 clearfix">
      <div className="container-fluid">
        <div className="row col-12 m-auto">
          <div className="filter-selection-menu">
            <div className="portfolio-menu">
              <p className="show-select">
                Region:
                <Transition in={inProp} timeout={300}>
                  {(state) => (
                    <span
                      className={transitionStyles[state].class}
                    >
                      {selection === "*" ? "All" : selection}
                    </span>
                  )}
                </Transition>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`row ${props.isotopeContainerClass} mx-lg-5 mx-md-1 imgContainer`}
        >
          {IMG_LIST.map((imgItem) => (
            <div
              className={`col-12 col-sm-6 col-lg-3 single_gallery_item ${imgItem.Location.Region} mb-3 fadeInUp`}
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
          ))}
        </div>
      </div>
    </div>
  );
});

export default IsotopeItems;
