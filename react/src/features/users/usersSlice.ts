import { createSlice, nanoid, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//import { sub } from 'date-fns';
import axios from "axios";

const USERS_URL = 'http://localhost:5000/users';

interface User {
    id: string | undefined,
    name: string,
    content: string,
    date: Date
  }

interface UserState {
    users: User[],
    selectedId? : string ,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error? : string
}  
const initialState:UserState = {
    users: [] as User[]  ,
    status: 'idle', 

}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data as User[]
})

export const addNewUser = createAsyncThunk('users/addNewUser', async (initiaUser: User) => {
    const response = await axios.post(USERS_URL, initiaUser)
    return response.data as User
})

export const updateUser = createAsyncThunk('users/updateUser', async (updateUser: User) => {
    const { id } = updateUser;
        const response = await axios.put(`${USERS_URL}/${id}`, updateUser)
        return response.data as User
})

export const deleteUser = createAsyncThunk('Users/deleteUser', async (initialUser:User) => {
    const { id } = initialUser;
      const response = await axios.delete(`${USERS_URL}/${id}`)
      return response.data as User; 
    
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        AddingUser: {
            reducer(state, action: PayloadAction<User>) {
                state.users.push(action.payload)
            },
            prepare( name:string, content:string) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        content,
                        date: new Date(),
                     }
                }
            }
        },
       
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
               
                state.users = state.users.concat(action.payload)
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                action.payload.date = new Date();
               
                console.log(action.payload)
                state.users.push(action.payload)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date();
                const users = state.users.filter(user => user.id !== id);
                state.users = [...users, action.payload];
            })

    }
})

//export const selectAllUsers = (state:UserState ) => state.users;
//export const getUsersStatus = (state :UserState ) => state.users.status;
//export const getUsersError = (state) => state.Users.error;

export const selectUserById = (state:UserState , id: string) =>     state.users.find(user => user.id === id);

export const { AddingUser } = usersSlice.actions

export default usersSlice.reducer