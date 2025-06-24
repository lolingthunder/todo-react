import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <main className="min-h-screen bg-base-200 flex justify-center items-start py-10">
            <div className="w-full px-8">
                <App/>
            </div>
        </main>
    </StrictMode>
    ,
)
