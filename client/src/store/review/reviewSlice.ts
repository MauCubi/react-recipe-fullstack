import { createSlice } from '@reduxjs/toolkit';
import { Review, ReviewsInfo, ReviewDistribution } from '../../types';

export interface SliceReview {
    reviews: Review[],
    reviewsStatus: 'idle' | 'loading',
    userReview: Review | null,
    userReviewStatus: 'idle' | 'saving' | 'editing' | 'loading',
    reviewsInfo: ReviewsInfo
    reviewDistribution: ReviewDistribution[]
}


const initialState: SliceReview = {
    reviews: [],
    reviewsStatus: 'idle',
    userReview: null,
    userReviewStatus: 'idle',
    reviewsInfo: { average: 0, sum: 0, num: 0},
    reviewDistribution: []
  }

export const reviewSlice = createSlice({
    name: 'review',
    initialState,

    reducers: {
        onCreateReview:(state, { payload }) => {
            state.userReviewStatus = 'saving'
            state.userReview = payload               
        },
        onChangeUserReviewStatus: (state, { payload }) => {
            state.userReviewStatus = payload
        },
        onLoadReviews: (state, { payload = []}) => {
            
            state.reviewDistribution = payload.reviewDistribution
            state.reviewsInfo = payload.reviewsInfo
            state.reviews = []
            const arrayReview: Review[] = payload.reviews 

            arrayReview.forEach( review => {
                const exist = state.reviews?.find( dbreview => dbreview._id === review._id )
                if (!exist) {
                    state.reviews?.push( review );                    
                }                
            })

            state.reviewsStatus = 'idle'

        },
        onChangeReviewsStatus: ( state, { payload }) => {
            state.reviewsStatus = payload
        },
        onSetUserReview: (state, { payload }) => {
            console.log(payload.userReview)
            state.userReview = payload.userReview
            state.userReviewStatus = 'idle'
        }
    }
})


export const {
    onCreateReview,
    onChangeUserReviewStatus,
    onLoadReviews,
    onChangeReviewsStatus,
    onSetUserReview
} = reviewSlice.actions