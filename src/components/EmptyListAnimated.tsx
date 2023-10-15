import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

interface EmptyListAnimatedProps {
  title: string;
}

const EmptyListAnimated: React.FC<EmptyListAnimatedProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <LottieView
          style={styles.lottie}
          source={require('../lottie/coffeecup.json')}
          autoPlay
          loop
        />
        <Text style={styles.lottieText}>{title}</Text>
      </View>
    </View>
  );
};

export default EmptyListAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: 300,
    height: 350,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderRadius: BORDERRADIUS.radius_15,
  },
  lottie: {
    height: 300,
  },

  lottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    alignSelf: 'center',
  },
});
