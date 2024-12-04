import React, { useRef, useState ,useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Animated,
  StatusBar,
  Linking,ActivityIndicator,Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../friebaseConf";
import { doc, getDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';





const series5 = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const defaultCarName = "Series5"; // Default car name
  const [defaultData, setDefaultData] = useState(null); // Data for the default car
  const [selectedCar, setSelectedCar] = useState(null); // Selected car name
  const [selectedData, setSelectedData] = useState(null); // Data for the selected car
  const [loading, setLoading] = useState(true);
  const [modalVisible1, setModalVisible1] = useState(false); // Modal visibility

    // Fetch data for a specific car
    const fetchCarData = async (carName, setDataCallback) => {
      try {
          const docRef = doc(db, "carDetails", carName);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              setDataCallback(docSnap.data());
          } else {
              console.log(`No data found for ${carName}`);
              setDataCallback(null);
          }
      } catch (error) {
          console.error(`Error fetching data for ${carName}:`, error);
          setDataCallback(null);
      }
  };

  // Fetch data for the default car on mount
  useEffect(() => {
    fetchCarData(defaultCarName, setDefaultData).finally(() => setLoading(false));
}, []);

// Handle car selection
const handleCarSelection = async (carName) => {
    setSelectedCar(carName);
    setLoading(true);
    await fetchCarData(carName, setSelectedData);
    setLoading(false);
};

if (loading) {
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading data...</Text>
        </View>
    );
}



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


 const hanldeLogoPress = ()=>{
   toggleDropdown();
   toggleMenu();
 }


  const handleOptionPress = () => {
    setModalVisible(true);
  };

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'],
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




  return (
    <View style={[styles.container, isDarkTheme ? styles.darkBackground : styles.lightBackground]}>
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
             source={require('../logo1.png')}
            style={[styles.logo, { transform: [{ rotate }] }]}
          />
        </TouchableOpacity>


        <View style={styles.verticalSeparator} />

        <View style={styles.optionsContainer}>
          <View style={styles.verticalSeparator} />

          <TouchableOpacity onPress={handleOptionPress}>
            <Ionicons
              style={isDarkTheme ? styles.darkText : styles.lightText}
              name="call" size={24} color="black"
            />
            <Text style={isDarkTheme ? styles.darkText2 : styles.lightText2}>
              Menu
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.separator} />





      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={15}
      >
        <View style={{width:"100%",height:700}}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/48/a1/b8/48a1b8b2fc15bb0efa9f63d93aed936a.jpg' }}
          style={styles.image}
        />
        <View style={{position:'absolute',top:500,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE 5</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>BMW 5 SERIES</Text>

            <View style={{ marginTop: 20, flexDirection:'row' }}>
            <TouchableOpacity style={{ padding: 5, paddingHorizontal: 20, backgroundColor: '#1c69d3'}}>
              <Text style={{ fontWeight: '400', color: "white", fontSize: 15 }}>Register interest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5, paddingHorizontal: 20, backgroundColor: '#4d4d4d', marginLeft:10}}>
              <Text style={{ fontWeight: '400', color: 'white', fontSize: 15 }}>Book a Test Drive</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.inforInBanner}>
            <View style={styles.priceRTag}> 
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Prices From</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>VND 1,979,000,000</Text>
            </View>
            <View style={{marginLeft:45}}> 
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Petrol</Text>
            </View>
        </View>
        </View>
        </View>


        <View style={styles.container1}>
            <Text style={styles.title}>Curent Car Details ({defaultCarName}):</Text>
            {defaultData ? (
                Object.entries(defaultData).map(([key, value]) => (
                    <Text key={key} style={styles.text}>
                        {key}: {value}
                    </Text>
                ))
            ) : (
                <Text>No data found for {defaultCarName}</Text>
            )}

            {/* "Compare With" Button */}
            <TouchableOpacity
                style={styles.compareButton}
                onPress={() => setModalVisible1(true)}
            >
                <Text style={styles.buttonText}>Compare With</Text>
            </TouchableOpacity>

            {/* Modal for comparing cars */}
            <Modal visible={modalVisible1} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Select a Car to Compare</Text>

                    {/* Picker to choose another car */}
                    <Picker
                        selectedValue={selectedCar}
                        onValueChange={(value) => handleCarSelection(value)}
                        style={styles.picker}
                    >
                    <Picker.Item label="Series3" value="Series3" /> 
                    <Picker.Item label="Series4C" value="Series4C" />
                    <Picker.Item label="Series4GC" value="Series4GC" />
                    <Picker.Item label="Series5" value="Series5" />
                    <Picker.Item label="Series7" value="Series7" />
                    <Picker.Item label="Series8GC" value="Series8GC" />
                    <Picker.Item label="SeriesX3" value="SeriesX3" />
                    <Picker.Item label="SeriesX4" value="SeriesX4" />
                    <Picker.Item label="SeriesX5" value="SeriesX5" />
                    <Picker.Item label="SeriesX6" value="SeriesX6" />
                    <Picker.Item label="SeriesX7" value="SeriesX7" />
                    <Picker.Item label="SeriesXM" value="SeriesXM" />
                    <Picker.Item label="SeriesZ4" value="SeriesZ4" />
                    <Picker.Item label="Seriesi4" value="Seriesi4" />
                    <Picker.Item label="Seriesi7" value="Seriesi7" />
                    <Picker.Item label="SeriesiX3" value="SeriesiX3" />
                    <Picker.Item label="series3" value="series3" />

                        
                        {/* Add more cars as needed */}
                    </Picker>

                    {/* Comparison Details */}
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.subtitle}>Default Car ({defaultCarName})</Text>
                            {defaultData ? (
                                Object.entries(defaultData).map(([key, value]) => (
                                    <Text key={key} style={styles.text}>
                                        {key}: {value}
                                    </Text>
                                ))
                            ) : (
                                <Text>No data found for {defaultCarName}</Text>
                            )}
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.subtitle}>
                                Selected Car ({selectedCar || "None"})
                            </Text>
                            {selectedData ? (
                                Object.entries(selectedData).map(([key, value]) => (
                                    <Text key={key} style={styles.text}>
                                        {key}: {value}
                                    </Text>
                                ))
                            ) : (
                                <Text>No data found for {selectedCar}</Text>
                            )}
                        </View>
                    </View>

                    {/* Back Button */}
                    <Button title="Back" onPress={() => setModalVisible1(false)} />
                </View>
            </Modal>
        </View>

      


        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.bulletText}>The BMW 5 Series Sedan is the epitome of a sporty business saloon. At very first sight it conveys an impression of stylish athleticism that particularly expresses itself in the dynamic silhouette and reduced design language. Clear surfaces and precise contours lend the elegant exterior a modern, technical atmosphere. The elegant and functional interior completes the innovative ambition of the vehicle with future-oriented technologies and sporty features. In combination with impressive driving dynamics and innovative technologies, the BMW 5 Series Sedan provides comfort, self-assuredness and, above all, a supreme level of sheer driving pleasures on journeys both short and long..</Text>
            </View>
        </View>




        <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE DESIGN OF THE BMW 5 SERIES SEDAN.</Text>
             <Text style={styles.bulletText}>The BMW 5 Series Sedan guides sportiness and self-assuredness to the next common level – thanks to the typical BMW proportions such as long wheelbase, the extended bonnet and the flowing roof line. Precise contours provide a fascinating contrast to the streamlined, reduced surfaces, creating a modern, puristic look. In particular, the BMW kidney grille gives the front a dynamic and innovative character. The headlights are seamlessly connected with the kidney grille, which additionally underlines the breadth of the vehicle and generates an exceptional elegance and presence that is maintained all the way through to the free-form tailpipes in the rear apron. The result is a stylish yet sporty overall image.​</Text>
             {/* <Image
                source={{ uri: 'https://i.pinimg.com/736x/ff/e7/9a/ffe79a325019087e742833350117410a.jpg' }}
                style={styles.image1}
                /> */}
        </View>


    <View style={styles.dropdownCtn}>
      {isOpen && (
        <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
          <TouchableOpacity onPress={() => navigation.navigate('DangKy')} style={styles.dropdownItem}><Text>Book A Test Drive</Text></TouchableOpacity >

          <TouchableOpacity onPress={() => navigation.navigate('Chatbot')}  style={styles.dropdownItem}><Text>AI Support</Text></TouchableOpacity>
          
           <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.dropdownItem}><Text>Home</Text></TouchableOpacity >
         
        </Animated.View>
      )}
    </View>


    







        <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE DRIVING DYNAMICS OF THE 5 SERIES SEDAN.</Text>
             <Text style={styles.bulletText}>The BMW 5 Series Sedan puts in an athletic performance on every journey. With perfectly tuned drive and chassis technologies, such as Adaptive suspension or the Integral Active Steering maximum sheer driving pleasure is guaranteed..​</Text>
             <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/833dd0f0fc3cffc74e6206a13549c1ac/image_2024_06_24t02_40_17_850z.png' }}
                  style={styles.image1}
                  />
        </View>

        <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>L-shaped LED taillights with 3D graphics</Text>
             <Text style={styles.bulletText}>ntegral Active Steering combines support that varies based on the steering angle on the front axle, and rear wheels that also contribute to steering. At lower speeds, it offers greater manoeuvrability and agility by turning the rear wheels opposite the front wheels. Beginning around 60 to 80 km/h, the rear wheels turn parallel to the front wheels, to increase driving stability and comfort..​</Text>
             <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/58d3a230ebe8d397357ce1395baef6b4/bmw_5_series_sedan_mc_driving_03.jpg' }}
                  style={styles.image1}
                  />
        </View>


        <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>Adaptive suspension.</Text>
             <Text style={styles.bulletText}>The adaptive suspension makes it possible to ideally adjust the damper characteristics to suit any given driving situation, improving roll comfort and driving dynamics. In addition to the standard COMFORT setting for increased driving comfort, the SPORT program can also be selected for athletic damper settings.​</Text>
             <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_crop,f_auto,fl_lossy,x_2,y_5,w_536,h_302/w_547,h_308,c_fill/auto-titan/3953561c8212c4a6be2bf22e1d037915/a_nh_ma_n_hi_nh_2024_04_15_lu_c_08.23.46.png' }}
                  style={styles.image1}
                  />
        </View>









        <Text style={styles.title}>TECHNICAL DATA OF THE BMW 5 SERIES.</Text>
        <Text style={styles.bulletText}>The BMW 520i.</Text>
        <View style={styles.containercarinfor}>
            <Image source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_crop,f_auto,fl_lossy,x_2090,y_529,w_6153,h_3457/w_841,h_473,c_fill/auto-titan/417d6b892eeb9581dc939b683c83189f/copy_of_di21_000019482.jpg' }} style={styles.imageInfor} />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Engine power in kW (hp) at 1/min:</Text>
                <Text style={styles.infoValue}>135 (184)/5.000-6.500</Text>

                <Text style={styles.infoText}>Acceleration 0–100 km/h in s:</Text>
                <Text style={styles.infoValue}>6.1</Text>

                <Text style={styles.infoText}>Fuel consumption combined in l/100 km:</Text>
                <Text style={styles.infoValue}>6.6</Text>

                <Text style={styles.infoText}>CO2 combined emissions in g/km:</Text>
                <Text style={styles.infoValue}>151</Text>
            </View>
        </View>








        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
            <Text style={styles.heading}>
                Numerous innovative technologies in the new BMW 3 Series Sedan allow driver and vehicle to communicate with one another comfortably.
              </Text>
              <View style={styles.bulletContainer}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  The BMW Curved Display provides a full overview of all important information and convenient touch control
                </Text>
              </View>
              <View style={styles.bulletContainer}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Unrestricted connectivity through smartphone integration, allowing you to conveniently plan routes on your smartphone and then transfer them to your vehicle
                </Text>
              </View>
              <View style={styles.bulletContainer}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Experience the intuitive operation using voice commands
                </Text>
              </View>
          </View>
        </View>





        {/* center content */}


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://i.pinimg.com/736x/85/34/3b/85343bb3eb7b58345a548f513a76f994.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Curved Display.</Text> */}
            <Text style={styles.bulletText}>The optional variable sport steering with Servotronic ensures direct, agile driving characteristics with less steering effort. Your BMW 4 Series Gran Coupé reacts to your steering control deflection with differing steering ratios according to the driving situation and speed.</Text>
        </View>
        </View>

        
        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://i.pinimg.com/736x/58/78/0b/58780b0d07c4c1205074b4ba9224287e.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
            <Text style={styles.bulletText}>The optional M Sport differential optimises traction and driving stability to manage lane changes and acceleration out of curves as well as fast cornering and varying road quality.</Text>
        </View>
        </View>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://i.pinimg.com/736x/af/65/81/af65817282141f7bc30ceac3768442ca.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
            <Text style={styles.bulletText}>With the optional Adaptive M suspension, you can use the Drive Experience Control whenever you wish to determine the suspension characteristics of your BMW 4 Series Gran Coupé. The electronically controlled dampers of the Adaptive M Suspension adjust directly to your driving style requirements and the road conditions.</Text>
        </View>
        </View>





        <View style={styles.containerStyle}>
          <View style={styles.customContentCTN}>
            <View style={styles.imgCTN}>
            <Image
                source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_851,h_479,q_auto,c_fill,f_auto,fl_lossy/auto-titan/b038106af38544f68c9fa6a7f43de3bf/bmw_3_series_sedan_wide_teaser_dlo.jpg' }} 
                style={styles.imgleft}
      
              />
            </View>
            <View style={styles.textRightCTN}>
              <Text style={styles.subtitle}>Would you like a personal consultation?</Text>
              <Text style={styles.description}>
              If you have any questions, require further information or would like specific offers for the BMW 3 Series Sedan, please contact a BMW partner near you. Our competent BMW service staff will be happy to advise you individually by phone or directly on-site.
              </Text>
              <TouchableOpacity style={styles.buttoncontent}>
                <Text style={styles.buttonTextContent}>Find a BMW dealer</Text>
              </TouchableOpacity>
            </View>

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



      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: 'white' }]}>
            <Text style={styles.modalTitle}>Chức năng</Text>
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
              <Text style={styles.modalOption}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Mẫu xe')}>
              <Text style={styles.modalOption}>Mẫu xe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('bookForm')}>
              <Text style={styles.modalOption}>Đặt hẹn lái thử</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Hệ thống phân phối')}>
              <Text style={styles.modalOption}>Hệ thống phân phối</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Tìm hiểu')}>
              <Text style={styles.modalOption}>Tìm hiểu</Text>
            </TouchableOpacity>
            <View style={styles.switchContainer}>
              <Text style={styles.modalOption}>Theme: </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isDarkTheme}
              />
              {isDarkTheme ? (
                <Ionicons name="moon" size={24} color="black" style={styles.icon} />
              ) : (
                <Ionicons name="sunny" size={24} color="black" style={styles.icon} />
              )}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
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
    backgroundColor:'#cccccc'
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
    marginHorizontal:10

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

  darkBackground: {
    backgroundColor: '#333333',
  },
  darkBackground1: {
    backgroundColor: '#525252',
    height:100,
    width:400,
  },
  lightHeaderText: {
    fontSize: 24,
    color: '#000000',
  },
  darkHeaderText: {
    fontSize: 24,
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
    marginVertical: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#ffffff',
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
  darkText1: {
    color: '#ffffff',
    marginVertical: 2,
    marginTop:20,
    marginBottom:20,
    textAlign: 'center',
    fontSize: 28,
  },
    darkText3: {
    color: '#ffffff',
    marginVertical: 2,
    marginTop:20,
    marginBottom:20,
    textAlign: 'flex-start',
    fontSize: 28,
  },
    lightText3: {
    flex:1,
    backgroundColor:'pink',
    color: '#000000',
    marginVertical: 1,
    marginTop:20,
    marginLeft:25,
    marginBottom:20,
    textAlign: 'flex-start',
    fontSize: 28,
  },
  lightText2: {
    color: '#000000',
    marginVertical: 2,
    textAlign: 'center',
  },
  darkText2: {
    color: '#ffffff',
    marginVertical: 2,
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: 700,
    marginBottom: 10,
    marginTop:5,
    justifyContent:'center',
    alignItems:'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    marginLeft: 10,
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
    activeTabd: {
    borderBottomColor: '#fff',
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
  darkTabText: {
    color: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
  },
  inforInBanner:{
    marginTop:10,
    flexDirection:'row',
  },
  priceRTag:{
    
  },
  mainTextCNT:{
   width:"100%",
   paddingVertical:15,
   paddingHorizontal:10,
  },
  mainLeftCTN:{
    width:"100%",
    padding: 10,
    backgroundColor: '#ffffff', // White background for text area
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Adds shadow for Android
  },
  mainText:{
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Dark text for readability
    fontWeight: '600',
  },
  headerText:{
    fontSize:25,
    fontWeight:"500",
  },
  image1:{
    marginVertical:10,
    width:"100%",
    height: 300,
  },
  headerText2:{
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Dark text for readability
    fontWeight: 'bold',
  },


  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bulletPoint: {
    fontSize: 20,
    lineHeight: 24,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },

    containerStyle: {
      backgroundColor: '#fff',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 16,
    },
    contentContainer: {
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      overflow: 'hidden',
      padding: 16,
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      marginRight: 8,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#333',
    },
    imagecnt: {
      width: 120,
      height: 220,
      borderRadius: 8,
    },
  
// img left , content right
customContentCTN:{
  width:"100%",
  flexDirection:'row',
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  padding: 16,
  justifyContent:'center',
  alignItems:'center'


},
imgCTN:{
  flex:1,
},
imgleft:{
  width:120,
  height:220,
  borderRadius:8,


},
textRightCTN:{
  flex:2,
  marginLeft:30
},
buttoncontent:{
  marginTop:10,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 5,
  alignItems: 'center',
},
buttonTextContent: {
  fontSize: 16,
  color: '#000',
},

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

containercarinfor: {
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
},
imageInfor: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
},
infoContainer: {
    padding:4,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
},
infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
},
infoValue: {
    fontSize: 16,
    marginBottom: 10,
},
learnMore: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
},


container1: {
  marginVertical:20,
  flex: 1,
  padding: 20,
  backgroundColor: "#f9f9f9",
  borderRadius:40,
},
centered: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
title: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
},
subtitle: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
  textAlign: "center",
},
text: {
  fontSize: 16,
  marginVertical: 5,
},
picker: {
  height: 50,
  width: "100%",
  marginTop: 20,
  backgroundColor: "#e8e8e8",
},
compareButton: {
  marginTop: 20,
  padding: 10,
  backgroundColor: "#4CAF50",
  alignItems: "center",
  borderRadius: 5,
},
buttonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},
modalContainer: {
  flex: 1,
  padding: 20,
  justifyContent: "center",
  backgroundColor: "#fff",
},
row: {
  flexDirection: "row",
  justifyContent: "space-between",
},
column: {
  flex: 1,
  padding: 10,
},



});

export default series5;
