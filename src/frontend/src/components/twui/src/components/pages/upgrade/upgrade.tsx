import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-upgrade',
  shadow: false,
})
export class TWUIUpgrade {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.upgrade.title}</twui-text>
        <twui-text format="hint">{state.dictionary.strings.pages.upgrade.subtitle}</twui-text>
      </Host>
    );
  }
}
