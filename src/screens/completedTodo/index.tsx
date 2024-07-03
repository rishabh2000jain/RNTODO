import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';import FabButton from '../../components/Fab';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { AppState } from '../../redux/ReduxStore';
import { HomeStackParamList, HomeTabParamList } from '../../services/navigationService/NavigationParam';
import TodoTile from '../../components/TodoTile';
import { loadCompletedTodos } from '../../redux/CompletedTodosSlice';


type Props = CompositeScreenProps<MaterialTopTabScreenProps<HomeTabParamList, 'CompletedTodo'>, MaterialTopTabScreenProps<HomeStackParamList>>;

const PendingTodo = ({ navigation, route }: Props) => {
  const todos = useAppSelector((state:AppState)=>state.completedTodos.todos);
  const dispacher = useAppDispatch();
  useEffect(() => {
    dispacher(loadCompletedTodos());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16, paddingTop: 20, paddingBottom:120, gap: 8 }}
        data={todos}
        renderItem={({ item }) => {
          return <TodoTile date={item.date} desc={item.desc} isComplete={item.isComplete} title={item.title} key={item.id} id={item.id}/>
        }}
      />

    </View>
  );
};

export default PendingTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
