import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-settings',
  shadow: false,
})
export class TWUISettings {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.titles.settings}</twui-text>
        <twui-text format="hint">Customise your experiance</twui-text>
      </Host>
    );
  }
}
