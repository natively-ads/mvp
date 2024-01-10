import ContextHeader from '@/components/contextHeader';
import React from 'react';

export default function AdvertiserLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<React.Fragment>
			<ContextHeader
				message="Currently on the Advertiser view"
				linkTo="/publishers"
			/>
			{children}
		</React.Fragment>
	);
}
