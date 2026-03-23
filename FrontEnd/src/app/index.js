import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabs from '../navigation/BottomTabs';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomTabs />
        </GestureHandlerRootView>
    );
}
