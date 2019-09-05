import React from 'react';
import { Field , reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError(metaProps){
        if( metaProps.touched && metaProps.error ){
            return (
                <div className="ui error message">
                    <div className="header">{metaProps.error}</div>
                </div>
            );
        }
    }

    renderInput = (formProps) => {
        return (
            <div className="field">
                 <label>{formProps.label}</label>
                 <input {...formProps.input} autoComplete="off"/>
                 {this.renderError(formProps.meta)}
            </div>
        );
    }

    onSubmitForm = (formProps) => {
        this.props.onSubmit(formProps);
    }

    render(){
        return (
            <div className="ui grid">
                <div className="ui row hidden divider"></div>
                <h2 className="ui header"> {this.props.title} </h2>
                <div className="row">
                    <div className="eight wide column">
                        <form onSubmit={this.props.handleSubmit(this.onSubmitForm)} className="ui form error">
                            <Field name="title" component={this.renderInput} label={"Enter Title"} />
                            <Field name="description" component={this.renderInput} label={"Enter Description"} />
                            <button className="ui button primary "> Submit </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if( !formValues.title ){
        errors.title = "Please enter title";
    }
    if( !formValues.description ){
        errors.description = "Please enter description";
    }
    return errors;
}

const formWarpped = reduxForm({
    form : 'streamForm',
    validate : validate
})(StreamForm);

export default formWarpped;
