import PropTypes from 'prop-types';
import React from 'react';
import Datamaps from 'datamaps';

const MAP_CLEARING_PROPS = ['height', 'scope', 'setProjection', 'width'];

const propChangeRequiresMapClear = (oldProps, newProps) => {
  return MAP_CLEARING_PROPS.some((key) => oldProps[key] !== newProps[key]);
};

export default class Datamap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    height: PropTypes.any,
    responsive: PropTypes.bool,
    style: PropTypes.object,
    updateChoroplethOptions: PropTypes.object,
    width: PropTypes.any
  };

  //Resize of map and construct it
  constructor(props) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);
  }

    //Verify components are mounting per react
  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap);
    }
    this.drawMap();
  }

  // Make sure new properties are being passed in
  componentWillReceiveProps(newProps) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear();
    }
  }

  //Draw the map
  componentDidUpdate() {
    this.drawMap();
  }

  //Unmount the map as needed
  componentWillUnmount() {
    this.clear();
    if (this.props.responsive) {
      window.removeEventListener('resize', this.resizeMap);
    }
  }

  //Clear any containers/arrays
  clear() {
    const { container } = this.refs;

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

    delete this.map;
  }

  // Draw the map onto the screen
  drawMap() {
    const { data, updateChoroplethOptions, ...props } = this.props;

    let map = this.map;

    if (!map) {
      map = this.map = new Datamaps({
        ...props,
        scope: 'world',
        projection: 'mercator',
        geographyConfig: {
          highlightOnHover: false
        },
        fills: {
          defaultFill: '#919191',
          farthest: '#540600',
          far: '#963f0c',
          close: '#dbb21f',
          closest: '#bad90d',
          correct: 'green'
        },
        data,
        element: this.refs.container
      });
    } else {
      map.updateChoropleth(data, updateChoroplethOptions);
    }
  }

  //Resize of map
  resizeMap() {
    this.map.resize();
  }

  //Render
  render() {
    const style = {
      height: '100%',
      position: 'relative',
      width: '100%',
      ...this.props.style
    };

    return <div ref="container" style={style} />;
  }
}
