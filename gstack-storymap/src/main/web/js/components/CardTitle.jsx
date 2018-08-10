import React from 'react'
import Placeholder from "./Placeholder";

class CardTitle extends React.Component {
    render() {
        const {value} = this.props
        return <div className="card-title">
            {
                value
                    ? value.split('\n').map(
                    (line, k) =>
                        <Placeholder key={k}>
                            {line}<br/>
                        </Placeholder>
                )
                    : '<Empty>'
            }
        </div>
    }
}

export default CardTitle