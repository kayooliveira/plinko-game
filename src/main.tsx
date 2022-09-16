import './styles/global.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Routes } from 'routes'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!

const root = createRoot(container)

root.render(
  <>
    <Routes />
    <Toaster />
  </>
)
