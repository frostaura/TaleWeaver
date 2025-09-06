import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-profile',
  shadow: false,
})
export class TWUIProfile {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.profile.title}</twui-text>
        <twui-text format="hint">{state.dictionary.strings.pages.profile.subtitle}</twui-text>
      </Host>
    );
  }
}
