import React from 'react';
import {View} from 'react-native';
import {AppNavigator} from './src/navigation/app-navigator';

function App(): React.JSX.Element {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <AppNavigator />
    </View>
  );
}

export default App;
