import { Suspense, useRef } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import IsotopeItems from "../components/contents/gallery/IsotopeItems";
import Header from "../components/UI/Header";
import IsotopeComponent, { filterChangeHandle } from "../components/UI/Isotope";
import LoadingFullPage from "../components/UI/LoadingFullPage";

const GalleryPage = () => {
  const { loadData } = useLoaderData() as { loadData: [] };
  const isoTopeRef = useRef<filterChangeHandle>(null);

  const selectionClickHandle = (name: string) => {
    isoTopeRef.current!.filterChange(name);
  };

  const isotopeContainerClass = "photoList";
  const isotopeItemClass = "single_gallery_item";

  const loading = (
    <>
      <LoadingFullPage />
    </>
  );
  return (
    <>
      <Header />
      <Suspense fallback={loading}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            return (
              <div className="fadeIn">
                <IsotopeItems
                  isotopeContainerClass={isotopeContainerClass}
                  isotopeItemClass={isotopeItemClass}
                  selectionHandle={selectionClickHandle}
                />
                <IsotopeComponent
                  ref={isoTopeRef}
                  elementSel=".photoList"
                  itemSelector=".single_gallery_item"
                  percentPosition={true}
                  masonry={{
                    columnWidth: ".single_gallery_item",
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
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default GalleryPage;

async function loaderEvents() {
  //   const response = await fetch("http://localhost:8080/events");

  //   if (!response.ok) {
  //     throw json({ message: "Could not fetch events." }, { status: 500 });
  //   } else {
  //     // const resData = await response.json();
  //     const resData = await response.json();
  //     return resData.events
  //   }

  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
  return true;
}

export function loader() {
  return defer({
    loadData: loaderEvents(),
  });
}
