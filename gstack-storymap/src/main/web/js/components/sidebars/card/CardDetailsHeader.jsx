import React from 'react'
import {Menu} from "semantic-ui-react";
import {SidebarMaximizeButton} from "../Sidebar";
import Icon from "../../common/Icon";
import {Link, withRouter} from "react-router-dom";
import DeleteCardButton from "../../triggers/DeleteCardButton";

class CardDetailsHeader extends React.Component {


    render() {

        const {match: {params: {project, mode, id, maximized}}} = this.props

        return <Menu fixed='top' borderless className="title" pointing>
            <Menu.Item active={!mode} title='Summary'>
                <Link to={`/${project}/${maximized}/card/${id}`}><Icon name='clipboard'/></Link>
            </Menu.Item>
            <Menu.Item active={mode === 'edit'} title='Edit'>
                <Link to={`/${project}/${maximized}/card/${id}/edit`}><Icon name="edit-3"/></Link>
            </Menu.Item>
            <Menu.Item active={mode === 'comments'} title='Comments'>
                <Link to={`/${project}/${maximized}/card/${id}/comments`}><Icon name='message-circle'/></Link>
            </Menu.Item>
            <Menu.Item active={mode === 'criteria'} title='Acceptance Criteria'>
                <Link to={`/${project}/${maximized}/card/${id}/criteria`}><Icon name='check-circle'/></Link>
            </Menu.Item>
            <Menu.Item title='Delete'>
                <DeleteCardButton to={`/${project}`} id={id}><Icon name="trash" /></DeleteCardButton>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item><SidebarMaximizeButton/></Menu.Item>
            </Menu.Menu>
        </Menu>
    }

}


export default withRouter(CardDetailsHeader)