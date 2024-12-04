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


const Home = ({ navigation }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const defaultCarName = "Seriesi7"; // Default car name
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
  const handleOptionPress = () => {
    setModalVisible(true);
  };



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
          source={{ uri: 'https://i.pinimg.com/564x/d0/85/fb/d085fb8caccd8801e2ff196e08f69750.jpg' }}
          style={styles.image}
        />
        <View style={{position:'absolute',top:500,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE 7</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>BMW 7 SERIES</Text>

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
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>4,499,000,000 VNĐ</Text>
            </View>
            <View style={{marginLeft:45}}> 
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Petrol</Text>
            </View>
        </View>
        </View>
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
               <Text style={styles.bulletText}>Pure elegance and multisensory entertainment come together in the new BMW 7 Series Sedan to produce an absolute premium driving experience: </Text>
                <Text style={styles.bulletText}>Welcoming scenario “Great Entrance Moments”</Text>
                <Text style={styles.bulletText}>Crystal headlights and illuminated BMW 'Iconic Glow' kidney grille</Text>
                <Text style={styles.bulletText}>Luxurious lounge atmosphere in the interior with individual My Model</Text>
            </View>
        </View>


        <Text style={styles.header}>EXTERIOR HIGHLIGHTS OF THE NEW BMW 7 SERIES SEDAN.</Text>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://i.pinimg.com/564x/d0/85/fb/d085fb8caccd8801e2ff196e08f69750.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Front design.</Text>
           <Text style={styles.bulletText}>Iconic front design. BMW ‘Iconic Glow’ crystal headlights with Swarovski crystal elements contour radiate personality.</Text>
        </View>
        </View>

        


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/a2ad1087940b9fd5bdce1abd527f0372/bmw_7_series_sedan_mc_design_exterior_02.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Side view..</Text>
           <Text style={styles.bulletText}>The flowing lines transform the sheer size of the new BMW 7 Series into aesthetically proportioned spaciousness. A chrome element highlights the Hofmeister kink like a precious jewel.</Text>
        </View>
        </View>



        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/28c098c5eebe1c42d3783ceb2de10a5e/bmw_7_series_sedan_mc_design_exterior_03.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Rear design.</Text>
           <Text style={styles.bulletText}>The L-shaped lights intensify the sensation of self-confident breadth. The tailpipes are installed invisibly, which reinforces the orderly character.</Text>
        </View>
        </View>



      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE NEW BMW 7 SERIES SEDAN – IMPRESSIONS..</Text>
             <Text style={styles.bulletText}>The design highlights of the new BMW 7 Series Sedan..​</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/9b6f195193affb420c05f02f6dca44e9/bmw_7_series_sedan_gallery_design_01_890.jpg' }}
                        style={styles.imgInford1}
                        />
                        <View style={styles.horizontalSpacing}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/7012dba3b634e171dcbf020247474939/bmw_7_series_sedan_gallery_design_02_890.jpg' }}
                          style={styles.imgInford1}
                      />

                      <View style={styles.horizontalSpacing}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/ae87ce4dc1347a7471290a6f4d7bc5ff/bmw_7_series_sedan_gallery_design_03_890.jpg' }}
                        style={styles.imgInford1}
                        />
                        <View style={styles.horizontalSpacing}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/10e6c571931a77a5e2f51814bbf87bc3/bmw_7_series_sedan_gallery_design_04_890.jpg' }}
                          style={styles.imgInford1}
                          />

             </View>
        </View>




        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.heading}>Exterior</Text>
                <Text style={styles.TextItem}>M Aerodynamics package</Text>
                <Text style={styles.TextItem}>LED fog lights</Text>
                <Text style={styles.TextItem}>18" M light alloy wheels Double-spoke style 848 M Bicolour</Text>
                <Text style={styles.TextItem}>M Sport brake with brake calipers in Dark Blue metallic and M designation</Text>
                <Text style={styles.TextItem}>Adaptive M suspension</Text>
                <Text style={styles.TextItem}>M sport differential</Text>
                <Text style={styles.TextItem}>Steptronic Sport transmission</Text>
                <Text style={styles.TextItem}>BMW Individual Exterior Line Aluminium satinised</Text>
                <Text style={styles.TextItem}>Exclusive Sanremo Green metallic exterior colour; other exterior colours available</Text>
            </View>
          </View>


          
        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.heading}>Interior</Text>
                <Text style={styles.TextItem}>Leather 'Vernasca' Oyster with decor stitching; other upholsteries available</Text>
                <Text style={styles.TextItem}>M Leather steering wheel</Text>
                <Text style={styles.TextItem}>sAluminium Rhombicle Anthracite M interior trim</Text>
                <Text style={styles.TextItem}>Ambient light</Text>
                <Text style={styles.TextItem}>Storage compartment package</Text>
                <Text style={styles.TextItem}>Automatic air conditioning</Text>
            </View>
          </View>





          <View style={styles.mainTextCNT}>
          <View style={styles.mainLeftCTN}>

                  <Image
                    source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1720,h_782,q_auto,c_fill,f_auto,fl_lossy/auto-titan/f1679a1cb2d51fe65e39b234d2720d80/bmw_4_series_convertible_individual_sd_01.jpg' }}
                    style={styles.image1}
                    />
          </View>
          </View>




        {/* center content */}

        
        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Text style={styles.headerText}>INTERIOR HIGHLIGHTS OF THE NEW BMW 7 SERIES SEDAN.</Text>
          <Text style={styles.heading}>Innovative ambience in the cockpit.</Text>
          <Text style={styles.bulletText}>The BMW Interaction Bar, a multifunctional control element, extends horizontally across the entire cockpit. Completing the multimedia experience is the 14.9” BMW Curved Display.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/c8ddba0073d651c7938cce1817e999d2/bmw_7_series_sedan_mc_design_interior_01.jpg' }}
                  style={styles.image1}
                  />  
        </View>
        </View>




        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Text style={styles.headerText}>Panorama glass roof Sky Lounge.</Text>
          <Text style={styles.bulletText}>The Panorama glass roof Sky Lounge allows a lot of light into the interior during the day. At night it creates an incomparable ambience by using dynamic light effects.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/5e9139913ab9be4d3f109714f15c1fac/bmw_7_series_sedan_mc_design_interior_03.jpg' }}
                  style={styles.image1}
                  />  
        </View>
        </View>



        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.bulletText}>*Content, services, and features vary, may not be available in all areas and languages, and may require separate subscriptions. For a country-specific streaming and entertainment offer in China, BMW partnered with Huawei and Iqiyi. As a prerequisite for video streaming the personal eSIM in the vehicle needs to be activated via the data plan of the customers’ mobile network operator.</Text>
        </View>
        </View>

        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.headerText}>Fuel consumption and CO2 emissions of the BMW 4 Series Convertible.</Text>
            <Text style={styles.TextItem}>BMW 430i Convertible:</Text>
            <Text style={styles.TextItem}>Fuel consumption in l/100 km (combined): 8.25</Text>
            <Text style={styles.TextItem}>CO2 emissions in g/km (combined): 196.76</Text>
        </View>
        </View>




        {/* left - right */}

        {/* <View style={styles.containerStyle}>
          <Text style={styles.title}>FINANCING AND LEASING OF THE BMW 4 SERIES GRAN COUPÉ.</Text>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>
              BMW FINANCIAL SERVICES FOR THE BMW 4 SERIES GRAN COUPÉ.</Text>
              <Text style={styles.description}> Whether for financing or leasing – each of our offers is individually adapted to your needs and desires. Find out more about attractive financing solutions or the appropriate leasing offer for your new BMW 4 Series Gran Coupé.
              </Text>
            </View>
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/e9/e0/8e/e9e08edcf0ac747ff9a8584d3cb33c51.jpg' }} // Replace with the actual image URL
              style={styles.imagecnt}
              resizeMode="cover"
            />
          </View>
        </View> */}


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



      {/* Modal cho các chức năng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: 'white' }]}>
            <Text style={styles.modalTitle}>Chức năng</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Android Shadow
    elevation: 8,
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
    height:200,
  },


  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: '#333',
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

fordIMGCNT1:{
  width:'100%',
},
imgInford1:{
  width:"100&",
  height:200,
  margin:10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  // Android Shadow
  elevation: 8,
},
horizontalSpacing:{
  height:1,
  width:"100%",
  backgroundColor:"black",
  marginVertical:10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  // Android Shadow
  elevation: 8,
},
TextItem:{
  fontSize:16,
  fontWeight:'300',
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

export default Home;
