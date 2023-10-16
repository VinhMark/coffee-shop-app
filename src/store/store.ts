import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    set => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            let found = false;
            const cartList = state.CartList;

            for (let i = 0; i < cartList.length; i++) {
              // Check item is existed in cart list
              if (cartList[i].id === cartItem.id) {
                found = true;
                let size = false;

                for (let j = 0; j < cartList[i].prices.length; j++) {
                  if (cartList[i].prices[j].size === cartItem.prices[0].size) {
                    size = true;
                    cartList[i].prices[j].quantity++;
                    break;
                  }
                }

                // add new size
                if (!size) {
                  cartList[i].prices.push(cartItem.prices[0]);
                }
                // Sort size S=>M=>L or L=>M=>S
                cartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }

                  return 0;
                });
                break;
              }
            }

            if (!found) {
              cartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            const cartList = state.CartList;
            for (let i = 0; i < cartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < cartList[i].prices.length; j++) {
                tempPrice +=
                  parseFloat(cartList[i].prices[j].price) *
                  cartList[i].prices[j].quantity;
              }

              cartList[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice += tempPrice;
            }

            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            const favoriteList = state.FavoriteList;
            const data = type === 'Coffee' ? state.CoffeeList : state.BeanList;

            data.some((item: any) => {
              if (item.id === id && !item.favorite) {
                item.favorite = true;
                favoriteList.unshift(item);
                return true;
              }
            });
          }),
        ),
      deleteFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            const favoriteList = state.FavoriteList;

            const data = type === 'Coffee' ? state.CoffeeList : state.BeanList;
            data.some((item: any) => {
              if (item.id === id && item.favorite) {
                item.favorite = false;
                favoriteList.splice(
                  favoriteList.findIndex((f: any) => f.id === id),
                  1,
                );
                return true;
              }
            });
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            state.CartList.some((item: any) => {
              if (item.id === id) {
                const index = item.prices.findIndex(
                  (p: any) => p.size === size,
                );
                item.prices[index].quantity++;
                return true;
              }
            });
          }),
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            state.CartList.some((item: any, index: number) => {
              if (item.id === id) {
                const priceIndex = item.prices.findIndex(
                  (p: any) => p.size === size,
                );

                if (item.prices[priceIndex].quantity > 1) {
                  item.prices[priceIndex].quantity--;
                } else {
                  state.CartList.splice(index, 1);
                }
                return true;
              }
            });
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce((state: any) => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );

            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate: `${new Date().toDateString()} ${new Date().toLocaleDateString()}`,
                CartList: state.CartList,
                CartListPrice: temp.tofixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate: `${new Date().toDateString()} ${new Date().toLocaleDateString()}`,
                CartList: state.CartList,
                CartListPrice: temp.tofixed(2).toString(),
              });
            }

            state.CartList = [];
          }),
        ),
      clearData: () =>
        set(
          produce((state: any) => {
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
