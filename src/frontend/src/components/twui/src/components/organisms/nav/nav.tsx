import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'twui-nav',
  styleUrl: 'nav.scss',
  shadow: false,
})
export class TWUINav {
  render() {
    return (
      <Host>
        <nav>
          <a>NavItem</a>
          <a>NavItem</a>
          <a>NavItem</a>
          <a>NavItem</a>
        </nav>
      </Host>
    );
  }
}
