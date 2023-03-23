import {createSlice} from "@reduxjs/toolkit";



export const authSlice =createSlice({
name:"auth",
initialState:{
id:"",
UserExit:false
},
reducers:{
 
    setIdUser: (state, action) => {
        state.id = action.payload;
      },
    setUserExit: (state, action) => {
        state.UserExit = action.payload;
      },
    
}
})

export const { setIdUser,setUserExit } = authSlice.actions;
export default authSlice.reducer;