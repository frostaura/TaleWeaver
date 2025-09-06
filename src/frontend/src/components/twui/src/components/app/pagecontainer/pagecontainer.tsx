import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'twui-pagecontainer',
  styleUrl: 'pagecontainer.scss',
  shadow: false,
})
export class TWUIPagecontainer {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
