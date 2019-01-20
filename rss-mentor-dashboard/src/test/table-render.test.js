import React from 'react';
import { shallow } from 'enzyme';
import Table from '../components/table';

it('should render a table', () => {
  const mentorName = 'MikhailLU';
  const table = shallow(<Table mentorName={mentorName}/>);
  expect(table).toMatchSnapshot();
});

