import React, { useState, useEffect ,useRef} from 'react';
import {FlatList, Animated,View, Text, Switch, StyleSheet, Image, ScrollView, Modal, TouchableOpacity , ImageBackground,Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const images = [
  require('./assets/car1.png'),
  require('./assets/imgs/car2.png'),
  require('./assets/imgs/car3.png'),
  require('./assets/car4.png'),
];


const data = [
  { id: '1', url: 'https://i.pinimg.com/564x/82/c1/9a/82c19a347a8beaa222c35f222a12f01c.jpg' },
  { id: '2', url: 'https://i.pinimg.com/564x/82/c1/9a/82c19a347a8beaa222c35f222a12f01c.jpg' },
  { id: '3', url: 'https://i.pinimg.com/564x/82/c1/9a/82c19a347a8beaa222c35f222a12f01c.jpg' },
  { id: '4', url: 'https://i.pinimg.com/564x/82/c1/9a/82c19a347a8beaa222c35f222a12f01c.jpg' },
];

const texts = ["The Ultimate Driving Machine", "Sheer Driving Pleasure", "Joy is BMW","Freude am Fahren"];

const imagesWithLoop = [...images, images[0]];
const textsWithLoop = [...texts, texts[0]];


const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const [selectedTab, setSelectedTab] = useState('BMW M');
  const [subTabs, setSubTabs] = useState(['ALL BMW M']);
  const [carData, setCarData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;    // For horizontal sliding
  const textAnim = useRef(new Animated.Value(0)).current;     // For vertical sliding
  const scaleAnim = useRef(new Animated.Value(1)).current;    // For scaling effect
  const fadeAnim = useRef(new Animated.Value(1)).current;     // For fade effect
  const { width, height } = Dimensions.get("window");
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const imageHeight = width >= 720 ? 500 : 250; 
  const navigation = useNavigation();


  const [favoriteCars, setFavoriteCars] = useState([]);
  const FAVORITE_KEY = 'favorite_items';



  if (Platform.OS === 'android') {
    console.log('Running on Android');
    // Android-specific logic (e.g., file paths, permissions)
  } else if (Platform.OS === 'ios') {
    console.log('Running on iOS');
    // iOS-specific logic (e.g., file paths, permissions)
  }


  const FAVORITE_FILE = FileSystem.documentDirectory + 'favorites.json';

  // Use platform-specific code if necessary



{/* slider  scrip*/} 

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(animatedHeight, {
        toValue: 250, // Set to your desired dropdown height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Run animations in parallel for smooth transition
      Animated.parallel([
        // Slide images horizontally
        Animated.timing(slideAnim, {
          toValue: -(currentIndex + 1) * width,
          duration: 400,
          useNativeDriver: true,
        }),
        
        // Slide text vertically
        Animated.timing(textAnim, {
          toValue: -(currentIndex + 1) * 30,  // Adjust 30 to control text height
          duration: 400,
          useNativeDriver: true,
        }),

        // Scale effect
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.5, // Slightly larger than original
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, // Back to original size
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        // Fade effect
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1, // Fade back in
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        let newIndex = currentIndex + 1;

        // Reset to the first slide if reaching the end
        if (newIndex === images.length) {
          slideAnim.setValue(0);
          textAnim.setValue(0);
          newIndex = 0;
        }

        setCurrentIndex(newIndex);
      });
    }, 6000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, slideAnim, textAnim, scaleAnim, fadeAnim, width]);



  const handleOptionPress = () => {
    setModalVisible(true);
  };

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
    extrapolate: 'clamp'
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.9],
    extrapolate: 'clamp'
  });
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [80, 60],
    extrapolate: 'clamp'
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '40deg'],
    extrapolate: 'clamp'
  });


    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
      Animated.timing(rotateAnim, {
        toValue: isMenuOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    };


    const handleMainTabPress = (tab) => {
      setSelectedTab(tab);
      switch (tab) {
        case 'BMW':
          setSubTabs(['3', '4', '5', '7', '8', 'X', 'Z']);
          fetchCarData('BMW');
          break;
        case 'BMW M':
          setSubTabs(['ALL BMW M']);
          fetchCarData1('BMW M');
          break;
        case 'BMW i':
          setSubTabs(['ALL BMW i']);
          fetchCarData2('BMW i');
          break;
        default:
          setSubTabs([]);
          break;
      }
    };
    

  const fetchCarData = async (series = 'BMW') => {
  try {
    // Xóa dữ liệu cũ trước khi lấy dữ liệu mới
    setFilteredCarData([]);

    // Gửi yêu cầu tới API
    const response = await fetch(`https://66ff37092b9aac9c997e8a42.mockapi.io/BMW`);
    const data = await response.json();

    // Lọc dữ liệu dựa trên `series`
    const filteredData = series === 'BMW' ? data : data.filter(car => car.Series === series);
    setCarData(data);  // Cập nhật dữ liệu gốc
    setFilteredCarData(filteredData);  // Cập nhật dữ liệu đã lọc
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};

const fetchCarData1 = async (series = 'BMW M') => {
  try {
    // Xóa dữ liệu cũ trước khi lấy dữ liệu mới
    setFilteredCarData([]);

    // Gửi yêu cầu tới API
    const response = await fetch(`https://66ff37092b9aac9c997e8a42.mockapi.io/BMW`);
    const data = await response.json();

    // Lọc dữ liệu dựa trên `series`
    const filteredData = series === 'BMW M' ? data : data.filter(car => car.Series === series);
    setCarData(data);  // Cập nhật dữ liệu gốc
    setFilteredCarData(filteredData);  // Cập nhật dữ liệu đã lọc
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};
const fetchCarData2 = async (series = 'BMW i') => {
  try {
    // Xóa dữ liệu cũ trước khi lấy dữ liệu mới
    setFilteredCarData([]);

    // Gửi yêu cầu tới API
    const response = await fetch(`https://66ff37092b9aac9c997e8a42.mockapi.io/BMW`);
    const data = await response.json();

    // Lọc dữ liệu dựa trên `series`
    const filteredData = series === 'BMW i' ? data : data.filter(car => car.Series === series);
    setCarData(data);  // Cập nhật dữ liệu gốc
    setFilteredCarData(filteredData);  // Cập nhật dữ liệu đã lọc
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};

// Khi nhấn vào một sub tab bất kỳ, truyền series tương ứng vào hàm fetchCarData
const handleSubTabPress = (subTab) => {
  setSelectedTab(subTab);
  fetchCarData(subTab); // Fetch dữ liệu và lọc theo subTab đã chọn
  fetchCarData1(subTab);
  fetchCarData2(subTab);
};

  // Function to toggle favorite status of a car
  const toggleFavorite = async (car) => {
    try {
      const storedCars = await AsyncStorage.getItem('favoriteCars');
      let favoriteCarsArray = storedCars ? JSON.parse(storedCars) : [];

      // Check if the car is already in the favorites list
      if (favoriteCarsArray.some(favCar => favCar.id === car.id)) {
        // Remove car from favorites
        favoriteCarsArray = favoriteCarsArray.filter(favCar => favCar.id !== car.id);
      } else {
        // Add car to favorites
        favoriteCarsArray.push(car);
      }

      // Save the updated list back to AsyncStorage
      await AsyncStorage.setItem('favoriteCars', JSON.stringify(favoriteCarsArray));

      // Update the state to reflect the changes
      setFavoriteCars(favoriteCarsArray);
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
    }
  };

  // Function to load favorite cars from AsyncStorage
  const loadFavoriteCars = async () => {
    try {
      const storedCars = await AsyncStorage.getItem('favoriteCars');
      if (storedCars !== null) {
        setFavoriteCars(JSON.parse(storedCars));
      }
    } catch (error) {
      console.error('Failed to load favorite cars:', error);
    }
  };

useEffect(() => {
  fetchCarData();
  loadFavoriteCars(); // Load favorites on component mount
}, []);




// Duplicate the first image at the end of the array for smooth looping


  useEffect(() => {
    fetchCarData();
  }, []);

  useEffect(() => {
    if (selectedTab !== 'BMW M') {
      const filteredData = carData.filter(car => car.Series === selectedTab);
      setFilteredCarData(filteredData);
    } else {
      setFilteredCarData([]); 
    }
  }, [selectedTab, carData]);


 const hanldeLogoPress = ()=>{
   toggleDropdown();
   toggleMenu();
 }


  return (
    <View style={[styles.container, styles.lightBackground]}>

      <Animated.View 
              style={[
            styles.header,
          {
            backgroundColor: headerBackgroundColor,
            height: headerHeight,
            transform: [{ scale: headerScale }]
          }
        ]}
      
      >
        <TouchableOpacity onPress={hanldeLogoPress}>
            <Animated.Image
             source={require('./logo1.png')}
            style={[styles.logo, { transform: [{ rotate }] }]}
          />
        </TouchableOpacity>


        <View style={styles.verticalSeparator} />

        <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => alert('Call')}>
            <Ionicons
              style={styles.lightText2}
              name="call" size={24} color="black"
            />
            <Text style={styles.lightText2}>
              Call
            </Text>
          </TouchableOpacity>

          <View style={styles.verticalSeparator} />
        </View>
      </Animated.View>

      <View style={styles.separator} />

      <Animated.ScrollView contentContainerStyle={styles.content}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={15}
      >
        <Image
          source={require('./pro1.png')}
          style={styles.image}
        />
        <Text style={styles.lightText}>
           FIND YOUR BMW
        </Text>
        <Text style={styles.lightText1}>
        NEW MODEL RANGE
        </Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'BMW' && styles.activeTab,
            styles.activeTabl]}
            onPress={() => handleMainTabPress('BMW')}
          >
            <Text style={[styles.tabText, selectedTab === 'BMW' && styles.activeTabText,
            styles.lightTabText]}>
              BMW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'BMW M' && styles.activeTab,
            styles.activeTabl]}
            onPress={() => handleMainTabPress('BMW M')}
          >
            <Text style={[styles.tabText, selectedTab === 'BMW M' && styles.activeTabText,
            styles.lightTabText]}>
              BMW M
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'BMW i' && styles.activeTab,
            styles.activeTabl]}
            onPress={() => handleMainTabPress('BMW i')}
          >
            <Text style={[styles.tabText, selectedTab === 'BMW i' && styles.activeTabText,
            styles.lightTabText]}>
              BMW i
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainercon}>
          {subTabs.map((subTab) => (
            <TouchableOpacity
              key={subTab}
              style={[styles.tabcon, selectedTab === subTab && styles.activeTab,
              styles.activeTabl]}
              onPress={() => handleSubTabPress(subTab)}
            >
              <Text style={[styles.tabText, selectedTab === subTab && styles.activeTabText,
              styles.lightTabText]}>
                {subTab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {filteredCarData.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} // Optional: Hides the scroll indicator
              contentContainerStyle={styles.horizontalScrollContainer} // Optional: Additional styles
            >
              <View style={styles.carList}>
                {filteredCarData.map(car => {
                  const isFavorite = favoriteCars.some((favCar) => favCar.id === car.id);
                  return (
                    <View key={car.id} style={styles.carItem}>
                      <TouchableOpacity 
                        onPress={() => navigation.navigate(car.id)} 
                        style={styles.carCard}
                      >
                        <Image source={{ uri: car.imgLink }} style={styles.carImage} />
                        <Text style={styles.carName}>{car.name}</Text>
                        <Text style={styles.carPrice}>{car.price}</Text>
                        <Text style={styles.carGasType}>Gas Type: {car.gasType}</Text>
                      </TouchableOpacity>
                      {/* Heart Icon */}
                      <TouchableOpacity style={{position: "absolute", top:20,right:45}}  onPress={() => toggleFavorite(car)}>
                       
                      <Icon name="check" size={24} color={isFavorite ? 'green' : 'gray'} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}




    <View style={styles.dropdownCtn}>
      {isOpen && (
        <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
          <TouchableOpacity onPress={() => navigation.navigate('DangKy')} style={styles.dropdownItem}><Text>Book A Test Drive</Text></TouchableOpacity >
  
            <TouchableOpacity onPress={() => navigation.navigate('DangKy')}  style={styles.dropdownItem}><Text>Drive Test</Text></TouchableOpacity >
  
            <TouchableOpacity onPress={() => navigation.navigate('Chatbot')}  style={styles.dropdownItem}><Text>AI Support</Text></TouchableOpacity>
  
            <TouchableOpacity onPress={() => navigation.navigate('fv')}  style={styles.dropdownItem}><Text>fv</Text></TouchableOpacity >
        </Animated.View>
      )}
    </View>

{/* slider */}
<View style={styles.verticalBarCtn}><View style={styles.verticalBar}></View></View>


<View style={styles.containerOfSlider}>
      <View style={styles.slider}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              flexDirection: "row",
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {imagesWithLoop.map((img, index) => (
            <Animated.Image
              key={index}
              source={img}
              style={[
                styles.imageOfSlider, {height :imageHeight},
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim,
                },
              ]}
            />
          ))}
        </Animated.View>
      </View>

      <View style={styles.textContainer}>
        <Animated.View
          style={{
            transform: [{ translateY: textAnim }],
          }}
        >
          {textsWithLoop.map((text, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.textOfslider,
                {
                  opacity: fadeAnim, // Apply fade effect to text as well
                },
              ]}
            >
              {text}
            </Animated.Text>
          ))}
        </Animated.View>
      </View>
    </View>


{/* accessories */}



{/* SHOPPING TOOL */}

<View style={styles.verticalBarCtn}><View style={styles.verticalBar}></View></View>

    <View style={styles.container}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.sectionTitle}>SHOPPING TOOLS</Text>
        <Text style={styles.mainTitle}>FIND YOUR BMW</Text>
    </View>

      <View style={styles.optionContainer}>
        {/* Replace these Text elements with appropriate icons */}
        <View style={styles.imageContainer1}>
          <Image 
            source={{ uri: "https://i.pinimg.com/564x/4a/72/75/4a7275a6a3649c835b3702cd5497d811.jpg" }} 
            style={[styles.imgs, { height: imageHeight }]} 
          />
        </View>
        <Text style={styles.optionTitle}>Book a Service Appointment</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Online</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
      <View style={styles.imageContainer1}>
          <Image 
            source={{ uri: "https://i.pinimg.com/564x/9b/40/e1/9b40e17d53d52e743824dcc391cb64b2.jpg" }} 
            style={styles.imgs} 
          />
        </View>
        <Text style={styles.optionTitle}>Book a Test Drive</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DangKy')}>
          <Text style={styles.buttonText}>Book Online</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
      <View style={styles.imageContainer1} onPress={() => navigation.navigate('DangKy')}>
          <Image 
            source={{ uri: "https://i.pinimg.com/564x/0f/df/33/0fdf33efe927bbe0fad863ef9bde3312.jpg" }} 
            style={styles.imgs} 
          />
        </View>
        <Text style={styles.optionTitle}>Request an Offer</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Request Online</Text>
        </TouchableOpacity>
      </View>
    </View>

           {/* footer */}
        
        <View style={styles.footer}>
  <View style={styles.topSection}>
    <TouchableOpacity style={styles.iconContainer}>
      <FontAwesome name="car" size={24} color="black" />
      <Text style={styles.iconText}>Book a Test Drive</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconContainer}>
      <FontAwesome name="list-alt" size={24} color="black" />
      <Text style={styles.iconText}>BMW Price List</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconContainer}>
      <FontAwesome name="phone" size={24} color="black" />
      <Text style={styles.iconText}>Contact Dealer</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.bottomSection}>
    <View style={styles.contactColumn}>
      <Text style={styles.columnTitle}>CONTACT</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/contact')}>
        <Text style={styles.linkText}>Contact BMW</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/dealer')}>
        <Text style={styles.linkText}>Contact Dealer</Text>
      </TouchableOpacity>
      <View style={styles.socialIcons}>
        <View style={styles.socialIconsCTN}>
          <FontAwesome name="facebook" size={24} color="black" />
        </View>
        <View style={styles.socialIconsCTN}>
          <FontAwesome name="instagram" size={24} color="black" />
        </View> 
        <View style={styles.socialIconsCTN}>
          <FontAwesome name="youtube" size={24} color="black" />
        </View>
      </View>
    </View>

    <View style={styles.moreColumn}>
      <Text style={styles.columnTitle}>MORE ABOUT BMW</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/learn-more')}>
        <Text style={styles.linkText}>Learn more BMW</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.press.bmwgroup.com/asia')}>
        <Text style={styles.linkText}>BMW PressClub Asia</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.bottomLinks}>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/legal')}>
      <Text style={styles.linkText}>Legal Disclaimer</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/privacy')}>
      <Text style={styles.linkText}>Privacy Policy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/cookies')}>
      <Text style={styles.linkText}>Cookie Policy</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL('https://www.bmw.com/imprint')}>
      <Text style={styles.linkText}>Imprint</Text>
    </TouchableOpacity>
  </View>

  <Text style={styles.copyright}>© THACO AUTO 2024</Text>
