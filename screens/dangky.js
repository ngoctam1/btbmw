import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native';
import axios from 'axios';

import { Platform } from 'react-native';



export default function DangKy({ navigation }) {





  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedCarModel, setSelectedCarModel] = useState('');



  // Handle form submission
  const handleSubmit = async () => {
    if (!isAgreed) {
      // If user hasn't agreed to the privacy policy, show an alert
      Alert.alert("Notification", "You need to agree to the privacy policy to continue.");
      return;
    }

    // Create an object with the form data
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      selectedCity,
      selectedGender,
      additionalInfo,
      isAgreed,
      selectedCarModel
    };

    try {
      // Send the form data to your mock API
      const response = await fetch('https://66ff44c52b9aac9c997ebcd3.mockapi.io/api/minhvu/drivertest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        Alert.alert("Notification", "Your form has been successfully submitted.");
      } else {
        Alert.alert("Error", "Failed to submit the form.");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      Alert.alert("Error", "An error occurred while submitting the form.");
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://d2638j3z8ek976.cloudfront.net/global-css-files/20240206-101357/images/placeholders/r0s6xIqJEJc.jpg' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>REGISTER FOR BMW TEST DRIVE</Text>


        <View style={styles.form}>
        <Text style={styles.label}>Title *</Text>



<View style={styles.pickerContainer}>
<Picker
  selectedValue={selectedGender}
  onValueChange={(itemValue) => setSelectedGender(itemValue)}
  style={[styles.picker, { paddingVertical: 10 }]}  // Corrected style syntax
>
  <Picker.Item label="Please select ..." value="" />
  <Picker.Item label="Mr." value="Mr" />
  <Picker.Item label="Ms." value="Ms" />
</Picker>
</View>


          <Text style={styles.label}>First Name *</Text>
          <TextInput style={styles.input} placeholder="First Name"  onChangeText={setFirstName}/>

          <Text style={styles.label}>Last Name *</Text>
          <TextInput style={styles.input} placeholder="Last Name"  onChangeText={setLastName} />

          <Text style={styles.label}>Phone Number *</Text>
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad"  onChangeText={setPhoneNumber}/>

          <Text style={styles.label}>Email *</Text>
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address"  onChangeText={setEmail} />

          <Text style={styles.label}>City/ Province *</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Please select ..." value="" />
            <Picker.Item label="Hà Nội" value="Hanoi" />
            <Picker.Item label="TP. Hồ Chí Minh" value="HCM" />
            <Picker.Item label="Điện Biên" value="DB" />
            <Picker.Item label="Hòa Bình " value="HB" />
            <Picker.Item label="Lai Châu " value="LC" />
            <Picker.Item label="Sơn La " value="SL" />
            <Picker.Item label="Hà Giang " value="HAG" />
            <Picker.Item label="Cao Bằng " value="CB" />
            <Picker.Item label="Bắc Kạn " value="BK" />
            <Picker.Item label="Lạng Sơn " value="LS" />
            <Picker.Item label="Tuyên Quang " value="TQ" />
            <Picker.Item label="Thái Nguyên " value="TN" />
            <Picker.Item label="Phú Thọ " value="PT" />
            <Picker.Item label="Bắc Giang " value="BG" />
            <Picker.Item label="Bắc Ninh " value="BN" />
            <Picker.Item label="Quảng Ninh " value="QNI" />
            <Picker.Item label="Ninh Bình " value="NB" />
            <Picker.Item label="Hà Nam " value="HN" />
            <Picker.Item label="Lao Cai" value="LCA" />
            <Picker.Item label="Hai Duong" value="HD" />
            <Picker.Item label="Hai Phong" value="HP" />
            <Picker.Item label="Hung Yen" value="HY" />
            <Picker.Item label="Nam Dinh" value="ND" />
            <Picker.Item label="Thai Binh" value="TB" />
            <Picker.Item label="Vinh Phuc" value="VP" />
            <Picker.Item label="Thanh Hoa" value="TH" />
            <Picker.Item label="Nghe An" value="NA" />
            <Picker.Item label="Vinh" value="V" />
            <Picker.Item label="Ha Tinh" value="HT" />
            <Picker.Item label="Quang Binh" value="QB" />
            <Picker.Item label="Quang Tri" value="QT" />
            <Picker.Item label="Thua Thien Hua" value="TTH" />
            <Picker.Item label="Da Nang" value="DN" />
            <Picker.Item label="Quang Nam " value="QNA" />
            <Picker.Item label="Quang Ngai" value="QN" />
            <Picker.Item label="Binh Dinh" value="BD" />
            <Picker.Item label="Phú Yen " value="PY" />
            <Picker.Item label="Yen Bai " value="YB" />
            <Picker.Item label="Gia Lai" value="GL" />
            <Picker.Item label="Khanh Hoa " value="KH" />
            <Picker.Item label="Ninh Thuan " value="NT" />
            <Picker.Item label="Binh Thuan" value="BT" />
            <Picker.Item label="Dak Lak" value="DL" />
            <Picker.Item label="Dak Nong " value="DNO" />
            <Picker.Item label="Lam Dong " value="LD" />
            <Picker.Item label="Binh Duong" value="BDD" />
            <Picker.Item label="Binh Phuoc" value="BP" />
            <Picker.Item label="Tay Ninh" value="TNI" />
            <Picker.Item label="Dong Nai" value="DNA" />
            <Picker.Item label="Ba Ria Vung Tau" value="BRVT" />
            <Picker.Item label="Can Tho" value="CT" />
            <Picker.Item label="Long An" value="LA" />
            <Picker.Item label="An Giang" value="AN" />
            <Picker.Item label="Dong Thap " value="DT" />
            <Picker.Item label="Tien Giang" value="TG" />
            <Picker.Item label="Ben Tre" value="BTE" />
            <Picker.Item label="Vinh Long" value="VL" />
            <Picker.Item label="Tra Vinh  " value="TV" />
            <Picker.Item label="Kien Giang" value="KG" />
            <Picker.Item label="Hau Giang " value="HG" />
            <Picker.Item label="Soc Trang" value="ST" />
            <Picker.Item label="Bac Lieu" value="BL" />
            <Picker.Item label="Ca Mau" value="CM" />
            <Picker.Item label="Kon Tum" value="KT" />
          </Picker>
          </View>

          <Text style={styles.label}>District</Text>
          <TextInput style={styles.input} placeholder="District" />

          <Text style={styles.label}>Model of the car you would like to test drive *</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCarModel}
            onValueChange={(itemValue) => setSelectedCarModel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Please select ..." value="" />
            <Picker.Item label="BMW 3 Series Sedan" value="series3" />
            <Picker.Item label="BMW 5 Series Sedan" value="series5" />
            <Picker.Item label="BMW 7 Series Sedan" value="series7" />
            <Picker.Item label="BMW 4 Series Convertible" value="series4" />
            <Picker.Item label="BMW 4 Series Gran Coupe" value="series4G" />
            <Picker.Item label="BMW Z4" value="series4Z" />
            <Picker.Item label="BMW 8 Series Gran Coupe" value="series8G" />
            <Picker.Item label="BMW X3" value="series3X" />
            <Picker.Item label="BMW X4" value="series4X" />
            <Picker.Item label="BMW X5" value="series5X" />
            <Picker.Item label="BMW X6" value="series6X" />
            <Picker.Item label="BMW X7" value="series7X" />
            <Picker.Item label="BMW XM" value="seriesMX" />
            <Picker.Item label="BMW iX3" value="seriesi3X" />
            <Picker.Item label="BMW i4 Gran Coupe" value="seriesi4X" />
            <Picker.Item label="BMW i7" value="seriesi7" />
            
          </Picker>
          </View>

           <Text style={styles.label}>Additional Requirements</Text>

          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Enter additional requirements"
          />

            <Text style={styles.label}>Privacy Policy</Text>
            <View style={styles.checkboxContainer}>
              <Switch
                value={isAgreed}
                onValueChange={setIsAgreed}
              />
              <Text style={styles.label}>I agree</Text>
            </View>

            <Text style={styles.terms}>
              1. I am over 18 years old, and I have a valid B2 driver’s license.*
            </Text>

<Text style={styles.terms}>
  2. I agree that THACO (and its affiliates, partners of THACO) may collect, use, modify, store, and copy my information and provide it to relevant third parties (including but not limited to companies within the BMW Group) for purposes of customer service, sending invitations to events, marketing activities, research, and other statistical purposes among partners or member companies of the BMW Group. I also understand that my personal information will be used based on current privacy protection laws.*
</Text>
<Text style={styles.terms}>
  3. I also agree that THACO (and its affiliates, partners of THACO) may contact me for advertising/customer care purposes via phone/email and other contact information that I have registered (even if I am registered on a do-not-call list).
</Text>



          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  terms: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#29c6ff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,  // Ensures proper height
    width: '100%',  // Ensures it takes full container width
    backgroundColor: '#fff', // Optional: Helps distinguish the picker visually
    borderRadius: 5, // Optional: Adds a more refined UI
    borderWidth: 1, // Optional: Defines a border
    borderColor: 'black', // Optional: Light gray border
  },
  
});
