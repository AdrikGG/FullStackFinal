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
    width: PropTypes.any,
  };

  // Resize of map and construct it
  constructor(props) {
    super(props);
    this.resizeMap = this.resizeMap.bind(this);

    // Create a ref using createRef
    this.container = React.createRef();
  }

  // Verify components are mounting per react
  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.resizeMap);
    }

    // Create the Datamaps object in the constructor
    this.map = new Datamaps({
      ...this.props,
      scope: 'world',
      projection: 'mercator',
      geographyConfig: {
        highlightOnHover: false,
      },
      fills: {
        defaultFill: '#919191',
      },
      data: this.props.data,
      element: this.container.current,
    });

    this.drawMap();
  }

  // Make sure new properties are being passed in
  componentWillReceiveProps(newProps) {
    if (propChangeRequiresMapClear(this.props, newProps)) {
      this.clear();
    }
  }

  // Draw the map
  componentDidUpdate() {
    this.drawMap();
  }

  // Unmount the map as needed
  componentWillUnmount() {
    this.clear();
    if (this.props.responsive) {
      window.removeEventListener('resize', this.resizeMap);
    }
  }

  // Clear any containers/arrays
  clear() {
    // Use the current property of the container ref to access the DOM element
    const container = this.container.current;

    for (const child of Array.from(container.childNodes)) {
      container.removeChild(child);
    }

    delete this.map;
  }

  // Draw the map onto the screen
  drawMap() {
    const { data, updateChoroplethOptions } = this.props;

    // Use the existing map object to update the data and options
    this.map.updateChoropleth(data, updateChoroplethOptions);
  }

  // Resize of map
  resizeMap() {
    this.map.resize();
  }

  // Render
  render() {
    const style = {
      height: '100%',
      position: 'relative',
      width: '100%',
      ...this.props.style,
    };

    // Use the ref attribute to assign the ref to the container DOM element
    return <div ref={this.container} style={style} />;
  }
}
