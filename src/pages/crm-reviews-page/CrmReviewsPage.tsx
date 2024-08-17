import { useEffect, useState } from 'react'
import axiosInstance from '../../axios/settings'

import { ReviewsList } from './ReviewsList/ReviewsList'
import PaginationCRM from '../crm-clients-page/PaginationCRM'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import { Review } from '../../redux/feedbacks/slice'

const PAGE_SIZE = 5

const CrmReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(0)

  const fetchReviews = async () => {
    try {
      const offset = page * PAGE_SIZE
      const { data } = await axiosInstance.get(
        `/api/reviews/all_for_crm?limit=${PAGE_SIZE}&offset=${offset}`
      )
      setReviews(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [page])

  const handleStatusChange = () => {
    fetchReviews()
  }

  return (
    <Box p="44px 30px 34px 30px" color="illustrations.darker">
      <Box>
        <Typography variant="h3">Відгуки </Typography>
        <div style={{ height: '100%', width: '100%', paddingTop: '30px' }}>
          <ReviewsList items={reviews} onStatusChange={handleStatusChange} />
        </div>
        <PaginationCRM page={page} pageQty={0} setPage={setPage} />
      </Box>
    </Box>
  )
}

export default CrmReviewsPage
