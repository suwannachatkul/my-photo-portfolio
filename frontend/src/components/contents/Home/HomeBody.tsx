import styles from "./HomeBody.module.css";

const IMG = "/assets/images/DSC04977.PNG";

const HomeBody = () => {
  return (
    <div className={styles["contact-area"]}>
        <div className="row">
          <div className="col-12 col-lg-6">
            <img src={IMG} alt="my_img" className={styles.myImg} />
          </div>
          <div className="col-12 col-lg-6 p-2 vertical-center ">
            <div className="row d-flex align-items-center h-100">
              <h2 className="myIntro">
                Hello there! <br />
                I'm Saran
              </h2>
              <span>
                <p>
                  I'm a software engineer currently residing is Tokyo, Japan
                  <br />
                </p>
                <p>
                  When I'm not busy coding, I love traveling, hiking, and
                  exploring new places. <br />
                  It was during my first hike in japan that I discovered my
                  love for landscape photography, and I've been hooked ever since.
                </p>
                <p>
                  While I use Adobe Lightroom to editing my photos, I always try
                  to keep them authentic as much as possible.
                </p>
                <p>
                  I'm still learning and refining my skills, <br />
                  either in codings or behind the lens and in the editing room...
                </p>
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomeBody;
