import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount(){
        if (! this.props.stream ){
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.stream.id, formValues);
    }

    render(){
        if ( this.props.stream ){
            return <StreamForm
                onSubmit={this.onSubmit} title="Edit Stream"
                initialValues={ _.pick(this.props.stream, 'title', 'description')} />
        }
        return <div> Loading ... </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream : state.streams[ownProps.match.params.id] || null
    }
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
