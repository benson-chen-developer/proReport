import React from 'react'

interface Props {
    gameTimeParams: string[]
    setGameTimeParam: (param: string) => void;
}
export const GameTimeParam: React.FC<Props> = ({
    gameTimeParams, setGameTimeParam
}) => {
    return (
        <div>
            {gameTimeParams.map((time) => {
                return <button onClick={() => setGameTimeParam(time)}>
                    {time} {}
                </button>
            })}
        </div>
    )
}
