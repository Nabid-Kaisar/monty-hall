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
let userInitialSelection;
const App: () => Node = () => {
        const [rewardDoor, setRewardDoor] = useState();
        const [doorText, setDoorText] = useState(['Door1', 'Door2', 'Door3']);
        const [isDisabled1, setIsDisabled1] = useState(false);
        const [isDisabled2, setIsDisabled2] = useState(false);
        const [isDisabled3, setIsDisabled3] = useState(false);

        const tableHead1 = ['NO.', 'WINNING']
        const tableHead2 = ['NO.', 'WINNING']
        const [totalRow1, setTotalRow1] = useState(['TOTAL', 0]);

        // const [tableData1, setTableData1] = useState([[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2], [1,2],[1,2],[1,2][1,2]]);
        const [tableData1, setTableData1] = useState([]);
        const [tableData2, setTableData2] = useState([]);
        const [totalRow2, setTotalRow2] = useState(['TOTAL', 0]);

        useEffect(() => {
            setRewardDoor(randomRewardGenerator);
        }, []);

        useEffect(() => {
            calculatePercentage1();
        }, [tableData1]);

        useEffect(() => {
            calculatePercentage2();
        }, [tableData2]);

        const resetSimulation = () => {
            userSelected = [];
            userInitialSelection = undefined;
            setRewardDoor(randomRewardGenerator);
            console.log('rand')
            setDoorText(['Door1', 'Door2', 'Door3'])
            setIsDisabled1(false)
            setIsDisabled2(false)
            setIsDisabled3(false)
        }

        const randomRewardGenerator = () => {
            return getRandomInt(3);
        };

        const getRandomInt = (max: Number) => {
            return Math.floor(Math.random() * max);
        };

        //0,1,2
        const handleDoorClick = (event, doorNo: Number) => {
            if (userSelected.includes(doorNo) && doorNo !== userInitialSelection) {
                //already selected
                return;
            }

            userSelected.push(doorNo);
            openDoor(doorNo);
        };

        const openDoor = (doorNo: Number) => {
            let oldDoorTextList: Array = [...doorText];

            //userSelected already updated
            //possible length 1, 2, 3


            if (userSelected.length === 1) {
                userInitialSelection = doorNo;
                let wrongDoorToOpen: Number = [0, 1, 2].filter(d => d !== doorNo && d !== rewardDoor)[0];
                // console.log('wrong', wrongDoorToOpen)
                // console.log('reward', rewardDoor)
                //monty opens this door:
                oldDoorTextList[wrongDoorToOpen] = 'GOAT';
                setDoorText(oldDoorTextList);
                if (wrongDoorToOpen === 0) {
                    setIsDisabled1(true);
                } else if (wrongDoorToOpen === 1) {
                    setIsDisabled2(true);
                } else if (wrongDoorToOpen === 2) {
                    setIsDisabled3(true);
                }
            }

            //generate stats:
            if (userSelected.length === 2) {
                // console.log('userdoor', doorNo)
                // console.log('rewardDoor', rewardDoor)
                let win: Boolean;
                if (rewardDoor === doorNo) {
                    alert("Congrats, You win a CAR!");
                    win = true;
                } else {
                    alert("You get a GOAT LOL!")
                    win = false;
                }


                if (userInitialSelection === doorNo) {
                    let newTableData1 = [...tableData1];
                    let no: Number = newTableData1.length + 1;
                    newTableData1.push([no, win.toString()]);
                    setTableData1(newTableData1)
                } else {
                    let newTableData2 = [...tableData2];
                    let no: Number = newTableData2.length + 1;
                    newTableData2.push([no, win.toString()]);
                    setTableData2(newTableData2)
                }

                resetSimulation();
                return;
            }

        }


        const calculatePercentage1 = () => {
            let values: [] = tableData1.map((t => {
                if (t[1] == "true") {
                    return 1;
                } else return 0;
            }))

            if (values.length === 0) {
                setTotalRow1(['TOTAL', 0]);
                return;
            }

            let sum = 0;
            values.forEach((v) => {
                sum += v;
            })
            setTotalRow1(['TOTAL', ((sum / values.length) * 100 + "%")]);
        }

        const calculatePercentage2 = () => {

            let values: [] = tableData2.map((t => {
                if (t[1] == "true") {
                    return 1;
                } else return 0;
            }))

            if (values.length === 0) {
                setTotalRow1(['TOTAL', 0]);
                return;
            }

            let sum = 0;
            values.forEach((v) => {
                sum += v;
            })
            setTotalRow2(['TOTAL', ((sum / values.length) * 100 + "%")]);

        }

        return (
            <ScrollView style={{backgroundColor: 'black'}} contentContainerStyle={{flexGrow: 1, height: 9000}}>
                <View style={styles.doorContainer}>
                    {/*<Text>{rewardDoor}</Text>*/}
                    <TouchableOpacity disabled={isDisabled1} onPress={(event) => handleDoorClick(event, 0)}
                                      style={styles.door}>
                        <Text style={styles.doorText}>{doorText[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isDisabled2} onPress={(event) => handleDoorClick(event, 1)}
                                      style={styles.door}>
                        <Text style={styles.doorText}>{doorText[1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isDisabled3} onPress={(event) => handleDoorClick(event, 2)}
                                      style={styles.door}>
                        <Text style={styles.doorText}>{doorText[2]}</Text>
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
                    <Table style={{marginBottom: 50, width: '80%', marginLeft: 40}}
                           borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead1} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData1} textStyle={styles.text}/>
                        <Row data={totalRow1} style={styles.head} textStyle={styles.text}/>

                    </Table>
                    <Text style={styles.tableHeader}>Change Selection</Text>
                    <Table style={{width: '80%', marginLeft: 40}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead2} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData2} textStyle={styles.text}/>
                        <Row data={totalRow2} style={styles.head} textStyle={styles.text}/>
                    </Table>
                </View>
            </ScrollView>

        );
    }
;

const styles = StyleSheet.create({
    doorContainer: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
    door: {
        borderColor: 'powderblue',
        borderWidth: 1,
        width: '20%',
        height: 150,
        marginRight: 5,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {marginBottom: 5, textAlign: 'center', justifyContent: 'center', alignItems: 'center'},
    container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: 'black'},
    text: {margin: 6},
    resetButton: {width: '40%', marginLeft: 120, marginBottom: 20},
    doorText: {color: 'yellow', fontWeight: '900', fontSize: 18}
});

export default App;
