import React from 'react';
import { shallow } from 'enzyme';
import Movies from './Movies';
describe("Movies", () => {
  it("should render Movies", () => {
    const wrapper = shallow(<Movies />);
  });
});