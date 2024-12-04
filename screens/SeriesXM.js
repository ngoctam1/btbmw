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
  const defaultCarName = "SeriesXM"; // Default car name
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

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'],
    extrapolate: 'clamp'
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.6],
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



 const hanldeLogoPress = ()=>{
   toggleDropdown();
   toggleMenu();
 }



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
          source={{ uri: 'https://i.pinimg.com/736x/f8/63/34/f863345ea130225b10af1f45c9bd218e.jpg' }}
          style={styles.image}
        />
         <View style={{position:'absolute',top:500,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE XM</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>THE FIRST-EVER BMW XM</Text>

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
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>VND 10,999,000,000</Text>
                </View>

                <View style={{marginLeft:20}}>
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Petrol</Text>
                </View>
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
                <View style={styles.InVisisbleSpace}></View>
                <Text style={styles.headerText}>THE FIRST-EVER BMW XM.</Text>
                <Text style={styles.heading}>The new BMW XM combines an impressive appearance with the high performance of BMW M and the powerful plug-in hybrid technology of the latest generation.</Text>
            </View>
          </View>

          <View style={styles.InVisisbleSpace}></View>
        





        


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
        <Text style={styles.headerText}>PLUG-IN HYBRID DRIVING EXPERIENCE IN THE FIRST-EVER BMW XM.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_956,q_auto,c_fill,f_auto,fl_lossy/auto-titan/43380e4cade3fca8a9d60effb68943a3/bmw_x_series_xm_phev_mc_electric_driving_hero_desktop.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Innovative technologies to support electric driving and charging.</Text>
           <View style={styles.spacingText}></View>

           <Text style={styles.bulletText}>82–88 km purely electric range (WLTP) and intelligent driving modes for full flexibility</Text>
           <Text style={styles.bulletText}>Maximum driving pleasure with supreme efficiency</Text>
           <Text style={styles.bulletText}>Efficient combustion engine with 360 kW (489 hp) and BMW eDrive power unit with 145 kW (197 hp)</Text>
        </View>
        </View>




        


      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>COCKPIT AND TECHNOLOGIES IN THE FIRST-EVER BMW XM.</Text>
             <View style={styles.fordIMGCNT1}>
             <View style={styles.InVisisbleSpace}></View>
                        

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_956,q_auto,c_fill,f_auto,fl_lossy/auto-titan/4c5589adadb19582eb386d3ebb241e02/bmw_x_series_xm_mc_cockpit_technologies_hero_desktop.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


                       <Text style={styles.heading}>M-specific display concept through BMW Operating System 8.</Text>
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/8ad535d5a0d6f1bae394a6845950480b/bmw_x_series_xm_mc_cockpit_technologies_instruments_01.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


                       <Text style={styles.heading}>BMW Curved Display.</Text>
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/56c6ec088331ef48f6b42b4386c374a1/bmw_x_series_xm_mc_cockpit_technologies_instruments_02.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


                       <Text style={styles.heading}>Bowers & Wilkins Diamond Surround Sound System..</Text>
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/a9329791d4f739c8b528b11fb8075d87/di22_000092106.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


                       <Text style={styles.heading}>Trunk space.</Text>
                       <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/6fdeec5e68005020485552cc15378ed5/di22_000085973.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>


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
             <Text style={styles.headerText}>THE DESIGN IN THE EXTERIOR AND INTERIOR OF THE BMW Z4 ROADSTER.</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_1700,h_956,q_auto,c_fill,f_auto,fl_lossy/auto-titan/43380e4cade3fca8a9d60effb68943a3/bmw_x_series_xm_phev_mc_electric_driving_hero_desktop.jpg' }}
                        style={styles.imgInford1}
                        />
                       <View style={styles.InVisisbleSpace}></View>
                       <Text style={styles.heading}>Interior</Text>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/f8df1c350f41691d9182bfeee3dfa770/bmw_x_series_xm_phev_mc_electric_driving_01.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>M Hybrid.</Text>
                       <Text style={styles.bulletText}>Switch between the purely electric drive and the hybrid mode at the touch of a button with the interaction between electric motor and powerful V8 engine. At the same time, intelligent driving modes optimise the driving experience.</Text>
                       <View style={styles.InVisisbleSpace}></View>

                       <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/320f50647525519216dc9cda1c535e87/bmw_x_series_xm_phev_mc_electric_driving_02.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>82–88 km range with the new BMW XM.
                       </Text>
                       <Text style={styles.bulletText}>The efficient BMW eDrive system with 145 kW (197 hp) enables 82–88 km WLTP of purely electric driving. This means you travel almost silently and free of local emissions.</Text>
                       <View style={styles.InVisisbleSpace}></View>

                       <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/ede73c485f631684aa2cca82eaefa665/bmw_x_series_xm_phev_mc_electric_driving_03.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>BMW Wallbox.
                       </Text>
                       <Text style={styles.bulletText}>Every BMW XM comes with a complementary home charging package including BMW wallbox and its installation.</Text>
                       <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>

        <View style={styles.InVisisbleSpace}></View>


      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE EXTERIOR DESIGN OF THE FIRST-EVER BMW XM.</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/8f7f30e6644294b4faf6fc30a5861697/bmw_x_series_xm_mc_exterior_01.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text  style={styles.heading}>Front design.</Text>
                       <Text style={styles.bulletText}>The iconic front in the style of the BMW luxury class inspires with its “Iconic Glow” illuminated kidney grille and thin daytime running lights typical of M. The distinctive grille with the BMW XM logo and exclusive Night Gold accents exudes luxury and exclusivity. The powerful sculpted bonnet merges smoothly into two Power bulges.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/79502fa285ba25619964579836bea6cd/bmw_x_series_xm_mc_exterior_02.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>Side view.</Text>
                       <Text style={styles.bulletText}>The side view combines the strong character of the design in coupé style with powerful proportions and styling highlights such as the darkest windows of the entire BMW model range. Both the 23” light alloy wheels and the accent band that make the shaping of the new BMW XM unique create an especially exclusive effect in the accent colour Night Gold.</Text>

                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/3fe627850e47cdd9fa4dc2f55691bead/bmw_x_series_xm_mc_exterior_03.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Rear design.</Text>
                       <Text style={styles.bulletText}>The vertical, hexagonal M twin tailpipes give the rear with gold-coloured diffuser accents and the new XM logo a unique presence. The two BMW logos lasered on either side of the rear window make reference to the last “M only” model – the BMW M1. Together with the wheel arches, the surrounding rear lights emphasise the robust, broad stance.</Text>
                       <View style={styles.InVisisbleSpace}></View>
             </View>
        </View>







        {/* center content */}

        
        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.headerText}>BMW FINANCIAL SERVICES FOR THE FIRST-EVER BMW XM.</Text>
          <Text style={styles.bulletText}>Whether for financing or leasing – each of our offers is individually adapted to your needs and desires.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/3e4fc2d8f857cbf500e3ce68e178fba2/bmw_x_series_xm_ms_bmw_financial_services.jpg' }}
                  style={styles.image1}
                  />  
        </View>
        </View>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
            <Text style={styles.headerText}>PROACTIVE CARE FOR THE FIRST-EVER BMW XM.</Text>
          <Text style={styles.bulletText}>Proactive Care automatically recognises any upcoming service or repair work required for your vehicle and contacts you proactively.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/810e9dc60655daca7bc348bff493208f/bmw_x_series_xm_ms_bmw_proactive_care.jpg' }}
                  style={styles.image1}
                  />  
        </View>
        </View>




        





<View style={styles.mainTextCNT}>
<View style={styles.mainLeftCTN}>
  <Text style={styles.headerText}>TECHNICAL DATA OF THE BMW Z4 ROADSTER.</Text>
  <Text style={styles.heading}>The BMW Z4 sDrive20i</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/f97dbbe1e08685f065eaaf87df94db92/bmw_x_series_xm_mb.jpg' }}
                  style={styles.image1}
                  />    

                <View style={styles.powDetailsTextCtn}>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Engine power in kW (hp) at 1/min:</Text>
                        <Text style={styles.value}>480 (653)</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Acceleration 0–100 km/h in s:</Text>
                        <Text style={styles.value}>4.3</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>1.6–1.5</Text>
                        <Text style={styles.value}>8.2</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>CO2 combined emissions in g/km (WLTP):</Text>
                        <Text style={styles.value}>36–33
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
spacingText:{
    width:"100%",
    height:10,
},
InVisisbleSpace:{
    width:"100%",
    marginVertical:40,
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
