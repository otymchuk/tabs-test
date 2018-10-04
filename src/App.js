import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import TabsManager from './components/TabsManager';

class App extends Component {
    render() {
        return (
                <Router>
                    <div style={{ backgroundColor: '#777', minHeight: '100vh' }}>
                        <Switch>
                            <Route exact path={"/"} render={() => <Redirect to="/Guardians" />} />
                            <Route exact path={"/:tab"} component={() => <TabsManager />} />
                        </Switch>
                    </div>
                </Router>
        );
    }
}
export default App;
