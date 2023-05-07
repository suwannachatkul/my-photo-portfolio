import { Suspense, useEffect, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import HomeBody from "../components/contents/Home/HomeBody";
import HomeTop from "../components/contents/Home/HomeTop";
import MapGallery from "../components/contents/Home/MapGallery";
import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";
import LoadingFullPage from "../components/UI/LoadingFullPage";


// dummy image list
const IMG_LIST = [
  {
    src: "/assets/images/DSC02733.png",
    title: "tohoku1",
    alt: "1",
    tags: ["Tohoku"],
  },
  {
    src: "/assets/images/portrait/DSC09007.png",
    title: "hokkaido2",
    alt: "2",
    tags: ["Hokkaido"],
  },
  {
    src: "/assets/images/DSC06441.png",
    title: "hokkaido3",
    alt: "3",
    tags: ["Hokkaido"],
  },
  {
    src: "/assets/images/portrait/DSC09007.png",
    title: "kanto4",
    alt: "4",
    tags: ["Kanto"],
  },
  {
    src: "/assets/images/DSC02733.png",
    title: "hokkaido5",
    alt: "5",
    tags: ["Hokkaido"],
  },
  // {img: '', name: '', Location: {Region: ''}, tag: []},
];

function HomePage() {
  const { loadData } = useLoaderData() as { loadData: [] };
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    // initial with at top true
    setIsAtTop(true);

    // set scroll event
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
  }, []);

  const loading = (
    <>
      <LoadingFullPage />
    </>
  );

  const mainContents = (
    <div className="fadeIn">
      <HomeTop />
      <HomeBody />
      <MapGallery imageList={IMG_LIST}/>
      <Footer />
    </div>
  );

  return (
    <>
      <Header isAtPageTop={isAtTop} />
      <Suspense fallback={loading}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            return mainContents;
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default HomePage;

async function loaderEvents() {
  //   const response = await fetch("http://localhost:8080/events");

  //   if (!response.ok) {
  //     throw json({ message: "Could not fetch events." }, { status: 500 });
  //   } else {
  //     // const resData = await response.json();
  //     const resData = await response.json();
  //     return resData.events
  //   }

  // dummy promise for simulate fetch
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
