require('normalize.css');
require('styles/App.css');
require('rc-slider/assets/index.css');

import React from 'react';
import { SliderPicker } from 'react-color';
import { Grid, Row, Col, Input } from 'react-bootstrap';
import Slider from 'rc-slider';

const patterns = [
  { value: 0, label: 'Rainbow' },
  { value: 1, label: 'Rainbow with Glitter' },
  { value: 2, label: 'Confetti' },
  { value: 3, label: 'Sinelon' },
  { value: 4, label: 'Juggle' },
  { value: 5, label: 'Bpm' },
  { value: 6, label: 'Solid' },
  { value: 7, label: 'White' }
]

class AppComponent extends React.Component {

  sendUpdateRequest(variable, value) {
    const updateRequest = { var: variable, val: value };
    fetch("/handleRequest?params=" + JSON.stringify(updateRequest));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h1>Lighting Control</h1>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Input type="select" label="Lighting Pattern" onChange={(event) => this.sendUpdateRequest('gCurrentPatternNumber', event.target.value)}>
              {patterns.map((it) => <option key={it.value} value={it.value}>{it.label}</option>)}
            </Input>
          </Col>

          <Col md={2} mdOffset={1}>
            <label className='control-label'>Light Color</label>
            <SliderPicker type="slider" onChange={(color) => this.sendUpdateRequest('gHue', Math.ceil(color.hsl.h))}/>
          </Col>

          <Col md={2} mdOffset={1}>
             <Input type="checkbox" label="Rotate Hue" onChange={(event) => this.sendUpdateRequest('rotateHue', event.target.checked)}/>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <label className='control-label'>Brightness</label>
            <Slider min={0} max={255} onChange={ (value) => this.sendUpdateRequest('brightness', value) } />
          </Col>
        </Row>
      </Grid>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
