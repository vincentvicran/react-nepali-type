import React, { FunctionComponent, useState } from "react"

import { NepaliType } from "react-nepali-type"
import "react-nepali-type/dist/reactNepaliType.css"
import "./app.scss"
import Footer from "./components/Footer"
import Header from "./components/Header"

const App: FunctionComponent = () => {
    const [encodedValue, setEncodedValue] = useState<{
        asciiValue: string
        unicodeValue: string
    }>({
        asciiValue: "",
        unicodeValue: "",
    })

    return (
        <div className='container'>
            <Header />

            <form>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='start-date'>React Nepali Type Input:</label>
                                <NepaliType
                                    // value={encodedValue.unicodeValue}
                                    value={"करन धिमीरे विक्रान्त"}
                                    onChange={(asciiValue, unicodeValue) =>
                                        setEncodedValue({
                                            asciiValue,
                                            unicodeValue,
                                        })
                                    }
                                />
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='end-date'>asciiValue: {encodedValue.asciiValue}</label>
                            </div>{" "}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='end-date'>unicodeValue: {encodedValue.unicodeValue}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default App