</View>


      </Animated.ScrollView>

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownCtn:{
    position:'absolute',
    top:0,
    width:"100%",
    height:250,
  alignItems:'center',

  },
    dropdown: {
    width:'80%',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems:'cecnter',
    justifyContent:'center',
    elevation: 5, // Android shadow
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.25, // Shadow transparency
    shadowRadius: 3.84, // Shadow blur radius
  },
  dropdownItem: {
    paddingVertical:10,
    width:"100%",
    justifyContent:'center',
    alignItems:'center',

  },
  
  container: {
    paddingTop:20,
    flex: 1,
    width:"100%",

  },
  header: {
    paddingTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#cccccc',
    marginHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 15,
  },
  content: {
    alignItems: 'center',
    padding: 0,
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },

  lightText: {
    color: '#000000',
    marginVertical: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lightText1: {
    color: '#000000',
    marginVertical: 2,
    marginTop:20,
    marginBottom:20,
    textAlign: 'center',
    fontSize: 28,
  },
  lightText2: {
    color: '#000000',
    marginVertical: 2,
    textAlign: 'center',
  },
  image: {
    width: 450,
    height: 200,
    marginTop: -10,
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
  },
  tabContainercon: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderTopColor: '#ccc',
  },
  tabcon: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  activeTab:{
    borderBottomWidth: 5,
  },
    activeTabl: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  lightTabText: {
    color: '#000',
  },  

  carImage: { width: '100%', height: 120, resizeMode: 'contain' },
  carName: { fontSize: 16, fontWeight: 'bold' },
  carPrice: { fontSize: 14, color: 'green' },
  carGasType: { fontSize: 12, color: '#777' },
  footer: {
  width:'100%',
  backgroundColor: '#f8f8f8',
  padding: 20,
},
topSection: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 20,
},
iconContainer: {
  alignItems: 'center',

},
iconText: {
  marginTop: 5,
  fontSize: 14,
},
bottomSection: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},
contactColumn: {
  flex: 1,
},
columnTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
},
linkText: {
  fontSize: 14,
  color: '#007aff',
  marginBottom: 5,
},
socialIcons: {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent:'center',
  alignItems:'center',
},
moreColumn: {
  flex: 1,
},


