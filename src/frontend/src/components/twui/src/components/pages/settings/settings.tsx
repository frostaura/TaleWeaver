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
        <twui-text format="header">{state.dictionary.strings.pages.settings.title}</twui-text>
        <twui-text format="secondary">{state.dictionary.strings.pages.settings.subtitle}</twui-text>
      </Host>
    );
  }
}
