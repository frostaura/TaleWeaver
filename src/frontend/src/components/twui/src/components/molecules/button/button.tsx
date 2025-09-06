import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-button',
  styleUrl: 'button.scss',
  shadow: false,
})
export class TWUIButton {
  @Prop() label?: string;
  @Prop() iconbefore?: string;
  @Prop() iconafter?: string;
  @Prop() type?: string = 'button';
  @Prop({ reflect: true }) color?: 'primary' | 'secondary' = 'primary';

  render() {
    return (
      <button color={this.color} type={this.type} aria-label={this.label}>
        {this.iconbefore && <iconify-icon icon={this.iconbefore}></iconify-icon>}
        {this.label}
        {this.iconafter && <iconify-icon icon={this.iconafter}></iconify-icon>}
      </button>
    );
  }
}
