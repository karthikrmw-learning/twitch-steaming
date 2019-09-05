import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if( stream.userId === this.props.currentUserId ){
            return (
                <div className="right floated content">
                    <Link className="ui primary button" to={`/streams/edit/${stream.id}`}>Edit</Link>
                    <Link className="ui negative button" to={`/streams/delete/${stream.id}`}>Delete</Link>
                </div>
            );
        }
    }

    renderStreamList = () => {
        return _.map(this.props.streams, (stream) => {
            return (
                <div role="listitem" className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i aria-hidden="true" className="github large icon middle aligned"></i>
                    <div className="content">
                      <Link className="header" to={`/streams/${stream.id}`}>{stream.title}</Link>
                      <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreateStream(){
        if( this.props.isSignedIn ){
            return <Link className="ui primary button" to="/streams/new">Create Stream</Link>;
        }
        return '';
    }

    render(){
        return (
            <div className="ui grid">
                <div className="ui row hidden divider"></div>
                <h2 className="ui header"> Stream List </h2>

                <div className="row">
                    <div className="eight wide column">
                        <div role="list" className="ui divided relaxed list">
                            {this.renderStreamList()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        {this.renderCreateStream()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams : state.streams,
        currentUserId : state.auth.userId,
        isSignedIn : state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
