import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as DataActions from '../redux/modules/cinema/actions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { tabs } from './tabs/tabs_'

class TabsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
            data: null
        }
        this.dynamicLoad = this.dynamicLoad.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    componentDidMount() {
        this.fetchPosts(this.props.match.params.tab)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.tab !== this.props.match.params.tab) {
            this.setState({ component: null }, () => this.fetchPosts(nextProps.match.params.tab, 'RP'))
        }
    }

    fetchPosts(m) {
        let q = tabs.filter(x => x.query === m)
        if (q.length > 0) this.props.actions.fetchPosts(q[0].query, r => {
            if (r.ok) this.dynamicLoad(q[0])
        })
    }

    dynamicLoad(m) {
        import(`./tabs/${m.path}`)
            .then(component => {
                let A = component[m.path.split('.')[0]]
                this.setState({ component: <A list={this.props.list} /> })
            })
            .catch(err => console.log(err))
    }

    changeTab = (index) => {
        this.props.history.push(tabs[index].query)
    }

    tabsList() {
        let result = []
        tabs.forEach((item, index) => result[item.order] = (
            <li
                key={index}
                onClick={() => this.changeTab(index)}
                className={this.props.match.params.tab === item.query ? 'active' : ''}
            >{item.title}</li>
        ))
        return (
            <nav className="topnav">
                <ul>{result}</ul>
            </nav>
        )
    }

    render() {
        let tabs = this.tabsList()
        let spinner = <h1>Loading...</h1>

        return (
            <main>
                <div className="main">
                    <div key='tabsList'>{tabs}</div>
                    <div key='tab' style={{ minHeight: '100vh' }}>
                        {this.state.component ? this.state.component : spinner}
                    </div>
                    <div key='tabsList2'>{tabs}</div>
                </div>
            </main>
        )
    }
}


const mapStateToProps = (state) => ({
    init: state.data.init,
    modalTaskView: state.data.modalTaskView,
    list: state.data.list,
});


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(DataActions, dispatch),
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TabsManager);

