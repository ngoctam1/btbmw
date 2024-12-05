import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// FavoriteCarsScreen component
const FavoriteCarsScreen = ({ navigation }) => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to load favorite cars from AsyncStorage
  const loadFavoriteCars = async () => {
    try {
      const storedCars = await AsyncStorage.getItem('favoriteCars');
      const favoriteCarsArray = storedCars ? JSON.parse(storedCars) : [];
      setFavoriteCars(favoriteCarsArray);
    } catch (error) {
      console.error('Failed to load favorite cars:', error);
    }
  };

  // Refresh function that will be triggered on pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadFavoriteCars(); // Reload the data from AsyncStorage
    setRefreshing(false); // Stop the refreshing animation
  };

  // Load favorite cars when the component mounts
  useEffect(() => {
    loadFavoriteCars();
  }, []);

  // Reload data when the screen comes back into focus
  useFocusEffect(() => {
    loadFavoriteCars();
  });

  // Render each car in the favorite cars list
  const renderCarItem = ({ item }) => (
    <View style={styles.carItem}>
      <TouchableOpacity 
       onPress={() => navigation.navigate(item.id)} 
        style={styles.carCard}
      >
        <Image source={{ uri: item.imgLink }} style={styles.carImage} />
        <View style={styles.carInfo}>
          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.carPrice}>{item.price}</Text>
          <Text style={styles.carGasType}>Gas Type: {item.gasType}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cars</Text>

      {/* If no favorite cars, display a message */}
      {favoriteCars.length === 0 ? (
        <Text style={styles.noCarsText}>No favorite cars added yet.</Text>
      ) : (
        <FlatList
          data={favoriteCars}
          renderItem={renderCarItem}
          keyExtractor={item => item.id.toString()} // Ensure each item has a unique key
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Show the loading spinner when refreshing
              onRefresh={onRefresh}    // Trigger the onRefresh function
            />
          }
        />
      )}
    </View>
  );
};

// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  noCarsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
  carItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  carCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  carInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carPrice: {
    fontSize: 16,
    color: '#777',
  },
  carGasType: {
    fontSize: 14,
    color: '#555',
  },
});

export default FavoriteCarsScreen;
