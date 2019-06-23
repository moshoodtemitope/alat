import React from 'react';

export const Switch = function(props) {
	return (
		<div className={props.isChecked ? "switch switch_is-on" : "switch switch_is-off"} onClick={props.handleToggle} style={{marginRight : 9}}>
			<ToggleButton 
				isChecked={props.isChecked}	
			/>
		</div>
	);
}

const ToggleButton = function(props) {
		let classNames = ["toggle-button", (props.isChecked) ? "toggle-button_position-right" : "toggle-button_position-left"].join(" ");
		return (<div className={props.isChecked ? "toggle-button toggle-button_position-right" : "toggle-button toggle-button_position-left"}></div>);
};