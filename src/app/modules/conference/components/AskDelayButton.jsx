import React from 'react';
import { connect } from 'react-redux';

import { stateKeys } from '../constants';
import { askPeerDelay } from '../actions';

function AskDelayButton({ peerConnected, pushAskPeerDelay }) {
  return (
    <div>{
      peerConnected && <button onClick={() => pushAskPeerDelay()}>Ask Delay</button>
    }</div>
  );
}

const mapStateToProps = state => ({
  peerConnected: state.conference.get(stateKeys.peerConnected),
});

const mapDispatchToProps = dispatch => ({
  pushAskPeerDelay: () => dispatch(askPeerDelay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskDelayButton);
