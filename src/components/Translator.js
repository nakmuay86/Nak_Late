import React, { useState } from 'react';
import axios from 'axios';
import './Translator.css'


const Translator = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('zh-Hans'); 
    const [toLanguage, setToLanguage] = useState('en');

    const translate = async () => {
        const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RapidAPI_Key, // Ваш ключ API
                'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: [{
                text: inputText
            }],
            params: {
                to: toLanguage, 
                from: fromLanguage 
            }
        };

        try {
            const response = await axios(url, options);
            const translatedTexts = response.data.map(item => item.translations[0].text).join(', ');
            setOutputText(translatedTexts);
        } catch (err) {
            setOutputText('');
        }
    };

    return (
        <div className="translator">
            <h1>翻译</h1>
            <textarea
                placeholder="Enter text to translate(输入要翻译的文本)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <div className="label-container">
                <label>从: </label>
                <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                <option value="zh-Hans">Chinese</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ru">Russian</option>
                    <option value="fi">Finnish</option>
                    
                </select>
            </div>
            <div className="label-container">
                <label>至: </label>
                <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ru">Russian</option>
                    <option value="fi">Finnish</option>
                    <option value="zh-Hans">Chinese</option>
                </select>
            </div>
            <button onClick={translate}>翻译</button>
            <h2>翻译文本:</h2>
            <p>{outputText}</p>
        </div>
    );
};

export default Translator;
