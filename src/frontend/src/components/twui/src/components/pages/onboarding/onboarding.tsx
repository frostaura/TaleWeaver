import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-onboarding',
  shadow: false,
})
export class TWUIOnboarding {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.onboarding.title}</twui-text>
        <twui-text format="hint">{state.dictionary.strings.pages.onboarding.subtitle}</twui-text>
      </Host>
    );
  }
}
