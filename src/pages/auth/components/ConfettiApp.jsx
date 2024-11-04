import React from 'react'
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const ConfettiApp = ({height}) => {

    //const { width, height } = useWindowSize()
    const { width } = useWindowSize()

    return (
        <Confetti width={width} height={height}/>
)}