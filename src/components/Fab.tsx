import React,{PropsWithChildren,FC} from 'react';
import {View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface Props{
    onClick:()=>void;
};

const FabButton:FC<Props> = ({onClick}) => {
    const tap = Gesture.Tap().runOnJS(true).onEnd((e) => {
        onClick();
    });
    return (
        <GestureDetector gesture={tap}>
            <View style={styles.fab}>
                <FontAwesome6 name='add' color={'white'} size={20} />
            </View>
        </GestureDetector>
    );
};

export default FabButton;

const styles = StyleSheet.create({
    fab: {
        height: 50,
        width: 50,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: 'red',
        right: 30,
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fabIcon: {
        color: 'white',
    }
});
