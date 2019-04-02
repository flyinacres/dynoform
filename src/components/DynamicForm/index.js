import React from 'react';
import './form.css';

export default  class DynamicForm extends React.Component {
    state ={};

    onSubmit = (e) => {
      //  e.preventDefault();
       if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange = (e, key,type="single") => {
        console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState({
                [key]: e.target.value  
            });
        }

    }

    onNewChange = (e) => {
        this.setState({value: e.target.value});
      }

    renderForm = () => {
        let model = this.props.model;
        
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name= m.name;
            let value = m.value;

            let target = key;  
            value = this.state[target];
            // Need to set the value the first time through or React will consider this to be
            // an uncontrolled component, and give a warning when this is later updated.
            // Originally author really didn't know what he was doing, or actually get this working right...
            // This is where default values also need to be set!
            if (typeof value === 'undefined') {
                value = this.props.defaultValues[key];
            }


            let input =  <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, target)}}
                />;

            
            return (
                <div key={'g' + key} className="form-group">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                </div>
            );
        });
        return formUI;
    }

    render () {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className={this.props.className}>
                <h3 className="form-title">{title}</h3>
                <form className="dynamic-form" value={this.state.props} onSubmit={(e)=>{this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div className="form-actions">
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        )
    }
}