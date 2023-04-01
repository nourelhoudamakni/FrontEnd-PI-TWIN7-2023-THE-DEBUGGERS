import {createSlice} from "@reduxjs/toolkit"
const userSelectedSlice=createSlice({ 
 name:"userSelectedSlice", 
 initialState:{ 
    selectedUser:"",
    selectedReceiver:""
 }, 
 reducers:{ 
  selectUser(state,action){ 
   state.selectedUser=action.payload;
  },
  selectReceiver(state,action){ 
    state.selectedReceiver=action.payload;
   },
  unselectedPoduct(state,action){ 
    state.selectedUser=null;
  },
  }
 }); 


export const { 
  selectUser, 
  unselectedPoduct, 
  selectReceiver
  }=userSelectedSlice.actions;
export default userSelectedSlice.reducer;