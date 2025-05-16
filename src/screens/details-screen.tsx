import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = ({route}: Props) => {
  const {version} = route.params;
  const info = version.info;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{info.title}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{info.description}</Text>

      <Text style={styles.label}>Base URL:</Text>
      <Text style={styles.text}>{version.swaggerUrl || 'N/A'}</Text>

      <Text style={styles.label}>Contact Info:</Text>
      {!info?.contact && <Text style={styles.text}>N/A</Text>}
      {info.contact?.name && (
        <Text style={styles.text}>Name: {info.contact.name}</Text>
      )}
      {info.contact?.email && (
        <Text style={styles.text}>Email: {info.contact.email}</Text>
      )}
      {info.contact?.url && (
        <Text style={styles.text}>Website: {info.contact.url}</Text>
      )}
      {info.contact?.['x-twitter'] && (
        <Text style={styles.text}>Twitter: {info.contact['x-twitter']}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Visit Docs"
          onPress={() => Linking.openURL(version.link)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  label: {
    fontWeight: '600',
    marginTop: hp('2%'),
    fontSize: wp('4.5%'),
  },
  text: {
    fontSize: wp('4%'),
    marginTop: hp('0.8%'),
    color: '#555',
  },
  buttonContainer: {
    marginTop: hp('3%'),
    width: '100%',
  },
});
