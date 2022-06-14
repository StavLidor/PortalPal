import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Split from "react-split"
import {Box} from "@mui/material";

import ReactPlaceholder from 'react-placeholder';
// import "react-placeholder/lib/reactPlaceholder.css";
// import { TextBlock, RectShape } from 'react-placeholder/lib/placeholders';
// import ReactPlaceholder from 'react-placeholder';


export default function Home_frame() {
    // const GhostPlaceholder = () => (
    //     <div className='my-placeholder'>
    //         <RectShape color='gray' style={{width: 25, height: 70}} />
    //         <TextBlock rows={6} color='blue'/>
    //     </div>
    // );

    // React.renderComponent(
    //     <div>
    //         <ReactPlaceholder type='media' rows={7} ready={this.state.ready}>
    //             <MyComponent />
    //         </ReactPlaceholder>
    //     </div>,
    //     document.body);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            margin: 10,
        },
        box: {
            height: 40,
            borderWidth: 1,
        },
    });
    return (

        // <div>
        //     {styles}
        // </div>
        <div>
        {/*    <Split style={{height: 1000, width: 400}}>*/}
        {/*        <div style={{backgroundColor: 'gold'}}/>*/}
        {/*        <div style={{backgroundColor: 'gold'}}/>*/}
        {/*        /!*<div className='bg-gray-400'/>*!/*/}
        {/*    </Split>*/}
        {/*</div>)}*/}



            {/*<Split style={{height: 'calc(100vh-4rem)'}}>*/}

            {/*<ReactPlaceholder  customPlaceholder={<GhostPlaceholder />}>*/}
            {/*    /!*<MyComponent />*!/*/}
            {/*</ReactPlaceholder>*/}

            {/*React.renderComponent(*/}
            {/*<table>*/}
            {/*    <th>*/}
            {/*        /!*<ReactPlaceholder showLoadingAnimation={false} type='media' ready={false} rows={4}>*!/*/}
            {/*        /!*    /!*<RealComponent />*!/*!/*/}
            {/*        /!*</ReactPlaceholder>*!/*/}
            {/*        /!*<ReactPlaceholder>*!/*/}
            {/*        /!*    ReactPlaceholder type='rect' ready={true} color='#E0E0E0' style={{width: 1, height: 1}}>*!/*/}
            {/*        /!*    /!*<div>*!/*!/*/}
            {/*        /!*    /!*    hola*!/*!/*/}
            {/*        /!*    /!*</div>*!/*!/*/}
            {/*        /!*</ReactPlaceholder>*!/*/}
            {/*    </th>*/}

            {/*</table>*/}

            {/*document.body);*/}


            <th>
                <tr>
                    {/*    שלום*/}
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2, width: 200, justifyContent: 'spaceAround',
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'column',
                            borderBottomColor: 'black', justifyContent: 'spaceAround',
                            borderBottomWidth: 2, width: 200,
                        }}
                    >
                        <Text>שלום, רונלי ויגננסקי</Text>
                        <Text>מדעי המחשב</Text>
                    </View>

                </tr>
                <View style={{
                    flexDirection: 'column',
                    borderBottomColor: 'black',
                    borderBottomWidth: 2, justifyContent: 'spaceAround'
                }}>

                    <tr>
                        <View
                            style={{
                                flexDirection: "column",
                                borderBottomColor: 'black',
                                borderBottomWidth: 2, width: 200, justifyContent: 'space-between', padding: 2
                            }}
                        >
                        <Text>רשימת מטופלים</Text>
                        <Text>.......</Text>
                        </View>
                        {/*<View*/}
                        {/*    style={{*/}

                        {/*        borderBottomColor: 'black',*/}
                        {/*        borderBottomWidth: 2, justifyContent: 'spaceAround', padding: 100*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<th>*/}
                        {/*    רשימת מטופלים*/}
                        {/*</th>*/}


                        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between'} }>*/}

                        {/*</View>*/}
                        {/*<th>*/}
                        {/*    <tr>*/}
                        {/*        פרטים אישיים*/}
                        {/*    </tr>*/}
                        {/*    <tr>*/}
                        {/*        מייו לפי*/}
                        {/*    </tr>*/}
                        {/*</th>*/}
                    </tr>
                    {/*<View*/}
                    {/*    style={{*/}

                    {/*        borderBottomColor: 'black',*/}
                    {/*        borderBottomWidth: 2, justifyContent: 'spaceAround', padding: 100*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>


            </th>


            {/*<View style={{flexDirection: 'column', justifyContent: 'space-between'} }>*/}

            {/*</View>*/}

            <th>
                <View style={{
                    flexDirection: 'column', justifyContent: 'space-between', padding: 150,

                }}>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2, width: 600, justifyContent: 'space-between'
                        }}
                    />
                    {/*<tr>*/}
                    {/*    באנר*/}
                    {/*</tr>*/}
                    <tr>
                        <View
                            style={{
                                flexDirection: "row",
                                borderBottomColor: 'black',
                                borderBottomWidth: 2, width: 600, justifyContent: 'space-between',
                            }}
                        >
                            <Text>סיכומי מפגשים</Text>
                            <Text>תרגילים</Text>
                            <Text>התקשרות</Text>
                        </View>
                    </tr>

                    {/*<View*/}
                    {/*    style={{*/}
                    {/*        borderBottomColor: 'black',*/}
                    {/*        borderBottomWidth: 2, width: 600*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <tr>
                        ...סיכומי מפגשים
                    </tr>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2, width: 600, justifyContent: 'space-between', padding: 200
                        }}
                    />
                </View>
            </th>


        </div>
    )
 }