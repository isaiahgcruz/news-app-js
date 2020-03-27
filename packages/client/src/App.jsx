import React from 'react';
import withNavbar from './hoc/withNavbar';
import Source from './components/Source';

const SourceWithNavbar = withNavbar(Source);

function App() {
  return <SourceWithNavbar />;
}

export default App;
