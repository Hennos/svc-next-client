import React from 'react';
import { mount } from 'enzyme';
import Signal from '../Signal';

it(`${Signal.name}: renders without crashing`, () => {
  const wrapper = mount(
    <Signal className="signal" status="awaiting" />,
  );
  console.log(wrapper.debug());
});
