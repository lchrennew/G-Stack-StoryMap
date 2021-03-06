import React from 'react'
import {Card, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'
import CreateProjectCard from "./CreateProjectCard";
import Placeholder from "../common/Placeholder";
import ProjectItem from "./ProjectItem";

const mapDispatchToProps = dispatch => {
    return {}
}

const mapStateToProps = (state, props) => {
    return {
        projects: state.projects.list
    }
}

class Projects extends React.Component {
    render() {
        let {projects: projects} = this.props
        return <Container>
            <h1 className="mt-5">Projects</h1>
            <div className="row">
                <div className="col">
                    <Card.Group itemsPerRow={4}>
                        {
                            projects.map((project, i) => <ProjectItem key={i} {...project}/>)
                        }
                        <CreateProjectCard/>
                    </Card.Group>
                </div>
            </div>
        </Container>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)