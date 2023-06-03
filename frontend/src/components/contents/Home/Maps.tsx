import { Fragment, useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Point,
} from "react-simple-maps";

import {
  faLocationDot,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

import styles from "./Maps.module.css";

interface MapProps {
  onRegionClick: (region: string) => void;
  imgAllLoaded: boolean;
}

const Map = (props: MapProps) => {
  const [geoJson, setGeoJson] = useState<any | null>(null);
  const [regionClicked, setRegionClicked] = useState("");
  const [regionHover, setRegionHover] = useState("");
  const [showUnselect, setShowUnselect] = useState(false);

  // prevent geojson to unnecessary load
  useEffect(() => {
    setGeoJson("../../../assets/jp_region4.geojson");
  }, []);

  function clearRegionSelected() {
    if (props.imgAllLoaded && regionClicked !== "") {
      setRegionClicked("");
      props.onRegionClick("*");
      setShowUnselect(false);
    }
  }

  function handleClickRegion(
    e: React.MouseEvent<SVGPathElement, MouseEvent>,
    geo: any
  ) {
    if (!props.imgAllLoaded) {
      alert("Please wait until all image is Loaded")
      return;
    }
    setRegionClicked(geo["rsmKey"]);
    // set color for event that right click during animation cause color bug
    let target = e.target as SVGPathElement;
    target.style["fill"] = "#914040";
    const regionName =
      geo.properties.layer[0].toUpperCase() + geo.properties.layer.slice(1);
    props.onRegionClick(regionName);
    setShowUnselect(true);
  }

  function handleRightClickRegion(
    e: React.MouseEvent<SVGPathElement, MouseEvent>,
    geo: any
  ) {
    e.preventDefault();
    if (geo["rsmKey"] === regionClicked) {
      clearRegionSelected();
      let target = e.target as SVGPathElement;
      target.style["fill"] = "#fc6060";
      setRegionHover("");
    }
  }

  function mouseOverHandler(geo: any) {
    setRegionHover(geo["rsmKey"]);
  }

  function mouseOutHandler() {
    setRegionHover("");
  }

  return (
    <>
      <div className={styles.mainDiv}>
        <div className={styles["contact-area"]}>
          <div className="container d-flex justify-content-center">
            <div className="row">
              <div className="col-12">
                <h2>Checkout my photos across Japan!</h2>
                <p>Explore the map below to see my photos from each regions.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mapDiv}>
          <div
            style={{ position: "relative" }}
            className={`fadeIn ${!showUnselect && "d-none"}`}
          >
            <button className={styles.unselect} onClick={clearRegionSelected}>
              <FontAwesomeIcon icon={faSquareXmark} size="2xl" />
            </button>
          </div>

          <ComposableMap
            projection="geoMercator"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            onContextMenu={(e) => {
              e.preventDefault();
              clearRegionSelected();
            }}
          >
            <ZoomableGroup
              center={[138, 38.7]} // JP center
              zoom={10}
              maxZoom={10}
              minZoom={10}
              translateExtent={[
                [740, 160],
                [800, 230],
              ]}
            >
              <Geographies geography={geoJson}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const selectedRegion = regionClicked === geo.rsmKey;
                    const hoveredRegion = regionHover === geo.rsmKey;

                    // first letter upper case
                    const regionName =
                      geo.properties.layer[0].toUpperCase() +
                      geo.properties.layer.slice(1);

                    // marker position from coord always shift a bit
                    // modified market position little bit to make it center
                    const markerPos = [
                      geo.properties.centroids[0] - 0.55,
                      geo.properties.centroids[1] + 0.8,
                    ] as Point;

                    // do geo animate when selected
                    const geoAnimateClass = selectedRegion
                      ? styles.geoAnimate
                      : "";

                    // do marker animate when selected or hover
                    const markerAnimateClass =
                      hoveredRegion || selectedRegion
                        ? styles.markerAnimate
                        : "";
                    return (
                      <Fragment key={geo.rsmKey}>
                        <Geography
                          className={geoAnimateClass}
                          geography={geo}
                          fill={selectedRegion ? "#914040" : "#fc6060"}
                          stroke="#F5F5F5"
                          strokeWidth="0.1"
                          onClick={(e) => handleClickRegion(e, geo)}
                          onContextMenu={(e) => handleRightClickRegion(e, geo)}
                          onMouseOver={() => mouseOverHandler(geo)}
                          onMouseOut={mouseOutHandler}
                          style={{
                            hover: {
                              fill: "#914040",
                              transform: "translate(-0.025%, -0.025%)",
                              zIndex: "10",
                            },
                          }}
                        />
                        <Marker coordinates={markerPos}>
                          <g
                            className={`${styles.marker}  ${markerAnimateClass}`}
                          >
                            <g transform="scale(0.004)">
                              <FontAwesomeIcon
                                icon={faLocationDot}
                                style={{ color: "#2C394B" }}
                              />
                            </g>
                            <text
                              textAnchor="middle"
                              fill="#2C394B"
                              fontWeight="bold"
                              transform="translate(1.5 -0.5) scale(0.1)"
                            >
                              {regionName}
                            </text>
                          </g>
                        </Marker>
                      </Fragment>
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </>
  );
};

export default Map;