bottomLinks: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  marginBottom: 10,
},
copyright: {
  fontSize: 12,
  color: '#555',

  marginTop: 10,
},
socialIconsCTN:{
  padding:20,
},
logo: {
  width: 50,
  height: 50,
},
containerOfSlider:{
  width:'100%',
  alignItems: 'center',
  justifyContent: 'center',
},

slider: {
  width:"100%",
  height: 250,
  overflow: 'hidden',
},

imageContainer: {
  width: Dimensions.get("window").width * images.length,
},

imageOfSlider:{

  width: Dimensions.get("window").width,
  // height: 250,
  resizeMode: 'cover',
},

textContainer: {
  height: 30, // Adjust this based on the text height
  overflow: 'hidden',
  marginTop: 10,
},
textOfslider: {
  fontSize: 18,
  textAlign: 'center',
  height: 30, // Match this to the height set in textAnim translateY
},


sectionTitle: {
  fontSize: 12,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginBottom: 10,
},
mainTitle: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 30,
},
optionContainer: {
  alignItems: 'center',
  marginBottom: 40,
},

optionTitle: {
  fontSize: 16,
  color: '#333',
  marginBottom: 10,
  textAlign: 'center',
},
button: {
  borderWidth: 1,
  borderColor: '#000',
  paddingVertical: 8,
  paddingHorizontal: 60,
  borderRadius: 4,
},
buttonText: {
  fontSize: 14,
  color: '#000',
  fontWeight: 'bold',
},


imageContainer1:{
  height:250,
  width:"95%",
},
imgs:{
  flex:1,
  width:"100%",
  borderRadius:30,
},

verticalBarCtn:{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
  marginVertical:30,
},

verticalBar:{
  width:"80%",
  borderWidth:0.8,
  borderColor:'black',
},


carCard:{
  margin:10,
  borderRadius:30,
  width:280,

  shadowColor: '#000', // Shadow color
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.25, 
  shadowRadius: 3.84, // Shadow blur
  backgroundColor: '#fff', 
  padding: 20,
  elevation: 5, 
},
carList:{
  flexDirection:'row'
},
carItem:{
  paddingHorizontal:20,

  margin:20,
},
heartIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
},
});

export default HomeScreen;
