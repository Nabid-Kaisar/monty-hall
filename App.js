/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


const App: () => Node = () => {
    const [rewardDoor, setRewardDoor] = useState();
    const [doorText, setDoorText] = useState(['Door1', 'Door2', 'Door3']);

    useEffect(() => {
        setRewardDoor(randomRewardGenerator);
    },[]);

    useEffect(() => {
        console.log(doorText)
    }, [doorText]);

    const randomRewardGenerator = () => {
        return getRandomInt(3);
    };

    const getRandomInt = (max: Number) => {
        return Math.floor(Math.random() * max);
    };

    //0,1,2
    const handleDoorClick = (event, doorNo: Number) => {
        openDoor(doorNo);
    };

    const openDoor = (doorNo: Number) => {
        let oldDoorTextList :Array = [...doorText];
        if (doorNo === rewardDoor) {
            alert('You win a CAR!');
            oldDoorTextList[doorNo] = 'CAR';
        } else {
            oldDoorTextList[doorNo] = 'OPENED';
        }

        setDoorText(oldDoorTextList) ;
    };

    return (
        <View style={styles.doorContainer}>
            <Text>{rewardDoor}</Text>
            <TouchableOpacity onPress={(event) => handleDoorClick(event, 0)} style={styles.door}>
                <Text>{doorText[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => handleDoorClick(event, 1)} style={styles.door}>
                <Text>{doorText[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(event) => handleDoorClick(event, 2)} style={styles.door}>
                <Text>{doorText[2]}</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    doorContainer: {flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'center', marginTop: 20},
    door: {
        borderColor: 'powderblue',
        borderWidth: 1,
        width: '20%',
        height: '40%',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
