import PaginationSkeleton from '@/skeletons/PaginationSkeleton'
import ResponseCardSkeleton from '@/skeletons/responseCard'
import React from 'react'

const DashboardSkeleton = () => {
  return (
        <div className="space-y-4">
          {Array.from({length:5})?.map((_, i) => (
            <ResponseCardSkeleton key={i} />
          ))}
          <PaginationSkeleton/>
        </div>
  )
}

export default DashboardSkeleton