import {combineReducers} from 'redux'
import $ from 'jquery'
import {CardHelper} from "./utils";


const projects = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {fetch: true}
        case 'RECEIVE_PROJECTS':
            return {fetch: false, list: action.list}
        case 'CREATING_PROJECT':
            return {fetch:false, list:[...state.list, action.suite]}
        case 'CREATED_PROJECT':
            return state
        default:
            return state
    }
}



const cards = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_CARDS':
            return {fetch: true, project: action.project}
        case 'RECEIVE_CARDS':
            return {fetch: false, list: action.list, project: action.project}
        case 'MOVE_CARD':
            let {option: {card, direction, target, after, release}} = action
            if (card && target) {
                let list = $.extend(true, [], state.list)
                //let list = [...state.list]
                // detach card
                card = CardHelper.detach(list, CardHelper.path(list, card.id))
                switch (direction) {
                    case 'Next':
                        CardHelper.after(list, CardHelper.path(list, target.id), card)
                        break
                    case 'Root':
                        CardHelper.root(list, card)
                        break
                    case 'Detail':
                        CardHelper.detail(list, CardHelper.path(list, target.id), card)
                        break
                    case 'Release':
                        CardHelper.plan(list, CardHelper.path(list, target.id), release, card)
                        break;
                    default:
                        return state
                }
                return {fetch: false, list, project: state.project}
            }
        default:
            return state
    }
}

const releases = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_RELEASES':
            return {fetch: true}
        case 'RECEIVE_RELEASES':
            return {fetch: false, list: action.list,}
        default:
            return state
    }
}

const dragging = (state = {dragging: false}, action) => {
    switch (action.type) {
        case 'START_DRAG_CARD':
            return {card: action.card}
        case 'END_DRAG_CARD':
            return {card: false}
        default:
            return state
    }
}

export default combineReducers({projects, cards, releases, dragging})