import Realm from 'realm';
import { Todo } from '../../types/todo';
import TodoSchema from './TodoSchema';


const realmDb = new Realm({ schema: [TodoSchema], schemaVersion: 1 });

export default class TodoDatabaseService {
    static  addTodo(data: Todo):string|null {
        let object = realmDb.write(()=>realmDb.create('Todo',data));
        return object.id;
    }
    static  updateTodo(id:string,data: Todo) {
        const todo = realmDb.objectForPrimaryKey<TodoSchema>('Todo',id);
        if(!todo){
            return;
        }
        realmDb.write(()=>{
            Object.keys(data).filter((key,val)=>key!='id').forEach((key) => {
                // @ts-ignore
                todo[key] = data[key];
            });
        });
      
        
    }
    static  deleteTodo(id:any) {
        const todo = realmDb.objectForPrimaryKey<TodoSchema>('Todo',id);
        if(!todo){
            return;
        }
        realmDb.write(()=>{
            realmDb.delete(todo);
        });
    }
    static getAllTodos = ():Todo[] => realmDb.objects('Todo').map((e)=>{
        let data = e.toJSON();
        return {
            date:data.date,
            desc:data.desc,
            isComplete:data.desc,
            title:data.title,
            id:data.id
        } as Todo;
    });
    static getAllCompletedTodos = ():Todo[] => realmDb.objects('Todo')
    .filter((e)=>{
        return e.toJSON().isComplete;
    })
    .map((e)=>{
        let data = e.toJSON();
        return {
            date:data.date,
            desc:data.desc,
            isComplete:data.isComplete,
            title:data.title,
            id:data.id
        } as Todo;
    });

    static getAllPendingTodos = ():Todo[] => realmDb.objects('Todo')
    .filter((e)=>{        
        return !e.toJSON().isComplete;
    })
    .map((e)=>{
        let data = e.toJSON();
        return {
            date:data.date,
            desc:data.desc,
            isComplete:data.isComplete,
            title:data.title,
            id:data.id
        } as Todo;
    });
    static getTodo = (id:string):Todo|null => {
        let data = realmDb.objectForPrimaryKey('Todo',id);
        if(!data){
            return null;
        }
        return {
            date:data.date,
            desc:data.desc,
            isComplete:data.desc,
            title:data.title,
            id:data.id
        } as Todo;
    };
}