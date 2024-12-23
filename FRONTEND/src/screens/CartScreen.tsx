import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { CartContext } from '../../context/CartContext';

const CartScreen = () => {
  const { cart } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${calculateTotal()}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  emptyCart: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});

export default CartScreen;

