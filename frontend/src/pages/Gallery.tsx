import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import LoadingFullPage from "../components/UI/LoadingFullPage";
import GalleryMain from "../components/contents/Gallery/GalleryMain";
import { ImgResponseToGalleryItem } from "../shared/util/formatting";
import imageApi from "../shared/util/image_api";


const GalleryPage = () => {
  const { loadData } = useLoaderData() as { loadData: [] };

  const loading = (
    <>
      <LoadingFullPage />
    </>
  );
  return (
    <>
      <Suspense fallback={loading}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            return <GalleryMain imageList={loadedEvents} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default GalleryPage;

async function loaderEvents() {
  const imgList = await imageApi("get", "image/", "application/json", {random: false});
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

  return ImgResponseToGalleryItem(imgList);
}

export function loader() {
  return defer({
    loadData: loaderEvents(),
  });
}
