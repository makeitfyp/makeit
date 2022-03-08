import React from 'react';
import Proptypes from 'prop-types';
import './Select.scss';

const Select = (props) => (
  <select >
    {
        }
  </select>
)
Select.propTypes = {
  value: Proptypes.number,
  handler: Proptypes.func,
  name: Proptypes.string,
  className: Proptypes.string,
  options: Proptypes.array
}
export default Select;
