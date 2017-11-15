import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

import Title from '../Title';

function SideBar({ className, client, children }) {
  return (
    <div className={classNames(className, 'side-bar')}>
      <Title className="side-bar-title" client={client} />
      {children}
    </div>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
  client: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

SideBar.defaultProps = {
  className: '',
};

export default SideBar;
