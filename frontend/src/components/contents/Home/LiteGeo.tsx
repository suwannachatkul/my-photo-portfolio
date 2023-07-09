import React, { useMemo } from "react";
import { Geography, GeographyProps } from "react-simple-maps";

interface customGeographyProps extends GeographyProps {
  changed: boolean; // props to indicate the need of update
}

const LiteGeography: React.FC<customGeographyProps> = (props) => {
  const memoGeo = useMemo(() => {
    const {changed, ...geoProps } = props
    return <Geography {...geoProps} />;
  }, [props.fill, props.className, props.changed]);

  return <>{memoGeo}</>;
};

export default LiteGeography;
