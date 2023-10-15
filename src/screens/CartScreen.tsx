import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimated from '../components/EmptyListAnimated';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation}: any) => {
  const {
    CartList,
    CartPrice,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    calculateCartPrice,
  } = useStore((state: any) => state);

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={[
            styles.scrollViewInnerContainer,
            {marginBottom: tabBarHeight},
          ]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length === 0 && (
              <EmptyListAnimated title="Cart is empty" />
            )}
            {CartList.length > 0 && (
              <View style={styles.listContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}>
                    <CartItem
                      {...data}
                      incrementCartItemQuantity={incrementCartItemQuantity}
                      decrementCartItemQuantity={decrementCartItemQuantity}
                      calculateCartPrice={calculateCartPrice}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* <TouchableOpacity onPress={clearData}>
            <Text style={{color: 'white'}}>Reset data</Text>
          </TouchableOpacity> */}

          {CartList.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={{price: CartPrice, currency: '$'}}
              buttonPressHandler={buttonPressHandler}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollViewInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  listContainer: {},
});
