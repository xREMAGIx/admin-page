import React from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

class HeaderStyleDropdown extends React.Component {
  onToggle = event => {
    let value = event.target.value;
    this.props.onToggle(value);
  };

  render() {
    return (
      <FormControl variant="outlined">
        <Select value={this.props.active} onChange={this.onToggle}>
          <option value="">Header Levels</option>
          {this.props.headerOptions.map(heading => {
            return (
              <option key={heading.label} value={heading.style}>
                {heading.label}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default HeaderStyleDropdown;
