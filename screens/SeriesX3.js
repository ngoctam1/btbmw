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
          source={{ uri: 'https://i.pinimg.com/564x/c9/ca/06/c9ca0670cc2cbef6bfc3fa3b537f4011.jpg' }}
          style={styles.image}
        />
        <View style={{position:'absolute',top:450,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE X3</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>BMW X3</Text>

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
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>VND 1,855,000,000</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Petrol</Text>
            </View>
        </View>
        </View>
        </View>



        
        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.headerText}>THE EXTERIOR OF THE BMW X3.</Text>
            </View>
          </View>

        





        


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_840,q_auto,c_fill,f_auto,fl_lossy/auto-titan/af4653e9f1ade692449e8e4b520bdf63/image_2024_06_13t09_12_08_194z.png' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>FRONT DESIGN OF THE BMW X3 WITH NEW BMW KIDNEY.</Text>
           <Text style={styles.bulletText}>The extreme emphasis on breadth and X typical elements give the front of the BMW X3 an extremely distinctive look. An especially angular BMW kidney grille and the redesigned bumper with vertical air inlets in the triangular interpretation highlight its exceptional authority. The full LED headlights lowered by approx. 10mm complete the overall picture of the BMW X3 with a modern and focused expression.</Text>
        </View>
        </View>



        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_840,q_auto,c_fill,f_auto,fl_lossy/auto-titan/6e254c7017a39d3fb76672cf6f39f90e/image_2024_06_13t09_11_00_660z.png' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>REAR DESIGN OF THE BMW X3 WITH FULL-LED REAR LIGHTS.</Text>
           <Text style={styles.bulletText}>The redesigned rear of the BMW X3 creates an effect that is both striking and modern. Full LED headlights in a new 3-dimensional further emphasise its presence. Broad, flush free-form tailpipes pick up on the horizontal lines in the upper section and underline the modernity. Combined with the redesigned underbody protection, the rear of the BMW X3 presents a clear and powerful face to the road.</Text>
        </View>
        </View>


    <View style={styles.dropdownCtn}>
      {isOpen && (
        <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
          <TouchableOpacity onPress={() => navigation.navigate('DangKy')} style={styles.dropdownItem}><Text>Book A Test Drive</Text></TouchableOpacity >

           <TouchableOpacity onPress={() => navigation.navigate('SeeAllCars')}  style={styles.dropdownItem}><Text>View all cars</Text></TouchableOpacity >
  
           <TouchableOpacity onPress={() => navigation.navigate('Home')}  style={styles.dropdownItem}><Text>Home</Text></TouchableOpacity >
         
        </Animated.View>
      )}
    </View>


      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>DESIGN HIGHLIGHTS OF THE BMW X3 IN THE INTERIOR.</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_773,q_auto,c_fill,f_auto,fl_lossy/auto-titan/0ff0d84616e7bca2f41ff0aa8b48b210/bmw_x3_onepager_mc_interieur_hero_desktop.jpg' }}
                        style={styles.imgInford1}
                        />
                        <View style={styles.horizontalSpacing}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/2c5971526ee57d3d54c125b48959c33a/the_x3_msport_1.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>BMW Live Cockpit Professional.</Text>
                       <Text style={styles.bulletText}>The BMW Live Cockpit Professional with navigation function includes two high-quality displays consisting of a high-resolution 12.3" Control Display that can be operated by touch and a fully digital 12.3" instrument display. The BMW Operating System 7 can also be operated via the iDrive Touch Controller.</Text>
                      
                      <View style={styles.InVisisbleSpace}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/4dda4332e3f8cea841ffd843b0b83643/the_x3_msport_5.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Sport seats for driver and front passenger.</Text>
                       <Text style={styles.bulletText}>The adjustable Sport seats for the driver and front passenger feature numerous manual adjustment options, including fore-and-aft position, and the backrest and seat angle. Addition for the driver: backrest width adjustment.</Text>
                      
                      <View style={styles.InVisisbleSpace}></View>
                      <View style={styles.InVisisbleSpace}></View>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/da28cb5ed07cb016099672e20e88b033/the_x3_msport_3.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Driver and front passenger seats with electric adjustment.</Text>
                       <Text style={styles.bulletText}>Front seats with electric adjustment and memory function for the driver's seat, functional buttons on the steering wheel, door control panel, and door lock switch create an impressive driving experience.</Text>
                      <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>



        <View style={styles.InVisisbleSpace}></View>


      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>BMW iX3 M Sport WITH BMW eDRIVE MODES.</Text>
             <Text style={styles.bulletText}>With the BMW iX3 M Sport, you experience sustainable mobility and efficient driving dynamics. Explore the numerous benefits of this innovative BMW hybrid vehicle and find out more about drive concept, driving dynamics, BMW Charging and practical digital services from BMW ConnectedDrive.</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_956,q_auto,c_fill,f_auto,fl_lossy/auto-titan/cec1dc8211929f9a3bd327ac3a7014bf/p90432164_highres_the_new_bmw_ix3_8_20.jpg' }}
                        style={styles.imgInford1}
                        />
                        
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/711af1f6aeaa2b5538a8961acc679f71/screenshot_2024_06_26_115052.png' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>20" BMW Y-spoke 695 matte black aluminum alloy wheels..</Text>
                       <Text style={styles.bulletText}>The 20" light alloy BMW Y-spoke style 695 wheels in matte black. The complete summer tire set comes with a tire pressure monitoring system and run-flat tires.</Text>
                      
                      <View style={styles.InVisisbleSpace}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/35747a01d0d66c620f589ec4fe8395ee/bmw_x3_onepager_mc_plug_in_hybrid_02.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Drive modes of the BMW iX3 M Sport.</Text>
                       <Text style={styles.bulletText}>Whether HYBRID/HYBRID ECO PRO, ELECTRIC or SPORT/XTRA BOOST: you benefit from intelligent driving modes that ensure the optimum interplay of combustion engine and electric motor for every situation.</Text>
                     
                        <View style={styles.InVisisbleSpace}></View>  

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/2fb4b3a9b4742620a17ceddd8ea8ecac/bmw_x3_onepager_mc_plug_in_hybrid_03.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Charging the BMW iX3 M Sport.</Text>
                       <Text style={styles.bulletText}>The charging time (0–100%) for the BMW iX3 M Sport is approx. 3.7 hours at a charging capacity of 3.7 kWh (BMW Wallbox, public charging stations) and approx. 5.9 hours at a charging capacity of 2.3 kWh (domestic socket). The supply schedule of the BMW iX3 M Sport includes a cable for public charging.</Text>
                      
                         <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>


          


        <View style={styles.InVisisbleSpace}></View>


          <View style={styles.mainTextCNT}>
          <View style={styles.mainLeftCTN}>

                  <Image
                    source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_1133,q_auto,c_fill,f_auto,fl_lossy/auto-titan/ebac20e647a8735308e44e1754c00515/bmw_x4_onepager_mc_bmw_accessoires_hero_desktop.jpg' }}
                    style={styles.image1}
                    />
          </View>
          </View>



          <View style={styles.InVisisbleSpace}></View>

        {/* center content */}

        
        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.headerText}>BMW BROCHURE APP: ALL BMW MODELS AND THEIR DETAILS.</Text>
          <Text style={styles.heading}>Discover all BMW models and their highlights with the BMW Brochure App.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/b2bbbc63819f7866808a71ad15f02e1e/bmw_x3_onepager_ms_catalogue_app.jpg' }}
                  style={styles.image1}
                  />  
        </View>
        </View>



        <Text style={styles.headerText}>Fuel consumption and CO2 emissions of the BMW X3.</Text>

        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.heading}>X3 sDrive20i:</Text>
            <Text style={styles.TextItem}>Certificate number: 22KDR/000082</Text>
            <Text style={styles.TextItem}>Extra-urban fuel consumption: 6.7 (L/100km)</Text>
            <Text style={styles.TextItem}>Combined fuel consumption: 7.3 (L/100km)</Text>
        </View>
        </View>

        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.heading}>X3 xDrive30i M sport:</Text>
            <Text style={styles.TextItem}>Certificate number: 22KDR/000083</Text>
            <Text style={styles.TextItem}>Extra-urban fuel consumption: 7.2 (L/100km)</Text>
            <Text style={styles.TextItem}>Combined fuel consumption: 7.9 (L/100km)</Text>
        </View>
        </View>

        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.heading}>X3 sDrive20i M sport:</Text>
            <Text style={styles.TextItem}>Certificate number: 22KDR/000088</Text>
            <Text style={styles.TextItem}>Combined fuel consumption: 7.3 (L/100)</Text>
            <Text style={styles.TextItem}>CO2 emissions in g/km (combined): 196.76</Text>
        </View>
        </View>






