import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-button',
  styleUrl: 'button.scss',
  shadow: false,
})
export class TWUIButton {
  @Prop() label?: string;
  @Prop() icon?: string;
  @Prop() type?: string = 'button';

  render() {
    return (
      <button type={this.type} aria-label={this.label}>
        {this.icon && <iconify-icon icon={this.icon}></iconify-icon>}
        {this.label}
      </button>
    );
  }
}
