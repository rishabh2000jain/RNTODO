import { Formik, FormikHelpers, FormikProps } from 'formik';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, I18nManager } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { HomeStackParamList } from '../../services/navigationService/NavigationParam';
import { Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import TodoDatabaseService from '../../services/databaseService/TodoDatabaseService';
import { useAppDispatch } from '../../redux/Hooks';
import { loadPendingTodos } from '../../redux/PendingTodosSlice';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


type AddTodoPageProps = NativeStackScreenProps<HomeStackParamList,'AddTodo'>;
type FormValues = {
  title: string;
  desc: string;
};
type TimeValue = {
  hours:number;
  minutes:number;
};
const AddTodoPage = (props: AddTodoPageProps) => {
  const [notifyMe, updateNotifyMe] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [date, setDate] = useState<CalendarDate>();
  const [time, setTime] = useState<TimeValue>();
  const formRef = React.useRef<FormikProps<FormValues>>(null);
  const { t } = useTranslation();
  const dispacher = useAppDispatch();



  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Formik
          innerRef={formRef}
          initialValues={{ title: '', desc: '',}}
          onSubmit={function (values: FormValues, formikHelpers: FormikHelpers<FormValues>): void | Promise<any> {
            if (date && time && values.desc && values.title) {
              let formatedDate = moment(`${date.getUTCFullYear()}-${date.getMonth()}-${date.getDay()}T${time.hours}:${time.minutes}:00.000Z`);
              let id = TodoDatabaseService.addTodo({ isComplete: false, date: formatedDate.toDate(), desc: values.desc, title: values.title });
              if(id){
                dispacher(loadPendingTodos());
                props.navigation.goBack();
              }else{
                Alert.alert('Failed to add todo');
              }
            } else {
              Alert.alert('Please complete form');
            }
          }}>
          {({ handleBlur, handleChange, values }) => {
            return <ScrollView keyboardShouldPersistTaps={'never'}>
              <TextInput
                placeholder={t('enterTitle')}
                placeholderTextColor={'grey'}
                style={styles.textInput}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                 textAlign={I18nManager.isRTL?'right':'left'}
                keyboardType="default"
              />
              <TextInput
                placeholder={t('enterDescription')}
                placeholderTextColor={'grey'}
                style={[styles.textInput, { height: 120 }]}
                onChangeText={handleChange('desc')}
                onBlur={handleBlur('desc')}
                value={values.desc}
                textAlign={I18nManager.isRTL?'right':'left'}
                multiline
                keyboardType="default"
              />

              <TouchableOpacity style={styles.pickDateTimeContainer} onPress={()=>{
                setShowDatePicker(true);
              }}>
                <Text style={styles.pickDateTimeTxt}>{t('pickDate')}</Text>
                <Text style={styles.dateTimeTxt}>{date?.toDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickDateTimeContainer} onPress={()=>{
                setShowTimePicker(true);
              }}>
                <Text style={styles.pickDateTimeTxt}>{t('pickTime')}</Text>
                {time && <Text style={styles.dateTimeTxt}>{`${time?.hours}:${time?.minutes}`}</Text>}
              </TouchableOpacity>

              <TimePickerModal
                visible={showTimePicker}
                locale={i18next.language}
                onDismiss={()=>{
                  setShowTimePicker(false);
                }}
                onConfirm={({hours,minutes})=>{
                  setTime({hours,minutes});
                  setShowTimePicker(false);
                }}
                hours={time?.hours}
                minutes={time?.minutes}
                use24HourClock
              /> 
              <DatePickerModal 
                mode='single'
                locale={i18next.language}
                startDate={date}
                date={date}
                validRange={{
                  startDate:new Date(),
                }}
                visible={showDatePicker}
                onDismiss={()=>{
                  setShowDatePicker(false);
                }}
                onConfirm={({date})=>{
                  setDate(date);
                  setShowDatePicker(false);
                }}
              />
              <Checkbox.Item label={t('notifyMe')} status={notifyMe ? 'checked' : 'unchecked'} onPress={(value) => {
                updateNotifyMe(prev => !prev);
              }} />
            </ScrollView>
          }}
        </Formik>
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={(e) => {
        e.preventDefault();
        formRef.current?.handleSubmit();
      }}>
        <Text style={styles.saveBtnTxt}>{t('save')}</Text>
      </TouchableOpacity>

    </View>
  );


 
};

export default AddTodoPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  textInput: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    color: 'black',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 6,
    direction:'rtl',

  },
  pickDateTimeContainer:{
    marginVertical:6,
    borderColor:'grey',
    borderWidth:1,
    paddingVertical:12,
    paddingHorizontal:8,
    borderRadius:6,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  pickDateTimeTxt:{
    fontSize:16,
    fontWeight:'400',
  },
  dateTimeTxt:{
    fontSize:16,
    fontWeight:'600',
  },
  saveBtn: {
    width: '100%',
    height: 60,
    backgroundColor: 'red',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  saveBtnTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700'
  }
});