<View style={styles.mainTextCNT}>
<View style={styles.mainLeftCTN}>
  <Text style={styles.headerText}>TECHNICAL DATA OF THE BMW X3.</Text>
  <Text style={styles.heading}>X3 sDrive20i M Sport</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/4d1a29b2fa1b67ce2d8d3b8a9fbdc8bb/bmw_x3_onepager_model_brief_tech_data.jpg' }}
                  style={styles.image1}
                  />    

                <View style={styles.powDetailsTextCtn}>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Engine power in kW (hp) at 1/min:</Text>
                        <Text style={styles.value}>135 (184)/5,000-6,500</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Max. torque in Nm at 1/min:</Text>
                        <Text style={styles.value}>500 Nm @ 1600-4500 vòng/phút</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Acceleration 0–100 km/h in s:</Text>
                        <Text style={styles.value}>5.4</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Fuel consumption in l/100 km (combined):</Text>
                        <Text style={styles.value}>10.6-9.6</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>CO2 combined emissions in g/km:</Text>
                        <Text style={styles.value}>175</Text>
                    </View>
                </View>              

          </View>
          </View>


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

  headerText:{
    fontSize:25,
    fontWeight:"500",
  },
  image1:{
    marginVertical:10,
    width:"100%",
    height:300,
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
