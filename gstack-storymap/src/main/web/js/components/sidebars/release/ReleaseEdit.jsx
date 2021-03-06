import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {connect} from 'react-redux'
import {updateRelease} from "../../../actions";
import {notify} from "../../common/NotificationManager";
import MarkDownEditor from "../../common/MarkDownEditor";


const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        project: parseInt(props.match.params.project),
        release: state.release.release,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (id, release) => dispatch(updateRelease(id, release))
    }
}


class ReleaseEdit extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.objectiveRef = React.createRef()
        this.beginRef = React.createRef()
        this.endRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id, project, history} = this.props
        const title = this.titleRef.current.value,
            begin = this.beginRef.current.value,
            end = this.endRef.current.value,
            objective = this.objectiveRef.current.getValue()
        await save(id, {title, begin, end, objective})
        history.push(`/${project}/!/release/${id}`)
        notify({
            title: 'Update release',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        const {release,match: {params: {maximized}}} = this.props
        return <Form onSubmit={this.save.bind(this)}>
            <Form.Field>
                <label>Title</label>
                <input placeholder='Enter a title'
                       defaultValue={release.title}
                       name="title"
                       required
                       autoComplete="off"
                       ref={this.titleRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Beginning</label>
                <input placeholder='select when this release begins'
                       name='begin'
                       type='date'
                       defaultValue={release.begin}
                       ref={this.beginRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Ending</label>
                <input placeholder='select when this release ends'
                       name='end'
                       type='date'
                       defaultValue={release.end}
                       ref={this.endRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Objective</label>
                <MarkDownEditor
                    value={release.objective}
                    layout={maximized === '!!' ? 'horizontal' : 'vertical'}
                    ref={this.objectiveRef}
                />
            </Form.Field>
            <Button type='submit'>Update</Button>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseEdit)