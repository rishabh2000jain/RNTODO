import React, { createContext, FC, PropsWithChildren, useState } from "react";
import { useColorScheme } from "react-native";

type ThemePropType = {
    theme: Record<string, string>;
    toggleTheme: () => void
};

export enum ThemeEnum {
    light,
    dark
}

const DefaultTheme: Record<string, string> = {
    backgroundColor: '#ffffff',
};

const DarkTheme: Record<string, string> = {
    backgroundColor: '#000000'
};

export const MyThemeContext = createContext<ThemePropType>({ theme: DefaultTheme, toggleTheme: () => { } });

const useChangeTheme = (): [Record<string, string>, () => void] => {
    const scheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeEnum>(scheme == 'dark' ? ThemeEnum.dark : ThemeEnum.light);
    const toggleTheme = (): void => {
        if(theme == ThemeEnum.dark){
            setTheme(ThemeEnum.light);
        }else{
            setTheme(ThemeEnum.dark);
        }
        
    };

    return [theme == ThemeEnum.dark ? DarkTheme : DefaultTheme, toggleTheme];
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, toggleTheme] = useChangeTheme();
    return (
        <MyThemeContext.Provider value={{
            theme,
            toggleTheme
        }}>
            {children}
        </MyThemeContext.Provider>
    );
}