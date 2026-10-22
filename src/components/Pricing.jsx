import React from 'react';
import StartProject from './StartProject';

/**
 * Pricing component backwards-compatibility wrapper.
 * The public pricing cards have been replaced with the dedicated Project Enquiry Experience.
 */
export default function Pricing(props) {
  return <StartProject {...props} />;
}
