import { Suspense, lazy } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import LoadingFullPage from "../components/UI/LoadingFullPage";
import { GalleryItem, ImgResponseToGalleryItem } from "../shared/util/formatting";
import imageApi from "../shared/util/image_api";

const HomeMain = lazy(() => import("../components/contents/Home/HomeMain"));

// dummy image list
const IMG_LIST: GalleryItem[] = [
  {
    id: 1,
    src: "/assets/images/DSC02733.png",
    title: "tohoku1",
    alt: "1",
    tags: ["Tohoku"],
    description: "",
  },
  {
    id: 1,
    src: "/assets/images/portrait/DSC09007.png",
    title: "hokkaido2",
    alt: "2",
    tags: ["Hokkaido"],
    description: "",
  },
  {
    id: 1,
    src: "/assets/images/DSC06441.png",
    title: "hokkaido3",
    alt: "3",
    tags: ["Hokkaido"],
    description: "",
  },
  {
    id: 1,
    src: "/assets/images/portrait/DSC07731.png",
    title: "kanto4",
    alt: "4",
    tags: ["Kanto"],
    description: "",
  },
  {
    id: 1,
    src:  "/assets/images/portrait/DSC08148.png",
    title: "hokkaido5",
    alt: "5",
    tags: ["Hokkaido"],
    description: "",
  },
  {
    id: 1,
    src: "/assets/images/DSC07345.png",
    title: "hokkaido5",
    alt: "5",
    tags: ["Hokkaido"],
    description: "",
  },
];

function HomePage() {
  const { loadData } = useLoaderData() as { loadData: [] };

  return (
    <>
      <Suspense fallback={<LoadingFullPage />}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            console.log(loadedEvents);
            return (
              <div className="fadeIn">
                <HomeMain featureImgList={loadedEvents} mapImgList={IMG_LIST} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default HomePage;

async function loaderEvents() {
  const imgList = await imageApi("get", "/image/", "application/json", {
    tags: ["Featured"],
  });

  return ImgResponseToGalleryItem(imgList, "eager");
}

export function loader() {
  return defer({
    loadData: loaderEvents(),
  });
}
