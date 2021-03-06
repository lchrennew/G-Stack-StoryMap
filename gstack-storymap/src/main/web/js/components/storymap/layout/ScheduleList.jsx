import React from 'react'
import {Accordion} from "semantic-ui-react";
import Schedule from "./Schedule";

class ScheduleList extends React.Component {
    render() {
        const {activities, releases} = this.props
        return <Accordion fluid className="schedules">
            {
                releases
                    ? releases.map((release, i) =>
                        <Schedule
                            key={i}
                            first={i === 0}
                            last={i === releases.length - 1}
                            {...{activities, release}}/>)
                    : null
            }
            <Schedule {...{activities}}/>
        </Accordion>
    }
}

export default ScheduleList