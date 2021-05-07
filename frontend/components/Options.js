import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Modal, Button, ScrollView } from 'react-native'

export default function Options() {

    const [about, setAbout] = useState(false)
    const aboutUs=()=>{
        setAbout(true)
    }

    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>Options:</Text>
            <TouchableHighlight><Text style={styles.setting}>Remove Ads</Text></TouchableHighlight>
            <TouchableHighlight><Text style={styles.setting}>Updates for new Quotes</Text></TouchableHighlight>
            <TouchableHighlight onPress={aboutUs}><Text style={styles.setting}>About this app</Text></TouchableHighlight>

            <Modal 
                animationType='slide'
                visible={about}
                transparent={false}
            >
                <ScrollView>
                    <Text style={{textAlign:'center', color: 'blue', fontSize: 30}}>About</Text>
                    <View style={styles.about}>
                        <Text style={styles.small}>Best Quotes for Life </Text> 
                        <Text style={styles.texte}>It is an app that provides large collection of quotes for every field in life.</Text>
                    </View>
                    <Text style={styles.about}>
                        You can share this quotes on your whatsapp, facebook, linkedIn, Instagram and others.
                        It has various category and each category has many quotes for itself. 
                    </Text>
                    <Text style={styles.about}>
                        Do you have a quotes and want to share with us ? Contact us at gibrillongmene@gmail.com
                    </Text>
                    <View style={styles.about}>
                        <Text style={styles.small}>How to use?</Text>
                        <View>
                            <Text style={styles.texte}>-you can save a quotes as image in your device</Text>
                            <Text style={styles.texte}>-you can display the list of quotes per category</Text>
                            <Text style={styles.texte}>-you can share to your social network</Text>
                        </View>
                    </View>
                    <View style={styles.about}>
                       <Text style={styles.small}>About Developer:</Text>
                       <View>
                            <Text style={styles.texte}>-Name: Longmene Gibril</Text>
                            <Text style={styles.texte}>-Email: gibrillongmene@gmail.com</Text>
                       </View>
                    </View>
                    <Button onPress={()=>setAbout(false)} title='CLOSE' />
                </ScrollView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    about:{
        flex:1,
        flexDirection: 'column',
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 10
    },
    title:{
        backgroundColor: 'white',
        color: 'black',
        padding: 20,
        textAlign: 'center',
        fontSize: 20
    },
    setting:{
        backgroundColor: 'pink',
        color: 'black',
        padding: 20,
        //textAlign: 'center',
        fontSize: 20,
        marginBottom: 2
    },
    small:{
        color: 'green',
        fontStyle: 'italic',
        fontSize: 20
    },
    texte:{
        fontSize: 18
    }
})