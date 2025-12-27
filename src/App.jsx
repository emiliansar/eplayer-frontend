import { useState } from 'react'
import './App.css'
import AppLayout from './components/AppLayout'
import { Provider } from './Provider'
import { EplayerContextProvider } from './context/eplayer-context'
import { MusicContextProvider } from './context/music-context'
import { ConfigProvider } from 'antd'

export default function App() {

  if (typeof window !== 'undefined') {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'touchmove' && typeof options === 'object') {
        options = { ...options, passive: false };
      }
      originalAddEventListener.call(this, type, listener, options);
    };
  }

  return (
    <>
      <Provider>
        <EplayerContextProvider>
          <MusicContextProvider>
            <ConfigProvider>
              <AppLayout />
            </ConfigProvider>
          </MusicContextProvider>
        </EplayerContextProvider>
      </Provider>
    </>
  )
}
