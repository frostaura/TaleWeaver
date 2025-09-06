import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-text',
  styleUrl: 'text.scss',
  shadow: false,
})
export class TWUIText {
  @Prop({ reflect: true }) format?: 'header' | 'hint';

  render() {
    return (
      <Host format={this.format}>
        <slot></slot>
      </Host>
    );
  }
}
