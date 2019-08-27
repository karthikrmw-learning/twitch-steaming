import React from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
    componentDidMount(){
        if (! this.props.stream ){
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    renderInput = () => {
        if ( this.props.stream ){
            const { title , description } = this.props.stream;
            return (
                <div>
                    <div>{title}</div>
                    <div>{description}</div>
                </div>
            )
        }
        return <div> Loading ... </div>;
    }

    render(){
        return (
            <div className="ui grid">
                <div className="ui row hidden divider"></div>
                <h2 className="ui header"> Stream Edit </h2>
                <div className="row">
                    <div className="eight wide column">
                        {this.renderInput()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream : state.streams[ownProps.match.params.id] || null
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamEdit);
