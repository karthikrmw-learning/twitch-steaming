import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../../Modal';
import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount(){
        if (! this.props.stream ){
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    dismissModal = () => {
        history.push('/');
    }

    onDelete = () => {
        this.props.deleteStream(this.props.stream.id);
    }

    render(){
        if( this.props.stream ){
            const actions = (
                <React.Fragment>
                    <button className="ui button negative delete" onClick={this.onDelete} >Delete</button>
                    <Link className="ui button" to={'/'}>Cancel</Link>
                </React.Fragment>
            )

            const content = (
                <React.Fragment>
                    <div>Are you sure you want to delete stream</div>
                    <div>{this.props.stream.title}</div>
                </React.Fragment>
            )

            return (
                <div> StreamDelete
                    <Modal title="Delete Stream"
                        content={content}
                        actions={actions}
                        onDismiss={this.dismissModal}
                        />
                </div>
            );
        }

        return <div> Loading ... </div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream : state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);
