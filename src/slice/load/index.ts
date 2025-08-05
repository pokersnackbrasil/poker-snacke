import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface  LoadState  {
	status:boolean
}
const initialState : LoadState = {
	status:false,
}

const loadSlice = createSlice({
	name:'load',
	initialState,
	reducers:{
		setLoadData(state,action:PayloadAction<{
			status:boolean;
		}>){
			state.status = action.payload.status
		}
	}
})

export const { setLoadData } = loadSlice.actions
export default loadSlice.reducer
