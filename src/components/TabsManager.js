import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { tabs } from './tabs/tabs_'

class TabsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
        }
        this.tabsList = this.tabsList.bind(this)
        this.dynamicLoad = this.dynamicLoad.bind(this)
        
    }

    changeTab = (index) => {
        this.props.history.replace(tabs[index].id)
    }

    dynamicLoad() {
        this.setState({ component: null }, () =>
            import(`./tabs/${this.props.match.params.tab}`)
            .then(component => {
                let A = component[this.props.match.params.tab]
                this.setState({ component: <A /> })
            })
            .catch(err=>console.log(err))
        )
    }

    componentDidMount() {
        this.dynamicLoad()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.tab !== this.props.match.params.tab) {
            this.props = nextProps
            this.dynamicLoad()
        }
    }

    tabsList() {
        let result = []
        tabs.forEach((item, index) => result[item.order] = (
            <li
                key={index}
                onClick={() => this.changeTab(index)}
                className={this.props.match.params.tab === item.id ? 'active' : ''}
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
        return (
            <main>
                <div className="main">
                    <div className="ti col-12 " key='tabsList'>{tabs}</div>
                    <div className="ti col-12 " key='tab'>
                        {this.state.component ? this.state.component : <h1>Loading...</h1>}
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(TabsManager);

