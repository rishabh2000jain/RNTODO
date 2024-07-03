import Realm, { ObjectSchema } from "realm";
import uuid from 'react-native-uuid';
export default class TodoSchema extends Realm.Object<TodoSchema>{
    id!:string;
    title!:string;
    desc!:string;
    date!:Date;
    isComplete!:boolean;

    static schema:ObjectSchema = {
        name:'Todo',
        primaryKey:'id',
        properties:{
            id:{
                type:'string',
                default:()=>uuid.v4()
            },
            title:'string',
            desc:'string',
            date:'date',
            isComplete:'bool'
        }
    };
}