import { OUTPUT_URL } from '@/constants/variables'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export const apiSlice = createSlice({
    name: 'apiUrl',
    initialState: {
        currentUrl: OUTPUT_URL,
    },
    reducers: {

        resetApiUrl: (state) => {
            state.currentUrl = OUTPUT_URL
        },
        setApiUrl: (state, action: PayloadAction<string>) => {
            state.currentUrl = `${OUTPUT_URL}/${action.payload}`
        }

    }
})

// Action creators are generated for each case reducer function
export const { setApiUrl, resetApiUrl } = apiSlice.actions

export const getApiUrl = (state: RootState) => state.apiUrl.currentUrl
export default apiSlice.reducer