import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Navigation = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Navigation</Text>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
  text:{
    fontFamily: 'Okra-ExtraBold',
    fontSize: 40
  }
})