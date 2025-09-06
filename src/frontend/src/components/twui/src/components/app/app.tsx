import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'twui-app',
  styleUrl: 'app.scss',
  shadow: false,
})
export class TWUIApp {
  render() {
    return (
      <Host>
        <twui-header />
        <twui-pagecontainer>
          <twui-settings />
        </twui-pagecontainer>
      </Host>
    );
  }
}
