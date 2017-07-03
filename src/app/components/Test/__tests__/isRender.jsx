import React from 'react';
import { shallow } from 'enzyme';
import Test from '../index';

it(`${Test.name}: renders without crashing`, () => {
  const wrapper = shallow(
    <Test count={0} onClick={() => {}} />,
  );
});
