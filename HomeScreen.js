import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch,Animated, Dimensions, StyleSheet, Image, ScrollView, Modal, TouchableOpacity , ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('BMW M');
  const [subTabs, setSubTabs] = useState(['ALL BMW M']);
  const [carData, setCarData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [showSubOptions, setShowSubOptions] = useState(false);

  const navigation = useNavigation();
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
const texts = ["First Image Text", "Second Image Text", "Third Image Text","ford Image Text"];

const imagesWithLoop = [...images, images[0]];
const textsWithLoop = [...texts, texts[0]];
const scrollY = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;    // For horizontal sliding
  const textAnim = useRef(new Animated.Value(0)).current;     // For vertical sliding
  const scaleAnim = useRef(new Animated.Value(1)).current;    // For scaling effect
  const fadeAnim = useRef(new Animated.Value(1)).current;     // For fade effect
  const { width, height } = Dimensions.get("window");
  console.log(width);

  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;


  const imageHeight = width >= 720 ? 500 : 250; 


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
        toValue: 100, // Set to your desired dropdown height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };



  const handleOptionPress = () => {
    setModalVisible(true);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemF}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Detail', { itemId: item.id })}
    >
      <View style={styles.parallelogramContainerF}>
        <Image source={{ uri: item.url }} style={styles.imageF} />
      </View>
    </TouchableOpacity>
  );

  const handleMainTabPress = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case 'BMW':
        setSubTabs(['3', '4', '5', '7', '8', 'X', 'Z']);
        break;
      case 'BMW M':
        setSubTabs(['ALL BMW M']);
        break;
      case 'BMW i':
        setSubTabs(['ALL BMW i']);
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
  

  const hadlePressLogo = () =>{
      toggleDropdown();
      
  }
  return (
    <View style={[styles.container, styles.lightBackground]}>
      <View style={styles.header}>
        <Text style={styles.lightHeaderText}>BMW</Text>
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

          <TouchableOpacity onPress={handleOptionPress}>
            <Ionicons
              style={styles.lightText}
              name="options" size={24} color="black"
            />
            <Text style={styles.lightText2}>
              Menu
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('./pro1.png')}
          style={styles.image}
        />
        <Text style={styles.lightText}>
          KHÁM PHÁ TẤT CẢ CÁC MẪU XE BMW
        </Text>
        <Text style={styles.lightText1}>
          CHỌN DÒNG XE
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
          <View style={styles.carList}>
            {filteredCarData.map(car => (
              <View key={car.id} style={styles.carItem}>
              <TouchableOpacity onPress={() => navigation.navigate(car.id)}>
                <Image source={{ uri: car.imgLink }} style={styles.carImage} />
                <Text style={styles.carName}>{car.name}</Text>
                <Text style={styles.carPrice}>{car.price}</Text>
                <Text style={styles.carGasType}>Gas Type: {car.gasType}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

          <Text style={styles.lightText}>
            TIỆN ÍCH BMW
          </Text>
          <Text style={styles.lightText1}>
            CHỌN DỊCH VỤ BMW
          </Text>

          <TouchableOpacity >
            <Image
              source={require('./assets/imgs/1.png')}
              style={styles.image1}
            />
            <Text style={styles.lightText1}>
              Đặt Hẹn Dịch Vụ BMW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
            <Image
              source={require('./assets/imgs/2.png')}
              style={styles.image1}
            />
            <Text style={styles.lightText1}>
              Đặt Lịch Lái Thử BMW
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Lienhe')}>
            <Image
              source={require('./assets/imgs/3.png')}
              style={styles.image2}
            />
            <Text style={styles.lightText1}>
              Đăng Ký Nhận Ưu Đãi
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => navigation.navigate('SeriesXM')}>
            <Image
              source={require('./xehoi2.png')}
              style={styles.image4}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Digital')}>
            <Image
              source={require('./xehoi1.jpg')}
              style={styles.image3}
            />
          </TouchableOpacity>


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


    <View style={styles.containerDrop}>
      {isOpen && (
        <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
          <Text style={styles.dropdownItem}>Option 1</Text>
          <Text style={styles.dropdownItem}>Option 2</Text>
          <Text style={styles.dropdownItem}>Option 3</Text>
        </Animated.View>
      )}
    </View>

      </ScrollView>

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
  containerDrop:{
    position:'absolute',
    top:100,
    left:100,
  },
    dropdown: {
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
    marginTop: 10,
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  container: {
    flex: 1,
  },
  header: {
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
    padding: 15,
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },

  lightHeaderText: {
    fontSize: 24,
    color: '#000000',
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
    lightText5: {
    color: '#fff',
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
    image1: {
    width: 200,
    height: 200,
    marginLeft:50,
  },
  image2: {
    width: 200,
    height: 200,
    marginLeft:40,
  },
  image3: {
    width: 410,
    height: 200,
    marginBottom:40,
  },
  image4: {
    width: 410,
    height: 370,
    marginBottom:40,
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
  background: {
    flex: 1,
    height:300,
    width:500,

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
});

export default HomeScreen;
