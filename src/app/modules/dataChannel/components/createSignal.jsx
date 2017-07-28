import React from 'react';
import Signal from './Signal';

export default function createSignal(status) {
  return () => <Signal className="signal" status={status} />;
}
