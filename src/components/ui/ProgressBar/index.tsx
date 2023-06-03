import React from 'react'

interface ProgressBarProps {
    progressColor: string
    bgColor: string
    progress: number
    width: number
    height: number
}

const ProgressBar = ({
    progressColor,
    bgColor,
    progress,
    width,
    height,
}: ProgressBarProps) => {
    const Parentdiv = {
        Position: 'relative',
        height: height,
        width: width,
        backgroundColor: bgColor,
        borderRadius: 40,
    }

    const Childdiv = {
        Position: 'fixed',
        height: '100%',
        width: `${progress}%`,
        backgroundColor: progressColor,
        borderRadius: 40,
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}></div>
        </div>
    )
}

export default ProgressBar
