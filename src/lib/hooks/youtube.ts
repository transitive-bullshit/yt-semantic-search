'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'

import { SearchResult } from '@/types'

function useYouTube() {
  const [result, setResult] = React.useState<SearchResult | null>(null)
  const [isYouTubeDialogOpen, setIsYouTubeDialogOpen] =
    React.useState<boolean>(false)

  const openYouTubeDialog = React.useCallback((result: SearchResult) => {
    setResult(result)
    setIsYouTubeDialogOpen(true)
  }, [])

  const closeYouTubeDialog = React.useCallback(() => {
    setIsYouTubeDialogOpen(false)
    setResult(null)
  }, [])

  return {
    result,
    isYouTubeDialogOpen,

    openYouTubeDialog,
    closeYouTubeDialog
  }
}

export const YouTube = createContainer(useYouTube)
