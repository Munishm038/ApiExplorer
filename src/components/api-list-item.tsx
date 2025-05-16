import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {shortenDescription} from '../utils/shorten-description';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  title: string;
  description: string;
  onPress: () => void;
};

export const ApiListItem = ({title, description, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{shortenDescription(description)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    marginBottom: hp('0.5%'),
  },
  desc: {
    fontSize: wp('3.8%'),
    color: '#666',
  },
});
