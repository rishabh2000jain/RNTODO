import * as React from 'react';
import { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadCompletedTodos } from '../redux/CompletedTodosSlice';
import { useAppDispatch } from '../redux/Hooks';
import { loadPendingTodos, markComplete } from '../redux/PendingTodosSlice';
import { Todo } from '../types/todo';

const getRandomColor = () => {
    return `rgba(${Math.random() * 225},${Math.random() * 225},${Math.random() * 225},1)`;
};

const TodoTile = (props: Todo) => {
    const color = useMemo(getRandomColor, [props.id]);
    const dispach = useAppDispatch();
    return (
        <View style={styles.container}>
            <View style={[styles.leadingColor, { backgroundColor: color }]} />
            <View style={styles.contentContainer}>
                <View style={styles.row}>
                    <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{props.title}</Text>
                    <Text style={styles.dateStr} >{props.date.toDateString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.desc} ellipsizeMode='tail' numberOfLines={1}>{props.desc}</Text>
                    {!props.isComplete && <TouchableOpacity onPress={()=>{
                        dispach(markComplete({id:props.id}));
                        dispach(loadPendingTodos());
                        dispach(loadCompletedTodos());
                    }}>
                    <Text style={styles.completeBtn}>Complete</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    );
};

export default TodoTile;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
        padding: 4,
    },
    leadingColor: {
        height: '100%',
        width: 4,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    title: {
        fontSize: 14,
        color: 'black',
        fontWeight: '500',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    dateStr: {
        fontSize: 9,
        color: 'grey',
        fontWeight: '500'
    },
    desc: {
        fontSize: 12,
        color: 'black',
        fontWeight: '400',
    },
    completeBtn: {
        fontSize: 12,
        marginEnd: 10,
        color: 'red',
        fontWeight: '600',
        alignSelf: 'center'
    }
});
