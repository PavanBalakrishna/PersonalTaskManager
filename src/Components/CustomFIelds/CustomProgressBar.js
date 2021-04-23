import React from 'react'
import {ProgressBar,OverlayTrigger,Tooltip} from 'react-bootstrap';

export default function CustomProgressBar({goal}) {
    return (
        <OverlayTrigger
                placement='bottom-start'
                overlay={
                    <Tooltip id={`tooltip-${goal.id}`}>
                    {goal.Percentage}
                    </Tooltip>
                }
        >
                <ProgressBar animated now={goal.Percentage} label={goal.Percentage}></ProgressBar>
        </OverlayTrigger>
    )
}
