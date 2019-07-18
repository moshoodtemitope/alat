import React, { } from 'react';
//import { render } from 'react-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick, TooltipRail } from './_slider.jsx'; // example render components

const sliderStyle = {
  // margin: '5%',
  position: 'relative',
  width: '100%',
  // background: '#AA2957',
  // borderRadius: '30px'
};

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 1,
  borderRadius: 60,
  cursor: 'pointer',
  background: '#393939'
};

const domain = [0, 24];

class SliderComponent extends React.Component {
   state = {
    values: [6]
  };

   onChange = (values) => {
    //this.setState({ values });
    this.props.onChange(values)
  };

  onUpdate =(values)=>{
    this.props.onUpdate(values);
  }

   render() {
    const {
      state: { values }
    } = this;

    return (
      <div style={{ height: 10, width: '100%' }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          onUpdate={this.onUpdate}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              
              <div style={railStyle} {...getRailProps()} />
              //   {/*  */}
              // //   {getRailProps => <TooltipRail {...getRailProps} />}
              //  </div>
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[0,24]}
                   // isActive={handle.id === activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={12}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default SliderComponent;

//render(<Example />, document.getElementById('root'));
