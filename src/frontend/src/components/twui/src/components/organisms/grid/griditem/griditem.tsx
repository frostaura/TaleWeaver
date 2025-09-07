import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'twui-griditem',
  styleUrl: 'griditem.scss',
  shadow: false,
})
export class TWUIGriditem {
  /** optional label */
  @Prop() label?: string;

  /** optional icon */
  @Prop() icon?: string;

  /** internal toggled state */
  @State() toggled: boolean = false;

  private handleToggle = () => {
    this.toggled = !this.toggled;
  };

  render() {
    return (
      <Host onClick={this.handleToggle} class={{ toggled: this.toggled }}>
        {this.icon && <iconify-icon icon={this.icon} class="griditemicon"></iconify-icon>}
        {this.label && (
          <twui-text format="secondary" align="center">
            {this.label}
          </twui-text>
        )}
      </Host>
    );
  }
}
