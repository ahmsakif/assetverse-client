import React, { useState, useEffect } from 'react';

const DynamicHeader = ({ userName }) => {
    const [greeting, setGreeting] = useState('');
    const [subText, setSubText] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();

        // 1. Time-based Greeting Logic
        if (6 < hour ) setGreeting("Good Morning,");
        else if (12 < hour) setGreeting("Good Afternoon,");
        else if (17 < hour) setGreeting("Good Evening,");
        else setGreeting("Working Late?");

        // 2. Contextual Sub-messages
        const messages = [
            "Here is a look at your asset ecosystem today.",
            "Ready to streamline your workflow?",
            "Your inventory and requests are up to date.",
            "Keep things moving! Here is your overview."
        ];

        // Pick a message based on the day of the month so it changes daily, not every refresh
        const dayIndex = new Date().getDate() % messages.length;
        setSubText(messages[dayIndex]);

    }, []);

    return (
        <div className="mb-10 animate-in fade-in slide-in-from-left-6 duration-1000">
            <h1 className="text-4xl font-semibold text-slate-800 tracking-tight">
                {greeting} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{userName || 'there'} !</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 text-lg">
                {subText}
            </p>
            {/* Subtle bottom accent line */}
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-4 opacity-20"></div>
        </div>
    );
};

export default DynamicHeader;