import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-text',
  styleUrl: 'text.scss',
  shadow: false,
})
export class TWUIText {
  @Prop({ reflect: true }) format?: 'header' | 'subheading' | 'secondary';
  @Prop({ reflect: true }) align?: 'center' | 'right';

  render() {
    return (
      <Host format={this.format} align={this.align}>
        <slot></slot>
      </Host>
    );
  }
}
