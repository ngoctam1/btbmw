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


const Home = ({ navigation }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const toggleSwitch = () => setIsDarkTheme(previousState => !previousState);
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const defaultCarName = "Series3"; // Default car name
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
          source={{ uri: 'https://i.pinimg.com/736x/76/01/60/760160256017607f173ea598b8a1a72d.jpg' }}
          style={styles.image}
        />
         <View style={{position:'absolute',top:60,left:40}}>
            <Text style={{fontSize:50,fontWeight:'200',color:'white'}}>THE X6</Text>
            <Text style={{fontSize:25,fontWeight:'400',color:'white'}}>THE BMW X6: ALL HIGHLIGHTS</Text>

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
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>VND 3,799,000,000</Text>
                <Text style={{fontSize:20,color:'white',fontWeight:'200'}}>Fuel Type</Text>
                <Text style={{fontSize:15,color:'white',fontWeight:"400"}}>Petrol</Text>
            </View>
        </View>
        </View>
        </View>





              {isMenuVisible && (
        <Animated.View
          style={[
            styles.dropdown,
            {
              opacity: animationValue,
              transform: [
                {
                  translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0], // Adjust the dropdown starting position
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.menuItem}>Option 1</Text>
          <Text style={styles.menuItem}>Option 2</Text>
          <Text style={styles.menuItem}>Option 3</Text>
        </Animated.View>
      )}



        
        <View style={styles.mainTextCNT}>
            <View style={styles.mainLeftCTN}>
                <Text style={styles.TextItem}>X6 xDrive40i:</Text>
                <Text style={styles.TextItem}>Combined in l/100 km: 13.33</Text>
                <Text style={styles.TextItem}>Urban in l/100 km: 16.19</Text>
                <Text style={styles.TextItem}>Extra-urban in l/100 km: 11.68</Text>
                <Text style={styles.TextItem}>Certificate Number: 22KDN/000270</Text>
                <View style={styles.spacingText}></View>
                <Text style={styles.TextItem}>The BMW X6 features a unique appearance paired with sporty sovereignty thanks to powerful engine, precise chassis and equipment.</Text>
            </View>
          </View>

        





        


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
        <Text style={styles.headerText}>THE DESIGN HIGHLIGHTS OF THE BMW X6.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/64d707ac4a3722091dba9e93b1bc15c0/bmw_x6_onepager_mc_design_exterior_01.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Welcome Light Carpet.</Text>
           <Text style={styles.bulletText}>The Welcome Light Carpet function projects an ambient light graphic in front of the vehicle doors and creates a surrounding welcome ambience right at the entrance. The light carpet also makes getting out in the dark even more comfortable and safe.</Text>
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
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/9388cf3ae16e3eab7b1cafde264311ce/bmw_x6_onepager_mc_design_exterior_02.jpg' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Panorama glass roof.</Text>
           <Text style={styles.bulletText}>When open, the Panorama glass roof provides a great deal of fresh air. Closed, it creates a bright, light-flooded atmosphere in the interior. It opens and closes completely automatically at the push of a button or with the vehicle key, and is equipped with slide and lift functions, roller sunblind and wind deflector.</Text>
        </View>
        </View>


        <View style={styles.mainTextCNT}>
        <View style={styles.mainLeftCTN}>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_crop,f_auto,fl_lossy,x_0,y_137,w_633,h_356/w_547,h_308,c_fill/auto-titan/9834507a8d55353e27216d0f08021ec7/image_2024_07_27t06_31_03_953z.png' }}
                  style={styles.image1}
                  />
            {/* <Text style={styles.heading}>BMW Head-Up Display.</Text> */}
           
           <Text  style={styles.heading}>Alloy wheels.</Text>
           <Text style={styles.bulletText}>20" M light alloy wheels Star-spoke style 740 M Bicolour with runflat tyres. Front with 275/45 R20 tyres. Rear with 305/40 R20 tyre.</Text>
        </View>
        </View>




      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>Interior</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_835,h_380,q_auto,c_fill,f_auto,fl_lossy/auto-titan/a0b561618e6971f5c02d55666fb0be7c/bmw_x6_onepager_mc_design_interior_01.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text  style={styles.heading}>Ambient light.</Text>
                       <Text style={styles.bulletText}>The standard Ambient light, including Ambient contour lighting in the front and rear doors, creates a relaxed, cosy lighting atmosphere in the interior. The Welcome Light Carpet illuminates the area in front of the vehicle doors when entering and exiting. Six dimmable light designs in White, Blue, Orange, Bronze, Lilac and Green are available.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_crop,f_auto,fl_lossy,x_0,y_98,w_1960,h_891/w_835,h_380,c_fill/auto-titan/79df6cd63d0e7ec298779109810bff54/bmw_x6_onepager_mc_design_interior_02.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>Glass application 'CraftedClarity' for interior elements.</Text>
                       <Text style={styles.bulletText}>The 'CraftedClarity' glass application comprises hand-made glass elements that visually and tactilely enhance the interior. The details of the gear selector, BMW Controller and Start/Stop button are made of fine crystal.</Text>
                       <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>




      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>THE DRIVING DYNAMICS OF THE BMW X6.</Text>
             <Text style={styles.bulletText}>The top performance of the 530-hp 8-cylinder petrol engine, the outstanding precision of the Adaptive M suspension Professional or the effortless cooperation between Adaptive 2-axle air suspension and xOffroad package make the BMW X6 a superior Sports Activity Coupé on any terrain.</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/a44fd0f2cd4b19f8568350b9b543d49d/bmw_x6_onepager_mc_driving_dynamics_01.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text  style={styles.heading}>M Sport exhaust system.</Text>
                       <Text style={styles.bulletText}>The M sport exhaust system delivers a sound that can be adjusted to an even more intense engine sound with the driving dynamics buttons in the SPORT and SPORT+ programmes, while the comfort-oriented programme prioritises more discreet engine acoustics.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/aa4c411e1a7d8896eee316da6138bd24/bmw_x6_onepager_mc_driving_dynamics_02.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>Adaptive M suspension</Text>
                       <Text style={styles.bulletText}>The Adaptive M suspension can be electrically adjusted at any time to suit the road and driving conditions. You can also adjust the suspension characteristics via the Driving Experience Control to enable your preferred driving style at the time – from comfortable to extremely athletic with markedly agile handling.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/117f0d7a0cddce32c01d73e80a7dbd63/bmw_x6_onepager_mc_driving_dynamics_03.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>M Carbon rear spoiler.</Text>
                       <Text style={styles.bulletText}>The M Carbon rear spoiler emphasises the vehicle's powerful, sporty design and noticeably reduces unwanted aerodynamic uplift on the rear axle.</Text>
                       <View style={styles.InVisisbleSpace}></View>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_403,h_227,q_auto,c_fill,f_auto,fl_lossy/auto-titan/2aabec7a3b04ceab1e4546c199753b4e/bmw_x6_onepager_mc_driving_dynamics_04.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Sport seats for driver and front passenger.</Text>
                       <Text style={styles.bulletText}>Dynamic and comfortable: the standard and individually adjustable Sport seats for the driver and front passenger feature numerous electric adjustment options, including backrest width and seat angle. Together with adjustable thigh support, the taller seat and backrest bolsters provide excellent ergonomics and more lateral support during fast cornering.</Text>
                       <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>




      {/* 4 img */}

      <View style={styles.mainTextCNT}>
             <Text style={styles.headerText}>ACCESSORIES AND BMW M PERFORMANCE PARTS FOR THE BMW X6.</Text>
             <Text style={styles.bulletText}>BMW M Performance Parts allow you to give your BMW X6 the maximum amount of motor racing character. Choose from optically enhanced design features for the exterior as well as attractive forged and light alloy wheels. With Original BMW Accessories, you adapt your BMW to your personal wishes: the products are perfectly matched to the BMW X6 in terms of quality, design and performance.</Text>
             <View style={styles.InVisisbleSpace}></View>
             <Text style={styles.heading}>Original BMW Accessories</Text>
             <View style={styles.fordIMGCNT1}>

                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/1586aa5af828e75f1e603edeb368b5cc/bmw_x6_onepager_mc_bmw_accessoires_m_performance_parts_accessoires_01.jpg' }}
                        style={styles.imgInford1}
                        />
                        <Text  style={styles.heading}>BMW roof cross bars.</Text>
                       <Text style={styles.bulletText}>The roof cross bars can be combined with all BMW roof rack mounts and roof boxes and are the perfect visual complement to the vehicle as a whole. They are easy to install without tools and comply with the highest quality and safety standards thanks to their sturdy construction and anti-theft locking system.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                          source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/fa15ba8a1e602dc594778333a00d3168/bmw_x6_onepager_mc_bmw_accessoires_m_performance_parts_accessoires_02.jpg' }}
                          style={styles.imgInford1}
                      />
                       <Text  style={styles.heading}>BMW roof box 520 black/titanium silver.</Text>
                       <Text style={styles.bulletText}>The modern roof box in black with titanium silver side panels has a capacity of 520 litres and is compatible with all BMW roof rack systems. Due to the fact that it can be opened from both sides and has triple central locking on each side it is convenient to load and lock for theft protection.</Text>
                       <View style={styles.InVisisbleSpace}></View>
                      <Image
                        source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_547,h_308,q_auto,c_fill,f_auto,fl_lossy/auto-titan/0d2b7231021cd4c58ed0cf543ebd604a/bmw_x6_onepager_mc_bmw_accessoires_m_performance_parts_accessoires_03.jpg' }}
                        style={styles.imgInford1}
                        />
                      <Text  style={styles.heading}>Luggage compartment mat.</Text>
                       <Text style={styles.bulletText}>The anti-slip, water-resistant and highly durable mat with raised border on all sides protects the luggage compartment from dirt and moisture. In black, it perfectly complements the interior of a vehicle with the Basic equipment.</Text>
                       <View style={styles.InVisisbleSpace}></View>

             </View>
        </View>




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
  <Text style={styles.headerText}>TECHNICAL DATA OF THE BMW X6.</Text>
  <Text style={styles.heading}>BMW X6 xDrive40i.</Text>
          <Image
                  source={{ uri: 'https://images.netdirector.co.uk/gforces-auto/image/upload/w_840,h_473,q_auto,c_fill,f_auto,fl_lossy/auto-titan/ccde718c89e9375ec1a29c625cc71673/bmw_x6_onepager_modelbrief_01.jpg' }}
                  style={styles.image1}
                  />    

                <View style={styles.powDetailsTextCtn}>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Engine power in kW (hp) at 1/min:</Text>
                        <Text style={styles.value}>250kW (340HP) at 5500-6500</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Top speed in km/h:</Text>
                        <Text style={styles.value}>5250</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Acceleration 0–100 km/h in s:</Text>
                        <Text style={styles.value}>5.7–5.5</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>Fuel consumption in l/100 km (combined):</Text>
                        <Text style={styles.value}>13.33</Text>
                    </View>
                    <View style={styles.powTextItem}>
                        <Text style={styles.label}>CO2 combined emissions in g/km (WLTP):</Text>
                        <Text style={styles.value}>206</Text>
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
spacingText:{
    width:"100%",
    height:10,
},
InVisisbleSpace:{
    width:"100%",
    marginVertical:40,
},
  dropdown: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  menuItem: {
    paddingVertical: 5,
    fontSize: 14,
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
