import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-privacy',
  shadow: false,
})
export class TWUIPrivacy {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.privacy.title}</twui-text>
        <twui-text format="hint">{state.dictionary.strings.pages.privacy.subtitle}</twui-text>
      </Host>
    );
  }
}
