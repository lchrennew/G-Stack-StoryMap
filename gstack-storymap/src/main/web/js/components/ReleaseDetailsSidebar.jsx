import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {fetchRelease, updateRelease} from "../actions";
import {notify} from "./Contexts";
import {Route, Switch, withRouter} from "react-router-dom";
import ReleaseDetailsHeader from "./ReleaseDetailsHeader";
import ReleaseEdit from "./ReleaseEdit";
import ReleaseSummary from "./ReleaseSummary";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        release: state.release.release,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchRelease(id)),
    }
}


class ReleaseDetailsSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.objectiveRef = React.createRef()
        this.beginRef = React.createRef()
        this.endRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id} = this.props
        const title = this.titleRef.current.value,
            begin = this.beginRef.current.value,
            end = this.endRef.current.value,
            objective = this.objectiveRef.current.getValue()
        await save(id, {title, begin, end, objective})
        notify({
            title: 'Update release',
            level: 'success',
            message: 'Done!',
        })
    }

    componentDidMount() {
        const {id, load} = this.props
        load(id)
    }

    componentDidUpdate() {
        const {id, release, load} = this.props
        if (!release || release.id !== id) {
            load(id)
        }
    }

    render() {
        const {release} = this.props
        return <Placeholder>
            <Switch>
                <Route path='/:project/!/release/:id/:mode' component={ReleaseDetailsHeader} />
                <Route path='/:project/!/release/:id' component={ReleaseDetailsHeader} />
            </Switch>
            <div className="content container">
                {
                    release
                        ? <Switch>
                            <Route path='/:project/!/release/:id/edit' component={ReleaseEdit}/>
                            <Route component={ReleaseSummary}/>
                        </Switch>
                        : <Dimmer active inverted>
                            <Loader size='huge'>Loading</Loader>
                        </Dimmer>
                }
            </div>
        </Placeholder>
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleaseDetailsSidebar))