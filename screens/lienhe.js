import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native';

export default function Lienhe({ navigation }) {
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCarModel, setSelectedCarModel] = useState('');

  const handleSubmit = () => {
    if (!isAgreed) {
      Alert.alert("Thông báo", "Bạn cần đồng ý với chính sách bảo mật để tiếp tục.");
      return;
    }
    Alert.alert("Thông báo", "Form của bạn đã được gửi thành công.");
  };

  return (
    <ImageBackground
      source={{ uri: 'https://d2638j3z8ek976.cloudfront.net/global-css-files/20240206-101357/images/placeholders/jITe62j1db.jpg' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Liên hệ với chúng tôi</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Danh xưng *</Text>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Please select ..." value="" />
            <Picker.Item label="Mr." value="Mr" />
            <Picker.Item label="Ms." value="Ms" />
          </Picker>

          <Text style={styles.label}>Tên *</Text>
          <TextInput style={styles.input} placeholder="Tên" />

          <Text style={styles.label}>Họ *</Text>
          <TextInput style={styles.input} placeholder="Họ" />

          <Text style={styles.label}>Số điện thoại *</Text>
          <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" />

          <Text style={styles.label}>Email *</Text>
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

          <Text style={styles.label}>Thành phố/ Tỉnh *</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.input}
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

          <Text style={styles.label}>Quận/ Huyện</Text>
          <TextInput style={styles.input} placeholder="Quận/ Huyện" />

          <Text style={styles.label}>Mẫu xe Quý Khách muốn lái thử *</Text>
          <Picker
            selectedValue={selectedCarModel}
            onValueChange={(itemValue) => setSelectedCarModel(itemValue)}
            style={styles.input}
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

          <Text style={styles.label}>Thông tin yêu cầu khác</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            placeholder="Nhập thông tin yêu cầu khác"
          />
          <Text style={styles.label}>Chính sách bảo mật thông tin </Text>
          <View style={styles.checkboxContainer}>
            <Switch
              value={isAgreed}
              onValueChange={setIsAgreed}
            />
            <Text style={styles.label}>Tôi đồng ý</Text>
          </View>

          <Text style={styles.terms}>
        1. Tôi trên 18 tuổi và tôi có bằng lái xe B2 hợp lệ.*
      </Text>
      <Text style={styles.terms}>
        2. Tôi đồng ý để THACO (và các công ty liên kết, đối tác của THACO) thu thập, sử dụng, hiệu chỉnh, lưu trữ, sao chép thông tin của tôi, cung cấp thông tin trên cho bên thứ ba có liên quan (bao gồm nhưng không giới hạn các công ty thuộc Tập đoàn BMW) nhằm mục đích chăm sóc khách hàng, gửi thiệp mời đến các sự kiện, các hoạt động tiếp thị, nghiên cứu và các mục đích thống kê khác giữa các đối tác hoặc công ty thành viên của tập đoàn BMW. Tôi cũng biết rằng thông tin cá nhân của tôi sẽ được sử dụng dựa trên luật bảo vệ sự riêng tư hiện hành.*
      </Text>
      <Text style={styles.terms}>
        3. Tôi cũng đồng ý để THACO (và các công ty liên kết, đối tác của THACO) liên hệ với tôi nhằm mục đích thực hiện chương trình quảng cáo/ chăm sóc khách hàng qua số điện thoại/ email và thông tin liên hệ khác mà tôi đã đăng ký (dù tôi đã đăng ký danh sách không quảng cáo hay không).
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
});
