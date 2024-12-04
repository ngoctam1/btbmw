import React, { useRef, useState } from 'react';
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
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


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
          source={{ uri: 'https://i.pinimg.com/564x/e4/5f/d8/e45fd835cb506652a75420eec26e03e0.jpg' }}
          style={styles.image}
        />
         <View style={{position:'absolute',top:450,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE NEW i7</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>BMW i7</Text>

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
                <View>
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Prices From</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>VND 6,799,000,000</Text>
                </View>

                <View style={{marginLeft:20}}>
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Full Electric</Text>
                </View>
            </View>
        </View>
        </View>
        </View>


        
        <View style={styles.InVisisbleSpace}></View>

        
        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.bulletText}>The first fully electric BMW i7 combines electric performance and multisensory entertainment to produce an unforgettable motoring experience.</Text>
            </View>
          </View>

          <View style={styles.InVisisbleSpace}></View>
        



        <View style={styles.InVisisbleSpace}></View>
        <View style={styles.InVisisbleSpace}></View>



        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'EXTERIOR HIGHLIGHTS OF THE NEW BMW i7.' }}
                  style={styles.image1}
                  />

                <Text style={styles.heading}>Front design.</Text>
                <Text style={styles.bulletText}>Iconic front design. BMW ‘Iconic Glow’ crystal headlights with Swarovski crystal elements and an illuminated kidney contour radiate personality.</Text>
         
        </View>
        </View>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/ea3649c8f2558ca4d007817c0a549bb0/bmw_7_series_i7_mc_design_exterior_02.jpg' }}
                  style={styles.image1}
                  />

                <Text style={styles.heading}>Side view.</Text>
                <Text style={styles.bulletText}>The flowing lines transform the sheer size of the new BMW i7 into aesthetically proportioned spaciousness. A chrome element highlights the Hofmeister kink like a precious jewel.</Text>
         
        </View>
        </View>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/467939a2358e2e3a2c21e27daf3e64a1/bmw_7_series_i7_mc_design_exterior_03.jpg' }}
                  style={styles.image1}
                  />

                <Text style={styles.heading}>Rear design.</Text>
                <Text style={styles.bulletText}>Narrow, L-shaped rear lights and slim chrome strip emphasise the effect of breadth. Blue design elements signal the innovative drive system.</Text>
         
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

        




        


      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>LUXURIOUS COMFORT IN THE NEW BMW i7.</Text>
             <View style={styles.fordIMGCNT1}>
             <View style={styles.InVisisbleSpace}></View>
                        

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/5fd78a535fc482e6754b013fafbd41e2/bmw_7_series_i7_comfort_01.jpg' }}
                        style={styles.imgInford1}
                        />
                         <Text style={styles.heading}>Executive Lounge Seating.</Text>
                         <Text style={styles.bulletText}>Lean back and enjoy: Executive Lounge Seating offers you a comfortable and restful position as a rear-seat passenger behind the driver with continuous leg rest.
                         *Optional.</Text>

                        
                       <View style={styles.InVisisbleSpace}></View>


                     
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/365b6a1814a7ff6671f68382a5ffeb94/bmw_7_series_i7_mc_comfort_02.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text style={styles.heading}>Rear doors with integrated touchscreens.</Text>
                         <Text style={styles.bulletText}>Elegantly integrated into the rear doors, two 5.5” touchscreens allow you to conveniently operate the Infotainment system, the 31.3” BMW Theatre Screen, automatic air conditioning, the seat setting and more.</Text>
                       <View style={styles.InVisisbleSpace}></View>


        
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/fdb31a36901497bf597c5c7e45b9ff1f/bmw_7_series_i7_mc_comfort_03.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text style={styles.heading}>Bowers & Wilkins Diamond surround sound system.</Text>
                        <Text style={styles.bulletText}>With 35 tweeters and mid-range speakers, subwoofer and shaker, the Bowers & Wilkins Diamond Surround Sound System creates a 4D audio experience with 1,965 watts to send the ears on a fascinating journey as well.
                        *Optional</Text>
                       <View style={styles.InVisisbleSpace}></View>



             </View>
        </View>





      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE NEW BMW i7 – IMPRESSIONS.</Text>
             <View style={styles.fordIMGCNT1}>

                        <Text style={styles.heading}>BMW kidney 'Iconic Glow' contour lighting.</Text>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/9f8ba949bb56c3f8c4c371e60d1d4c1c/bmw_7_series_i7_gallery_image_design_01_890.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


                        <Text style={styles.heading}>Welcome Light Carpet ground lighting.</Text>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/8b3b27479cc8eba869926c49d3575b99/bmw_7_series_i7_gallery_image_design_02_890.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>

                       
                       <Text style={styles.heading}>Curved Display and BMW Interaction Bar with faceted look.</Text>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/d5518b3fa194675a00b5a4edbee400e9/bmw_7_series_i7_gallery_image_design_03_890.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>

                       <Text style={styles.heading}>Sky Lounge panoramic glass sunroo</Text>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/8bb747550e6b9356e56da414c001cc06/bmw_7_series_i7_gallery_image_design_04_890.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>

        <View style={styles.InVisisbleSpace}></View>





        {/* center content */}

        
        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_841,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/acbe3a213f7a1787bcd4d872569a4cca/bmw_7_series_i7_ms_sustainability.jpg' }}
                  style={styles.image1}
                  />  

            <Text style={styles.heading}>SUSTAINABILITY IN THE NEW BMW i7.</Text>
            <Text style={styles.TextItem}>The raw materials cobalt and lithium used in the high-voltage battery of the new BMW i7 originate from responsible mining</Text>
            <Text style={styles.TextItem}>The motor of the new BMW i7 manages entirely without rare earths</Text>
            <Text style={styles.TextItem}>Recycled materials such as the plastic thread Econyl in the floor panelling of the new BMW i7 conserve existing resources</Text>
        </View>
        </View>

        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_841,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/d3b18690b170e75653767fb25b40db65/bmw_7_series_i7_ms_electric_driving.jpg' }}
                  style={styles.image1}
                  />  

            <Text style={styles.heading}>RANGE AND CHARGING THE NEW BMW i7.</Text>
            <Text style={styles.TextItem}>625 km* of electric range for your daily drive</Text>
            <Text style={styles.TextItem}>Low consumption of only 19.6–18.4 kWh/100 km* through technologies such as recuperation during braking</Text>
            <Text style={styles.TextItem}>Maximum efficiency with lightweight construction methods and aerodynamic design</Text>
        </View>
        </View>






    




