import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const BMWConnectedDrive = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{uri: 'https://d35wmn7bemzfye.cloudfront.net/016cb055e264cba17dedfeab958d53e1983cc9af/1719287320/images/logo.png'}} style={styles.logo} />
      </View>

      {/* Main Section */}
      <View style={styles.mainSection}>
        <Text style={styles.title}>BMW ConnectedDrive</Text>
        <Text style={styles.description}>
          Kết nối với BMW của bạn và tận hưởng một trải nghiệm lái xe thông minh.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tìm hiểu thêm</Text>
        </TouchableOpacity>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Các tính năng chính:</Text>
          <View style={styles.featuresList}>
            <FeatureCard
              title="Chăm sóc khách hàng"
              description="Hỗ trợ trực tuyến 24/7"
              icon="https://www.bmw.vn/etc/designs/bmw/icons/icon-customer-support.svg"
            />
            <FeatureCard
              title="Điều khiển xe từ xa"
              description="Khóa, mở cửa từ xa"
              icon="https://www.bmw.vn/etc/designs/bmw/icons/icon-remote-control.svg"
            />
            <FeatureCard
              title="Thông tin lộ trình"
              description="Dễ dàng lên kế hoạch chuyến đi"
              icon="https://www.bmw.vn/etc/designs/bmw/icons/icon-route-planner.svg"
            />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 BMW Group</Text>
      </View>
    </ScrollView>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <View style={styles.featureCard}>
    <Image source={{uri: icon}} style={styles.featureIcon} />
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  mainSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A0DF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  featuresSection: {
    marginTop: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureCard: {
    width: '30%',
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  featureText: {
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default BMWConnectedDrive;
