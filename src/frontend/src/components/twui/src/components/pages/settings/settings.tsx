import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'twui-settings',
  shadow: false,
})
export class TWUISettings {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">Settings</twui-text>
        <twui-text format="hint">Customise your experiance</twui-text>
      </Host>
    );
  }
}
