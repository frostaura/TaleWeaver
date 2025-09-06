import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-parentallock',
  shadow: false,
})
export class TWUIParentallock {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.parentallock.title}</twui-text>
        <twui-text format="secondary">{state.dictionary.strings.pages.parentallock.subtitle}</twui-text>
      </Host>
    );
  }
}
