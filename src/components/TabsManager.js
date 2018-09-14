import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tabs } from './tabs/tabs_'

class TabsManager extends Component {
    constructor(props) {
        super(props);
        this.viewTab = this.viewTab.bind(this)
        this.tabsList = this.tabsList.bind(this)
    }

    changeTab = (index) => {
        this.props.history.push(tabs[index].id)
    }

    viewTab(path) {
        let modname = require(`./tabs/${path}`)
        let tabTemplate = modname[path]
        return tabTemplate
    }

    tabsList() {
        let result = []
        tabs.forEach((item, index) => result[item.order] = (
            <li
                key={index}
                onClick={() => this.changeTab(index)}
                className={this.props.match.params.tab===item.id?'active':''}
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
        let view = this.viewTab(this.props.match.params.tab)
        return (
            <main>
                <div className="main">
                    <div className="ti col-12 " key='tabsList'>{tabs}</div>
                    <div className="ti col-12 " key='tab'>
                        {view}
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(TabsManager);

