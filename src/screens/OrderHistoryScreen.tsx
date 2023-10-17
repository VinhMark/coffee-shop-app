import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimated from '../components/EmptyListAnimated';
import PopupAnimation from '../components/PopupAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({navigation}: any) => {
  const {OrderHistoryList} = useStore((state: any) => state);
  const [showAnimation, setShowAnimation] = useState(false);

  const tabHeight = useBottomTabBarHeight();

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {index, id, type});
  };

  const handleDownload = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation && (
        <PopupAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/download.json')}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={[styles.innerView, {marginBottom: tabHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimated title="No Order History" />
            ) : (
              <View style={styles.listItemContainer}>
                {OrderHistoryList.map((data: any, index: number) => (
                  <OrderHistoryCard
                    key={index}
                    {...data}
                    navigationHandler={navigationHandler}
                  />
                ))}
              </View>
            )}
          </View>

          {OrderHistoryList.length > 0 && (
            <TouchableOpacity
              style={styles.buttonDownload}
              onPress={handleDownload}>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },
  lottieAnimation: {
    height: 250,
  },
  scroll: {
    flexGrow: 1,
  },
  innerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {},
  listItemContainer: {
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_30,
  },
  buttonDownload: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  downloadText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
