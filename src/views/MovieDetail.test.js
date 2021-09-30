import React from 'react';
import { shallow } from 'enzyme';
import MovieDetail from './MovieDetail';
describe("MovieDetail", () => {
  it("should render MovieDetail", () => {
    const wrapper = shallow(<MovieDetail />);
  });
});