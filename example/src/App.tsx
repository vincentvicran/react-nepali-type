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

    const defaultValue = `नेपाल: एक सुन्दर र बहुसांस्कृतिक देश
नेपाल, हिमालय महादेशको गोदीमा बसेको एक अद्भुत र विविधतापूर्ण देश हो। यहाँको प्राकृतिक सौन्दर्य र सांस्कृतिक वैभव संसारभरि चर्चित छ। पृथ्वीको छानो मानिने सगरमाथा, विश्वव्यापी पर्यटन गन्तव्य, र विभिन्न जातजातिको संस्कृतिले नेपाललाई एक अनुपम र आकर्षक देश बनाउँछ।
नेपालको भौगोलिक विविधता अत्यन्त प्रभावशाली छ। तराईदेखि हिमाल सम्म फैलिएको यस देशमा जैविक विविधताको असीम खजाना लुकेको छ। पहाडी क्षेत्रका किसानहरू, तराईका मधेशीहरू, र हिमाली क्षेत्रका शेर्पा तथा तामाङ समुदायहरूले आफ्नो विशिष्ट संस्कृति र परम्परा संरक्षण गरेका छन्।
नेपाली संस्कृतिको मुख्य विशेषता भनेको त्यसको बहुसांस्कृतिक स्वरूप हो। यहाँ हिन्दू, बौद्ध, मुस्लिम, किराँत लगायत विभिन्न धार्मिक समुदायहरू शान्तिपूर्वक बाँच्छन्। दशैँ, तिहार, लोसार, छठ जस्ता चाडपर्वहरूले राष्ट्रिय एकता र भाईचाराको भावनालाई झल्काउँछन्।
शिक्षा र विकासका क्षेत्रमा पनि नेपालले महत्त्वपूर्ण प्रगति गरेको छ। युवा पुस्ताले आधुनिक ज्ञान र परम्परागत मूल्यहरूबीच सन्तुलन कायम गर्दै देशको विकासमा योगदान दिइरहेका छन्। पर्यटन, कृषि, र सूचना प्रविधिका क्षेत्रमा नेपालका युवाहरू विश्वभरि चिनिएका छन्।
अन्त्यमा, नेपाल केवल एक भौगोलिक क्षेत्र मात्र होइन, बरु यो एक जीवन्त संस्कृति, विविधता, र मानवीय मूल्यहरूको प्रतीक हो। यहाँको सौन्दर्य, संस्कृति र मानिसहरूको मैत्रीपूर्ण स्वभाव नै नेपालको सबैभन्दा ठूलो पूँजी हो।`

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
                                    value={defaultValue}
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
