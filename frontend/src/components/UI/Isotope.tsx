/*
 * Create Base Isotope using isotope-layout for handle layout
 * This will handle Isotope setup for element and handling filter events
 * More info https://github.com/metafizzy/isotope
 */
import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";

interface IIsotopeProps extends Isotope.IsotopeOptions {
  elementSel: string;
}

export type filterChangeHandle = {
  filterChange: (key: string) => void;
};

const IsotopeComponent = forwardRef((props: IIsotopeProps, ref) => {
  // image loaded state
  const [imgLoadedEnd, setImgLoadedEnd] = useState(false);

  // init one ref to store the future isotope object
  const isotope = useRef<Isotope | null>();
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState("*");

  // initialize an Isotope object with configs
  // when image is loaded
  useEffect(() => {
    imagesLoaded(props.elementSel, () => {
      setImgLoadedEnd(true);
    });

    if (imgLoadedEnd) {
      const { elementSel, ...IsotopeOptions } = props;
      isotope.current = new Isotope(elementSel, IsotopeOptions);
    }

    // clear isotope id re-init
    return () => isotope.current?.destroy();
  }, [imgLoadedEnd, props]);

  // handling filter key change
  useEffect(() => {
    if (filterKey === "*") isotope.current?.arrange({ filter: `*` });
    else isotope.current?.arrange({ filter: `.${filterKey}` });
  }, [filterKey]);

  // handle for filterChange function by refs forward to upper component
  useImperativeHandle(ref, () => ({
    filterChange(key: string) {
      setFilterKey(key);
    },
  }));

  return <Fragment></Fragment>;
});

export default IsotopeComponent;