<View style={styles.mainTextCNT}>
<View style={styles.mainLeftCTN}>
  <Text style={styles.headerText}>TECHNICAL DATA OF THE BMW i4. </Text>
  <Text style={styles.heading}>BMW i4 eDrive40.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_841,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/09c570e05d408e3a24a1c9b89dc977f8/bmw_7_series_i7_mb_technical_mediumteaser.jpg' }}
                  style={styles.image1}
                  />    

                <View style={styles.powDetailsTextCtn}>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Engine power in kW (hp) at 1/min:</Text>
                        <Text style={styles.value}>400 (544)*</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Maximum torque in Nm:</Text>
                        <Text style={styles.value}>745*</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Acceleration 0–100 km/h in s:</Text>
                        <Text style={styles.value}>4.7</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Electric range in km (WLTP):</Text>
                        <Text style={styles.value}>up to 625 km*</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Maximum charging capacity:</Text>
                        <Text style={styles.value}> 10.5 hour
                        </Text>
                    </View>
                </View>              

          </View>
          </View>

{/* 
          <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.heading}>FUEL CONSUMPTION AND CO2 EMISSIONS.</Text>
            <Text style={styles.TextItem}>BMW Z4 Roadster sDrive20i:</Text>
            <Text style={styles.TextItem}>Fuel consumption in l/100 km (combined): 8.2</Text>
            <Text style={styles.TextItem}>CO2 emissions in g/km (combined): 189.52</Text>
        </View>
        </View> */}


        <View style={styles.containerStyle}>
          <View style={styles.customContentCTN}>
            <View style={styles.imgCTN}>
            <Image
                source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_850,h_478,q_auto,c_fill,f_auto,fl_lossy/auto-titan/e5e1906b0fb456c6db8ca230b97c2aa6/bmw_x4_onepager_wide_teaser_dlo.jpg' }} 
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





        <View style={styles.InVisisbleSpace}></View>
        <View style={styles.InVisisbleSpace}></View>

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

    flexDirection:'row'
    
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

TextItem:{
  fontSize:16,
  fontWeight:'300',
},
powDetailsTextCtn: {
    padding: 16,
    backgroundColor: '#fff',
},
powTextItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
},
label: {
    fontSize: 12,
    color: '#333',
},
value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
},

InVisisbleSpace:{
    width:"100%",
    marginVertical:40,
}
});

export default Home;
