import React from 'react';

export default class AjaxLoader extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const  style = {paddingLeft: '50%'};

		return (
			<div className = "row">
				<div className = "col-xs-12">
					<img style={style} src="/public/img/ajax-loader.gif" alt ="loading" />
				</div>
			</div>
		);

	}
}