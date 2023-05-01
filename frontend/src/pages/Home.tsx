import { Suspense, useEffect, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import HomeBody from "../components/contents/Home/HomeBody";
import HomeTop from "../components/contents/Home/HomeTop";
import MapGallery from "../components/contents/Home/MapGallery";
import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";
import LoadingFullPage from "../components/UI/LoadingFullPage";


function HomePage() {
  const { loadData } = useLoaderData() as { loadData: [] };
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
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
      <MapGallery />
      <Footer />
    </div>
  );

  return (
    <>
      <Header isAtPageTop={isAtTop} />
      <Suspense fallback={loading}>
        <Await resolve={loadData}>
          {(loadedEvents) => {
            setIsAtTop(true)
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
