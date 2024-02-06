import { render, screen } from '@testing-library/react';

import Footer from '/Users/mandywong/Documents/Ascending_Notes/client/src/components/footer/Footer.jsx';

describe('The Footer Component', () => {
	it('it should contain note from University of Helsinki', () => {
		render(
				<Footer />
		);
		expect(screen.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeInTheDocument();
	});
});


