import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'twui-header',
  styleUrl: 'header.scss',
  shadow: false,
})
export class TWUIHeader {
  render() {
    return (
      <Host>
        <header>
          <twui-text>TaleWeaver</twui-text>
          <iconify-icon icon="codicon:settings"></iconify-icon>
        </header>
      </Host>
    );
  }
}
