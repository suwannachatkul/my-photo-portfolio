import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Transition } from "react-transition-group";

import { GalleryItem } from "../../../util/formatting";
import "./IsotopeItems.css";

interface IIsotopeItemsProps {
  imageList: GalleryItem[];
  isotopeContainerClass: string;
  isotopeItemClass: string;
  selectionHandle: (name: string) => void;
  divRef: React.RefObject<HTMLDivElement>;
  onImgClick: (imgIndex: number) => void;
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
    if (selection !== name){
      setSelection(name);
      setInProp(false);
    }
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
                    <span className={transitionStyles[state].class}>
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
          {props.imageList.map((imgItem, index) => {
            let classTag = "";
            imgItem.tags?.forEach((tag) => {
              classTag += " " + tag;
            });
            return (
              <div
                className={`col-12 col-sm-6 col-lg-3 single_gallery_item ${classTag} mb-3 fadeInUp`}
                key={index}
              >
                <div className="single-portfolio-content">
                  <img src={imgItem.src} alt={imgItem.alt} />
                  <div className="hover-content">
                    <a
                      href="#image"
                      className="portfolio-img"
                      onClick={() => props.onImgClick(index)}
                    >
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
  );
});

export default IsotopeItems;
