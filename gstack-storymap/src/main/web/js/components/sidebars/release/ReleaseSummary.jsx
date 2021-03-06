import React from 'react'
import Placeholder from "../../common/Placeholder";
import * as Showdown from "showdown";
import {Divider, Label} from "semantic-ui-react";
import {connect} from 'react-redux'
import Icon from "../../common/Icon";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        release: state.release.release,
    }
}

class ReleaseSummary extends React.Component {
    converter: Showdown.Converter

    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        })
    }

    render() {
        const {release} = this.props
        return <Placeholder>
            <Label as='a' color='red' ribbon>
                Release: #{release.id}
            </Label>
            <h1>{release.title || <span className='text-muted'>{`<Empty>`}</span>}</h1>
            <Divider/>
            <h4><Icon name="calendar"/> {release.begin || 'unknown begin'} - {release.end || 'unknown end'}</h4>
            <h4>Objective</h4>
            <div className='mde-preview-content'
                 dangerouslySetInnerHTML={{__html: this.converter.makeHtml(release.objective)}}>
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps)(ReleaseSummary)