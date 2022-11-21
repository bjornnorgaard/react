import React, { useState } from 'react';
import './App.css';

interface Dot {
    x: number;
    y: number
}

const Dot = (props: { x: number, y: number }) => {
    return (
        <div style={{
            backgroundColor: "blue",
            position: "fixed",
            top: props.y,
            left: props.x,
            borderRadius: "50%",
            width: "16px",
            height: "16px"
        }}></div>
    );
}

function App() {
    const [shownDots, setShownDots] = useState<Dot[]>([]);
    const [savedDots, setSavedDots] = useState<Dot[]>([]);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const newDot = {x: e.clientX - 8, y: e.clientY - 8};
        setShownDots([...shownDots, newDot]);
        setSavedDots([...savedDots, newDot]);
    };

    const onUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
        const dot = shownDots.pop();
        if (!dot) return;
        setSavedDots([...savedDots, dot]);
    };

    const onRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
        const dot = savedDots.pop();
        if (!dot) return;
        setShownDots([...shownDots, dot]);
    };

    return (
        <div className="App">
            <button onClick={e => onUndo(e)}>Undo</button>
            <button onClick={e => onRedo(e)}>Redo</button>
            <div className="Area" onClick={e => onClick(e)}>
                {shownDots.map(d => (<Dot key={d.x + d.y + new Date().getMilliseconds()} x={d.x} y={d.y}/>))}
            </div>
        </div>
    );
}

export default App;
