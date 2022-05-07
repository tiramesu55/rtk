import { createSlice, nanoid, createAsyncThunk, PayloadAction, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
//import { sub } from 'date-fns';
import { RootState } from '../../app/store';
import axios from "axios";

const USERS_URL = 'http://localhost:5000/users';

export interface User {
    id: string | undefined,
    name: string,
    orgId: number,
    content: string,
    date: string
  }

// interface UserState {
//     users: User[],
//     selectedId? : string ,
//     status: 'idle' | 'loading' | 'succeeded' | 'failed',
//     error? : string
// }

const userAdapter = createEntityAdapter<User>({
    sortComparer: (a,b) => a.name.localeCompare( b.name)
})
const initialState = userAdapter.getInitialState( {
    status: 'idle', 
    error: ''
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data as User[]
})

export const addNewUser = createAsyncThunk('users/addNewUser', async (initialUser: User) => {
    initialUser.id = initialUser.id ?? nanoid();   // if we had not provided an ID add it
    const response = await axios.post(USERS_URL, initialUser)
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
        
       
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                userAdapter.upsertMany(state, action.payload)
               
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message!
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                action.payload.date = new Date().toISOString();
               
                console.log(action.payload)
                userAdapter.addOne( state,action.payload )
                
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }

                action.payload.date = new Date().toISOString();
                userAdapter.upsertOne(state, action.payload);

            })

    }
})

//export const selectAllUsers = (state:UserState ) => state.users;
//export const getUsersStatus = (state :UserState ) => state.users.status;
//export const getUsersError = (state) => state.Users.error;

export const{ 
    selectAll: allUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors((state: RootState)  => state.user)

export default usersSlice.reducer