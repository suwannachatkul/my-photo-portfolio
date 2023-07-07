import { Suspense, lazy } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import LoadingFullPage from "../components/UI/LoadingFullPage";
import { ImgResponseToGalleryItem } from "../shared/util/formatting";
import imageApi from "../shared/util/image_api";

const HomeMain = lazy(() => import("../components/contents/Home/HomeMain"));

function HomePage() {
  const { loadData } = useLoaderData() as { loadData: [] };

  return (
    <>
      <Suspense fallback={<LoadingFullPage />}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            return (
              <div className="fadeIn">
                <HomeMain
                  featureImgList={loadedEvents.featured}
                  mapImgList={loadedEvents.mapImg}
                />
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
  const featuredImgList = await imageApi("get", "image/", "application/json", {
    tags: ["Featured"],
  });

  const mapImgList = await imageApi("get", "image/", "application/json", {
    tags: [
      "Hokkaido",
      "Tohoku",
      "Kanto",
      "Chubu",
      "Kansai",
      "Chugoku",
      "Shikoku",
      "Kyushu",
    ],
    random: true,
    limit: 30,
  });

  return {
    featured: ImgResponseToGalleryItem(featuredImgList, "eager"),
    mapImg: ImgResponseToGalleryItem(mapImgList),
  };
}

export function loader() {
  return defer({
    loadData: loaderEvents(),
  });
}
