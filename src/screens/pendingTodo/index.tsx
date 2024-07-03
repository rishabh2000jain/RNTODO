import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FabButton from '../../components/Fab';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { loadPendingTodos } from '../../redux/PendingTodosSlice';
import { AppState } from '../../redux/ReduxStore';
import { HomeStackParamList, HomeTabParamList } from '../../services/navigationService/NavigationParam';
import TodoTile from '../../components/TodoTile';
import { MyThemeContext, ThemeEnum } from '../../internationlization/Theme';


type Props = MaterialTopTabScreenProps<HomeTabParamList, 'PendingTodo'>;

const PendingTodo = ({ navigation, route }: Props) => {
  const todos = useAppSelector((state:AppState)=>state.pendingTodos.todos);
  const dispacher = useAppDispatch();
  const {theme,toggleTheme} = useContext(MyThemeContext);
  useEffect(() => {
    dispacher(loadPendingTodos());
  }, []);

  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16, paddingTop: 20, paddingBottom:120, gap: 8 }}
        data={todos}
        renderItem={({ item }) => {
          return <TodoTile date={item.date} desc={item.desc} isComplete={item.isComplete} title={item.title} key={item.id} id={item.id}/>
        }}
      />
      <FabButton onClick={() => {
        toggleTheme();
        //navigation.getParent()?.navigate('AddTodo');
      }} />
    </View>
  );
};

export default PendingTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});

