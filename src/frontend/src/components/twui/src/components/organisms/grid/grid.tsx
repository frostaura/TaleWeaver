import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-grid',
  styleUrl: 'grid.scss',
  shadow: false,
})
export class TWUIGrid {
  @Prop() label?: string;
  @Prop() icon?: string;
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
