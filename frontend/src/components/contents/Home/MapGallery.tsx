import { useRef } from "react";
import IsotopeComponent from "../../UI/Isotope";
import { filterChangeHandle } from "../../UI/Isotope";
import { clickItemHandle } from "./IsotopeItems";
import IsotopeItems from "./IsotopeItems";
import Map from "./Maps";



const MapGallery = () => {
  const isoTopeRef = useRef<filterChangeHandle>(null);
  const isotopeItemRef = useRef<clickItemHandle>(null);
  const divRef = useRef<HTMLDivElement>(null)

  const selectionClickHandle = (name: string) => {
    const { top } = divRef.current!.getBoundingClientRect();
    window.scrollTo({
      top: window.pageYOffset + top - 40,
      behavior: "smooth",
    });

    isoTopeRef.current!.filterChange(name);
    isotopeItemRef.current!.clickItemHandle(name)
  };

  const isotopeContainerClass = "photoList"
  const isotopeItemClass = "single_gallery_item"

  return (
    <>
      <Map onRegionClick={selectionClickHandle} />
      <IsotopeItems ref={isotopeItemRef} divRef={divRef} isotopeContainerClass={isotopeContainerClass} isotopeItemClass={isotopeItemClass} selectionHandle={selectionClickHandle}/>
      <IsotopeComponent
        ref={isoTopeRef}
        elementSel={"." + isotopeContainerClass}
        itemSelector={"." + isotopeItemClass}
        percentPosition={true}
        masonry={{
          columnWidth: "." + isotopeItemClass,
        }}
        stagger={30}
        hiddenStyle={{
          opacity: 0,
        }}
        visibleStyle={{
          opacity: 1,
        }}
        transitionDuration="0.5s"
      />
    </>
  );
};

export default MapGallery;
