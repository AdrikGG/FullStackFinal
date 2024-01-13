import PropTypes from 'prop-types';
import React, { useRef, useEffect, useCallback } from 'react';
import Datamaps from 'datamaps';

const Datamap = (props) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const drawMap = useCallback(() => {
    const { data, updateChoroplethOptions, ...restProps } = props;

    mapRef.current = new Datamaps({
      ...restProps,
      scope: 'world',
      projection: 'mercator',
      geographyConfig: {
        highlightFillColor: '#FFFFFF',
        highlightOnHover: true
      },
      fills: {
        defaultFill: '#919191'
      },
      data,
      element: mapContainerRef.current
    });

    if (updateChoroplethOptions) {
      mapRef.current.updateChoropleth(data, updateChoroplethOptions);
    }
  }, [props]);

  useEffect(() => {
    const resizeMap = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };

    window.addEventListener('resize', resizeMap);

    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, []);

  useEffect(() => {
    clear();
    drawMap();
  }, [props, drawMap]);

  const clear = () => {
    const { current: container } = mapContainerRef;

    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  };

  const style = {
    padding: 0,
    height: '100%',
    width: '90%',
    // overflow: 'hidden',
    ...(props.style || {})
  };

  return <div ref={mapContainerRef} style={style} />;
};

Datamap.propTypes = {
  data: PropTypes.object,
  height: PropTypes.any,
  responsive: PropTypes.bool,
  style: PropTypes.object,
  updateChoroplethOptions: PropTypes.object,
  width: PropTypes.any
};

export default Datamap;
