import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { CustomImgListType } from "../components/UI/Lightbox";
import LoadingFullPage from "../components/UI/LoadingFullPage";
import GalleryMain from "../components/contents/Gallery/GalleryMain";

const imageList: CustomImgListType[] = [
  {
    src: "/assets/images/DSC07744.png",
    alt: "1",
    loading: "lazy",
    title: "Tateyama Campground",
    description: "Autumn color on tateyama during September",
    tags: ["Chubu", "Tateyama", "Autumn"],
  },
  {
    src: "/assets/images/DSC04662-3.png",
    alt: "1",
    loading: "lazy",
    title: "Moddy Rebun",
    description: "Stunning view on Cape Sukai, Rebun",
    tags: ["Hokkaido", "Rebun", "Cape Sukai", "Autumn"],
  },
  {
    src: "/assets/images/DSC05072.png",
    alt: "2",
    loading: "lazy",
    title: "Sunsets at Cape Sukoton",
    description:
      "An incredible light shining on the wooden deck at Cape Sukoton, Rebun",
    tags: ["Hokkaido", "Rebun", "Cape Sukoton", "Sunset", "Autumn"],
  },
  {
    src: "/assets/images/DSC07366-2.png",
    alt: "3",
    loading: "lazy",
    title: "Divided",
    description:
      "Snap an interesting shot during sepacial train Resort Shirakami from Aomori to Akita",
    tags: ["Tohoku", "Aomori", "Winter"],
  },
];

// const IMG_LIST = [
//   {
//     img: "/assets/images/DSC02733.png",
//     name: "1",
//     Location: { Region: "Tohoku" },
//     tag: ["summer", "test"],
//   },
//   {
//     img: "/assets/images/portrait/DSC09007.png",
//     name: "2",
//     Location: { Region: "Hokkaido" },
//     tag: ["winter"],
//   },
//   {
//     img: "/assets/images/DSC06441.png",
//     name: "3",
//     Location: { Region: "Hokkaido" },
//     tag: ["autumn"],
//   },
//   {
//     img: "/assets/images/portrait/DSC09007.png",
//     name: "4",
//     Location: { Region: "Kanto" },
//     tag: ["summer"],
//   },
//   {
//     img: "/assets/images/DSC02733.png",
//     name: "5",
//     Location: { Region: "Hokkaido" },
//     tag: ["spring"],
//   },
//   // {img: '', name: '', Location: {Region: ''}, tag: []},
// ];

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
            return <GalleryMain imageList={imageList} />;
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
