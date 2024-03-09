import type { ReactNode } from 'react';
import LoaderKit from 'react-native-loader-kit';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import type { PersistGateProps } from 'redux-persist/integration/react';

type ScreenLoader = {
	(props: PersistGateProps | Readonly<PersistGateProps>, context: any): ReactNode;
};

const ScreenLoader: ScreenLoader = () => {
	return (
		<View style={{ alignSelf: 'stretch', height: '100%' }}>
			<LoaderKit
				style={{ width: '50%', height: '75%', alignSelf: 'center' }}
				name={'BallClipRotatePulse'}
				color={'#9c080b'}
			/>
		</View>
	);
};

export default ScreenLoader;
