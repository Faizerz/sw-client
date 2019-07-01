import React from 'react';
import { Container } from 'reactstrap';

const App = ({ children }) => (
	<div className={'App'}>
		<Container className={'pt-5'}>
			{children}
		</Container>
	</div>
);

export default App;
