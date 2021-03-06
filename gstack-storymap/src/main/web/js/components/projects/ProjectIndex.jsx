import React from 'react'
import Placeholder from "../common/Placeholder";
import ActivityList from "../storymap/layout/ActivityList";
import ScheduleList from "../storymap/layout/ScheduleList";
import {connect} from 'react-redux'
import {Container, Header, Message} from "semantic-ui-react";
import AddRootButton from "../triggers/AddRootButton";
import Icon from "../common/Icon";

const mapStateToProps = (state, props) => {
    return {
        cards: state.cards.list,
        releases: state.releases.list,
    }
}
class _ProjectIndex extends React.Component {

    render() {
        const {cards = [], releases = []} = this.props
        if (cards.length) {
            return <Placeholder>
                <ActivityList activities={cards}/>
                <ScheduleList activities={cards} releases={releases}/>
            </Placeholder>
        }
        else {

            return <Container as='h1' className='mt-5'>
                <Message positive>
                    <Message.Header>Welcome!</Message.Header>
                <p>
                    <AddRootButton className="ui massive green button">
                        <Icon name="arrow-right-circle" size={32}/> Start with my first card
                    </AddRootButton>
                </p>
                </Message>
            </Container>
        }
    }
}

export const ProjectIndex = connect(mapStateToProps)(_ProjectIndex)