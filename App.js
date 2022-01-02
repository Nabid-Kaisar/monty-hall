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
    ScrollView,
    Button
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';


let userSelected = [];
const App: () => Node = () => {
    const [rewardDoor, setRewardDoor] = useState();
    const [doorText, setDoorText] = useState(['Door1', 'Door2', 'Door3']);


    const tableHead1 = ['NO.', 'WINNING']
    const tableHead2 = ['NO.', 'WINNING']

    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);

    useEffect(() => {
        setRewardDoor(randomRewardGenerator);
    }, []);

    useEffect(() => {
        console.log(userSelected)
        if(userSelected.length === 3){
            //all done--> proceed to refresh
            resetSimulation();
        }
    }, [doorText]);

    const resetSimulation = () => {
        userSelected = [];
        setRewardDoor(randomRewardGenerator);
        setDoorText(['Door1', 'Door2', 'Door3'])
    }

    const randomRewardGenerator = () => {
        return getRandomInt(3);
    };

    const getRandomInt = (max: Number) => {
        return Math.floor(Math.random() * max);
    };

    //0,1,2
    const handleDoorClick = (event, doorNo: Number) => {
        if(userSelected.includes(doorNo)){
            //already selected
            return;
        }

        userSelected.push(doorNo);
        openDoor(doorNo);
    };

    const openDoor = (doorNo: Number) => {
        let oldDoorTextList: Array = [...doorText];
        if (doorNo === rewardDoor) {
            alert('You win a CAR!');
            oldDoorTextList[doorNo] = 'CAR';
            resetSimulation();
        } else {
            //monty hall scenario
            // oldDoorTextList[doorNo] = 'GOAT';

            //monty opens this door:
            let wrongDoorToOpen: Number = [0, 1, 2].filter(d => d !== doorNo && d !== rewardDoor)[0];

            //remaining two which might contain a reward
            let mightHaveRewardDoorList: Array = [];
            mightHaveRewardDoorList.push([0, 1, 2].filter(d => d !== wrongDoorToOpen));

            oldDoorTextList[wrongDoorToOpen] = 'GOAT';
        }

        setDoorText(oldDoorTextList);
    };

    return (
        <View style={{backgroundColor: 'black'}}>
            <View style={styles.doorContainer}>
                {/*<Text>{rewardDoor}</Text>*/}
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
            <View style={styles.resetButton}>
                <Button
                    onPress={resetSimulation}
                    title="Reset"
                    color="red"
                    accessibilityLabel="Click to RESET!"
                    style={styles.resetButton}
                />
            </View>
            <View>
                <Text style={styles.tableHeader}>Re-selected Initial Door</Text>
                <Table style={{marginBottom: 50, width: '80%', marginLeft: 40}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                    <Rows data={tableData1} textStyle={styles.text}/>

                </Table>
                <Text style={styles.tableHeader}>Change Selection</Text>
                <Table style={{ width: '80%', marginLeft: 40}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead2} style={styles.head} textStyle={styles.text}/>
                    <Rows data={tableData2} textStyle={styles.text}/>
                </Table>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    doorContainer: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
    door: {
        borderColor: 'powderblue',
        borderWidth: 1,
        width: '20%',
        height: '80%',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {marginBottom: 5, textAlign: 'center',  justifyContent: 'center', alignItems: 'center'},
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: 'black' },
    text: { margin: 6 },
    resetButton: {width: '40%', height: '10%', marginLeft: 120}
});

export default App;
