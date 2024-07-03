import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
    HomePage?:undefined;
    AddTodo:undefined;
};

export type HomeTabParamList = {
    PendingTodo:undefined,
    CompletedTodo:undefined,
};

export type DrawerTabParamList = {
    Home:undefined,
};
